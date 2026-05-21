import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, take } from 'rxjs/operators';

import { BitstreamDataService } from '../../../../core/data/bitstream-data.service';
import { FindListOptions } from '../../../../core/data/find-list-options.model';
import { Bitstream } from '../../../../core/shared/bitstream.model';
import { BitstreamFormat } from '../../../../core/shared/bitstream-format.model';
import { getFirstCompletedRemoteData, getPaginatedListPayload, getRemoteDataPayload } from '../../../../core/shared/operators';
import { RouteService } from '../../../../core/services/route.service';
import { ViewMode } from '../../../../core/shared/view-mode.model';
import { GenericItemPageFieldComponent } from '../../../../item-page/simple/field-components/specific-field/generic/generic-item-page-field.component';
import { ThemedItemPageTitleFieldComponent } from '../../../../item-page/simple/field-components/specific-field/title/themed-item-page-field.component';
import { ItemComponent } from '../../../../item-page/simple/item-types/shared/item.component';
import { TabbedRelatedEntitiesSearchComponent } from '../../../../item-page/simple/related-entities/tabbed-related-entities-search/tabbed-related-entities-search.component';
import { RelatedItemsComponent } from '../../../../item-page/simple/related-items/related-items-component';
import { ContextMenuComponent } from '../../../../shared/context-menu/context-menu.component';
import { MetadataFieldWrapperComponent } from '../../../../shared/metadata-field-wrapper/metadata-field-wrapper.component';
import { listableObjectComponent } from '../../../../shared/object-collection/shared/listable-object/listable-object.decorator';
import { ThemedResultsBackButtonComponent } from '../../../../shared/results-back-button/themed-results-back-button.component';
import { followLink } from '../../../../shared/utils/follow-link-config.model';
import { ThemedThumbnailComponent } from '../../../../thumbnail/themed-thumbnail.component';

@listableObjectComponent('Person', ViewMode.StandalonePage)
@Component({
  selector: 'ds-person',
  styleUrls: ['./person.component.scss'],
  templateUrl: './person.component.html',
  imports: [
    AsyncPipe,
    ContextMenuComponent,
    GenericItemPageFieldComponent,
    MetadataFieldWrapperComponent,
    RelatedItemsComponent,
    RouterLink,
    TabbedRelatedEntitiesSearchComponent,
    ThemedItemPageTitleFieldComponent,
    ThemedResultsBackButtonComponent,
    ThemedThumbnailComponent,
    TranslateModule,
  ],
})
/**
 * The component for displaying metadata and relations of an item of the type Person
 */
export class PersonComponent extends ItemComponent {

  /**
   * Thumbnail for the Person's profile picture.
   * Prefer the item's thumbnail, but fall back to the first ORIGINAL image bitstream.
   */
  thumbnail$: Observable<Bitstream> = of(null);

  constructor(
    protected routeService: RouteService,
    protected router: Router,
    private bitstreamDataService: BitstreamDataService,
  ) {
    super(routeService, router);
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.thumbnail$ = this.getThumbnail().pipe(take(1));
  }

  private getThumbnail(): Observable<Bitstream> {
    const itemThumbnail$ = this.object?.thumbnail?.pipe(
      getFirstCompletedRemoteData(),
      getRemoteDataPayload(),
      take(1),
      catchError(() => of(null)),
    ) ?? of(null);

    const options = Object.assign(new FindListOptions(), { elementsPerPage: 1, currentPage: 1 });
    const originalImage$ = this.bitstreamDataService.showableByItem(
      this.object.uuid,
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

        const derivedThumb$ = original.thumbnail?.pipe(
          getFirstCompletedRemoteData(),
          getRemoteDataPayload(),
          take(1),
          catchError(() => of(null)),
        ) ?? of(null);

        return original.format?.pipe(
          getFirstCompletedRemoteData(),
          map((formatRD) => formatRD?.payload as BitstreamFormat),
          switchMap((format: BitstreamFormat) => {
            const isImage = (format?.mimetype ?? '').toLowerCase().startsWith('image/');
            if (isImage) {
              return of(original);
            }
            return derivedThumb$.pipe(
              map((derived) => derived ?? null),
            );
          }),
          take(1),
          catchError(() => of(null)),
        ) ?? derivedThumb$;
      }),
      take(1),
      catchError(() => of(null)),
    );

    return originalImage$.pipe(
      switchMap((originalImage: Bitstream) => {
        if (originalImage) {
          return of(originalImage);
        }
        return itemThumbnail$;
      }),
      catchError(() => itemThumbnail$),
    );
  }
}
