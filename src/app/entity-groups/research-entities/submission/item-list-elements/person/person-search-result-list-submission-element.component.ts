import {
  AsyncPipe,
  NgClass,
} from '@angular/common';
import {
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, take } from 'rxjs/operators';

import {
  APP_CONFIG,
  AppConfig,
} from '../../../../../../config/app-config.interface';
import { DSONameService } from '../../../../../core/breadcrumbs/dso-name.service';
import { BitstreamDataService } from '../../../../../core/data/bitstream-data.service';
import { FindListOptions } from '../../../../../core/data/find-list-options.model';
import { ItemDataService } from '../../../../../core/data/item-data.service';
import { RelationshipDataService } from '../../../../../core/data/relationship-data.service';
import { Bitstream } from '../../../../../core/shared/bitstream.model';
import { BitstreamFormat } from '../../../../../core/shared/bitstream-format.model';
import { Context } from '../../../../../core/shared/context.model';
import { Item } from '../../../../../core/shared/item.model';
import { MetadataValue } from '../../../../../core/shared/metadata.models';
import { getFirstCompletedRemoteData, getPaginatedListPayload, getRemoteDataPayload } from '../../../../../core/shared/operators';
import { ViewMode } from '../../../../../core/shared/view-mode.model';
import { ItemSearchResult } from '../../../../../shared/object-collection/shared/item-search-result.model';
import { listableObjectComponent } from '../../../../../shared/object-collection/shared/listable-object/listable-object.decorator';
import { SearchResultListElementComponent } from '../../../../../shared/object-list/search-result-list-element/search-result-list-element.component';
import { SelectableListService } from '../../../../../shared/object-list/selectable-list/selectable-list.service';
import { TruncatableService } from '../../../../../shared/truncatable/truncatable.service';
import { followLink } from '../../../../../shared/utils/follow-link-config.model';
import { ThemedThumbnailComponent } from '../../../../../thumbnail/themed-thumbnail.component';
import { NameVariantModalComponent } from '../../name-variant-modal/name-variant-modal.component';
import { PersonInputSuggestionsComponent } from './person-suggestions/person-input-suggestions.component';

@listableObjectComponent('PersonSearchResult', ViewMode.ListElement, Context.EntitySearchModalWithNameVariants)
@Component({
  selector: 'ds-person-search-result-list-submission-element',
  styleUrls: ['./person-search-result-list-submission-element.component.scss'],
  templateUrl: './person-search-result-list-submission-element.component.html',
  imports: [
    AsyncPipe,
    FormsModule,
    NgClass,
    PersonInputSuggestionsComponent,
    ThemedThumbnailComponent,
  ],
})

/**
 * The component for displaying a list element for an item search result of the type Person
 */
export class PersonSearchResultListSubmissionElementComponent extends SearchResultListElementComponent<ItemSearchResult, Item> implements OnInit {
  allSuggestions: string[];
  selectedName: string;
  alternativeField = 'dc.title.alternative';

  /**
   * Display thumbnail if required by configuration
   */
  showThumbnails: boolean;

  /**
   * Thumbnail to display for the Person suggestion.
   */
  thumbnail$: Observable<Bitstream> = of(null);

  constructor(protected truncatableService: TruncatableService,
              private relationshipService: RelationshipDataService,
              private modalService: NgbModal,
              private itemDataService: ItemDataService,
              private selectableListService: SelectableListService,
              private bitstreamDataService: BitstreamDataService,
              public dsoNameService: DSONameService,
              @Inject(APP_CONFIG) protected appConfig: AppConfig,
  ) {
    super(truncatableService, dsoNameService, appConfig);
  }

  ngOnInit() {
    super.ngOnInit();
    this.thumbnail$ = this.getThumbnail().pipe(take(1));

    const defaultValue = this.dso ? this.dsoNameService.getName(this.dso) : undefined;
    const alternatives = this.allMetadataValues(this.alternativeField);
    this.allSuggestions = [defaultValue, ...alternatives];

    this.relationshipService.getNameVariant(this.listID, this.dso.uuid)
      .pipe(take(1))
      .subscribe((nameVariant: string) => {
        this.selectedName = nameVariant || defaultValue;
      },
      );
  }

  private getThumbnail(): Observable<Bitstream> {
    const itemThumbnail$ = this.dso?.thumbnail?.pipe(
      getFirstCompletedRemoteData(),
      getRemoteDataPayload(),
      take(1),
      catchError(() => of(null)),
    ) ?? of(null);

    return itemThumbnail$.pipe(
      switchMap((itemThumbnail: Bitstream) => {
        if (itemThumbnail) {
          return of(itemThumbnail);
        }

        const options = Object.assign(new FindListOptions(), { elementsPerPage: 1, currentPage: 1 });
        return this.bitstreamDataService.showableByItem(
          this.dso.uuid,
          'ORIGINAL',
          [],
          options,
          true,
          true,
          followLink('thumbnail', { isOptional: true }),
          followLink('format', { isOptional: true }),
        ).pipe(
          getFirstCompletedRemoteData(),
          getRemoteDataPayload(),
          getPaginatedListPayload(),
          map((page: Bitstream[]) => page?.[0] ?? null),
          switchMap((original: Bitstream) => {
            if (!original) {
              return of(null);
            }

            return original.format?.pipe(
              getFirstCompletedRemoteData(),
              map((formatRD) => formatRD?.payload as BitstreamFormat),
              map((format: BitstreamFormat) => (format?.mimetype ?? '').toLowerCase().startsWith('image/')),
              switchMap((isImage) => {
                if (!isImage) {
                  return of(null);
                }

                const derivedThumb$ = original.thumbnail?.pipe(
                  getFirstCompletedRemoteData(),
                  getRemoteDataPayload(),
                  take(1),
                  catchError(() => of(null)),
                ) ?? of(null);

                return derivedThumb$.pipe(
                  map((derived) => derived ?? original),
                );
              }),
              take(1),
              catchError(() => of(null)),
            ) ?? of(null);
          }),
          take(1),
          catchError(() => of(null)),
        );
      }),
      catchError(() => of(null)),
    );
  }

  select(value) {
    this.relationshipService.setNameVariant(this.listID, this.dso.uuid, value);
    this.selectableListService.isObjectSelected(this.listID, this.object)
      .pipe(take(1))
      .subscribe((selected) => {
        if (!selected) {
          this.selectableListService.selectSingle(this.listID, this.object);
        }
      });
  }

  selectCustom(value) {
    if (!this.allSuggestions.includes(value)) {
      this.openModal(value)
        .then(() => {
          // user clicked ok: store the name variant in the item
          const newName: MetadataValue = new MetadataValue();
          newName.value = value;

          const existingNames: MetadataValue[] = this.dso.metadata[this.alternativeField] || [];
          const alternativeNames = { [this.alternativeField]: [...existingNames, newName] };
          const updatedItem =
              Object.assign({}, this.dso, {
                metadata: {
                  ...this.dso.metadata,
                  ...alternativeNames,
                },
              });
          this.itemDataService.update(updatedItem).pipe(take(1)).subscribe();
          this.itemDataService.commitUpdates();
        }).catch(() => {
        // user clicked cancel: use the name variant only for this relation, no further action required
        }).finally(() => {
          this.select(value);
        });
    }
  }

  openModal(value): Promise<any> {
    const modalRef = this.modalService.open(NameVariantModalComponent, { centered: true });

    const modalComp = modalRef.componentInstance;
    modalComp.value = value;
    return modalRef.result;
  }
}
