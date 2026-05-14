import {
  AsyncPipe,
  NgClass,
} from '@angular/common';
import {
  AfterViewInit,
  Component,
  Inject,
  Input,
  OnInit,
  Optional,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslatePipe } from '@ngx-translate/core';
import {
  differenceInDays,
  differenceInMilliseconds,
  parseISO,
} from 'date-fns';
import {
  combineLatest,
  Observable,
} from 'rxjs';
import {
  filter,
  map,
  take,
} from 'rxjs/operators';
import { OrejimeService } from 'src/app/shared/cookies/orejime.service';

import {
  APP_CONFIG,
  AppConfig,
} from '../../../../../../../config/app-config.interface';
import { environment } from '../../../../../../../environments/environment';
import { AccessibilitySettingsService } from '../../../../../../accessibility/accessibility-settings.service';
import { getBitstreamDownloadRoute } from '../../../../../../app-routing-paths';
import { DSONameService } from '../../../../../../core/breadcrumbs/dso-name.service';
import { BitstreamDataService } from '../../../../../../core/data/bitstream-data.service';
import { FindListOptions } from '../../../../../../core/data/find-list-options.model';
import { Context } from '../../../../../../core/shared/context.model';
import { Bitstream } from '../../../../../../core/shared/bitstream.model';
import { Item } from '../../../../../../core/shared/item.model';
import { MetadataValueFilter } from '../../../../../../core/shared/metadata.models';
import { PLACEHOLDER_VALUE } from '../../../../../../core/shared/metadata.utils';
import { getFirstCompletedRemoteData, getFirstSucceededRemoteListPayload, getPaginatedListPayload, getRemoteDataPayload } from '../../../../../../core/shared/operators';
import { ViewMode } from '../../../../../../core/shared/view-mode.model';
import { getItemPageRoute } from '../../../../../../item-page/item-page-routing-paths';
import { ThemedThumbnailComponent } from '../../../../../../thumbnail/themed-thumbnail.component';
import { isNotEmpty } from '../../../../../empty.util';
import { MetadataLinkViewComponent } from '../../../../../metadata-link-view/metadata-link-view.component';
import { ThemedBadgesComponent } from '../../../../../object-collection/shared/badges/themed-badges.component';
import { InWorkflowStatisticsComponent } from '../../../../../object-collection/shared/in-workflow-statistics/in-workflow-statistics.component';
import { ItemSearchResult } from '../../../../../object-collection/shared/item-search-result.model';
import { listableObjectComponent } from '../../../../../object-collection/shared/listable-object/listable-object.decorator';
import { InlinePdfViewerComponent } from '../../../../../pdf-viewer/inline-pdf-viewer/inline-pdf-viewer.component';
import { PdfViewerService } from '../../../../../pdf-viewer/pdf-viewer.service';
import { TruncatableComponent } from '../../../../../truncatable/truncatable.component';
import { TruncatableService } from '../../../../../truncatable/truncatable.service';
import { TruncatablePartComponent } from '../../../../../truncatable/truncatable-part/truncatable-part.component';
import { EscapeHtmlPipe } from '../../../../../utils/escape-html.pipe';
import { VarDirective } from '../../../../../utils/var.directive';
import { MetricBadgesComponent } from '../../../../metric-badges/metric-badges.component';
import { MetricDonutsComponent } from '../../../../metric-donuts/metric-donuts.component';
import { AdditionalMetadataComponent } from '../../../additional-metadata/additional-metadata.component';
import { SearchResultListElementComponent } from '../../../search-result-list-element.component';

@listableObjectComponent('PublicationSearchResult', ViewMode.ListElement)
@listableObjectComponent(ItemSearchResult, ViewMode.ListElement)
@listableObjectComponent(ItemSearchResult, ViewMode.ListElement, Context.BrowseMostElements)
@Component({
  selector: 'ds-item-search-result-list-element',
  styleUrls: ['./item-search-result-list-element.component.scss'],
  templateUrl: './item-search-result-list-element.component.html',
  imports: [
    AdditionalMetadataComponent,
    AsyncPipe,
    EscapeHtmlPipe,
    InWorkflowStatisticsComponent,
    InlinePdfViewerComponent,
    MetadataLinkViewComponent,
    MetricBadgesComponent,
    MetricDonutsComponent,
    NgClass,
    RouterLink,
    ThemedBadgesComponent,
    ThemedThumbnailComponent,
    TranslatePipe,
    TruncatableComponent,
    TruncatablePartComponent,
    VarDirective,
  ],
})
/**
 * The component for displaying a list element for an item search result of the type Publication
 */
export class ItemSearchResultListElementComponent extends SearchResultListElementComponent<ItemSearchResult, Item> implements OnInit, AfterViewInit {

  /**
   * Whether to show the metrics badges
   */
  @Input() showMetrics = true;

  /**
   * Route to the item's page
   */
  itemPageRoute: string;
  openPdfInApp$ = this.accessibilitySettingsService.get('pdfViewerOpenInApp', 'true').pipe(map(v => v !== 'false'));
  pdfPreviewSrc = null;

  authorMetadata = environment.searchResult.authorMetadata;

  hasLoadedThirdPartyMetrics$: Observable<boolean>;

  readonly placeholderFilter: MetadataValueFilter = {
    negate: true,
    value: PLACEHOLDER_VALUE,
  };

  private thirdPartyMetrics = environment.info.metricsConsents.filter(metric => metric.enabled).map(metric => metric.key);


  constructor(
    protected truncatableService: TruncatableService,
    public dsoNameService: DSONameService,
    @Inject(APP_CONFIG) protected appConfig: AppConfig,
    private accessibilitySettingsService: AccessibilitySettingsService,
    private bitstreamDataService: BitstreamDataService,
    private pdfViewerService: PdfViewerService,
    private modalService: NgbModal,
    @Optional() private orejimeService?: OrejimeService,
  ) {
    super(truncatableService, dsoNameService, appConfig);
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.itemPageRoute = getItemPageRoute(this.dso);
  }

  /**
   * Check if item has Third-party metrics blocked by consents
   */
  ngAfterViewInit() {
    if (this.showMetrics && this.orejimeService && this.orejimeService.watchConsentUpdates instanceof Function) {
      this.orejimeService.watchConsentUpdates();

      this.hasLoadedThirdPartyMetrics$ = combineLatest([
        this.orejimeService.consentsUpdates$.pipe(
          filter(consents => isNotEmpty(consents)),
        ),
        this.dso.metrics?.pipe(
          getFirstSucceededRemoteListPayload(),
          map(metrics => {
            return metrics.filter(metric => this.thirdPartyMetrics.includes(metric.metricType));
          }),
        ),
      ]).pipe(
        map(([consents, metrics = []]) => {
          return metrics.reduce((previous, current) => {
            return consents[current.metricType] && previous;
          }, true);
        }),
      );
    }
  }

  getDateForItem(itemStartDate: string) {
    const itemStartDateConverted: Date = parseISO(itemStartDate);
    const days: number = Math.floor(differenceInDays(Date.now(), itemStartDateConverted));
    const remainingMilliseconds: number = differenceInMilliseconds(Date.now(), itemStartDateConverted) - days * 24 * 60 * 60 * 1000;
    const hours: number = Math.floor(remainingMilliseconds / (60 * 60 * 1000));
    return `${days} d ${hours} h`;
  }

  /**
   * Prompt user for consents settings
   */
  showSettings() {
    this.orejimeService.showSettings();
  }

  openFirstPdf(modalContent: any) {
    this.openPdfInApp$.pipe(take(1)).subscribe((enabled) => {
      if (!enabled) {
        return;
      }
      const options = Object.assign(new FindListOptions(), { elementsPerPage: 20, currentPage: 1 });
      this.bitstreamDataService.showableByItem(this.dso.uuid, 'ORIGINAL', [], options).pipe(
        getFirstCompletedRemoteData(),
        getRemoteDataPayload(),
        getPaginatedListPayload(),
        map((page: Bitstream[]) => page?.find(b => (this.dsoNameService.getName(b) ?? '').toLowerCase().endsWith('.pdf'))),
        take(1),
      ).subscribe((pdfBitstream) => {
        if (!pdfBitstream) {
          return;
        }
        const url = getBitstreamDownloadRoute(pdfBitstream);
        const contentUrl = this.pdfViewerService.toApiContentUrl(url);
        this.pdfViewerService.toSafePdfUrlWithAuth(contentUrl).pipe(take(1)).subscribe((safeUrl) => {
          this.pdfPreviewSrc = safeUrl;
          this.modalService.open(modalContent, { size: 'xl', scrollable: true, centered: true });
        });
      });
    });
  }

}
