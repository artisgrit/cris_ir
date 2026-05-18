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
import { FormsModule } from '@angular/forms';
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
    FormsModule,
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
  showBrandedCover = true;
  citationStyle = 'APA';
  readonly citationStyles = [
    'APA',
    'BibTeX',
    'Chicago',
    'Harvard',
    'MHRA',
    'MLA',
    'OSCOLA',
    'Vancouver',
  ] as const;

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

  getPreviewItemUrl(): string {
    const uri = (this.dso?.firstMetadataValue('dc.identifier.uri') ?? '').trim();
    if (uri) {
      return uri;
    }
    if (typeof window !== 'undefined' && window?.location?.origin) {
      return `${window.location.origin}${this.itemPageRoute ?? ''}`;
    }
    return this.itemPageRoute ?? '';
  }

  getCoverAuthors(): string {
    const authors = [
      ...(this.dso?.allMetadataValues('dc.contributor.author', this.placeholderFilter) ?? []),
      ...(this.dso?.allMetadataValues('dc.creator', this.placeholderFilter) ?? []),
    ].map((v) => (v ?? '').trim()).filter(Boolean);

    const unique = Array.from(new Set(authors));
    if (!unique.length) {
      return '';
    }
    return unique.slice(0, 5).join('; ') + (unique.length > 5 ? ' …' : '');
  }

  getCoverYear(): string {
    const issued = (this.dso?.firstMetadataValue('dc.date.issued') ?? '').trim();
    return issued ? issued.substring(0, 4) : '';
  }

  onCitationStyleChange(style: string): void {
    this.citationStyle = style;
  }

  getCitationText(style = this.citationStyle): string {
    // Prefer a repository-provided citation if present.
    const providedCitation = (this.dso?.firstMetadataValue('dc.identifier.citation') ?? '').trim();
    if (providedCitation) {
      return providedCitation;
    }

    const title = (this.dso?.firstMetadataValue('dc.title') ?? '').trim();
    const publisher = (this.dso?.firstMetadataValue('dc.publisher') ?? '').trim();
    const issued = (this.dso?.firstMetadataValue('dc.date.issued') ?? '').trim();
    const year = issued ? issued.substring(0, 4) : '';

    const doiRaw = (this.dso?.firstMetadataValue('dc.identifier.doi') ?? '').trim();
    const doi = doiRaw ? (doiRaw.startsWith('http') ? doiRaw : `https://doi.org/${doiRaw}`) : '';

    const uri = (this.dso?.firstMetadataValue('dc.identifier.uri') ?? '').trim();
    const link = doi || uri;

    const authors = [
      ...(this.dso?.allMetadataValues('dc.contributor.author', this.placeholderFilter) ?? []),
      ...(this.dso?.allMetadataValues('dc.creator', this.placeholderFilter) ?? []),
    ].map((v) => (v ?? '').trim()).filter(Boolean);

    switch (style) {
      case 'APA':
        return this.toApa7(authors, year, title, publisher, link);
      case 'BibTeX':
        return this.toBibTeX(authors, year, title, publisher, doi || uri);
      case 'Chicago':
        return this.toChicago(authors, year, title, publisher, link);
      case 'Harvard':
        return this.toHarvard(authors, year, title, publisher, link);
      case 'MHRA':
        return this.toMhra(authors, year, title, publisher, link);
      case 'MLA':
        return this.toMla(authors, year, title, publisher, link);
      case 'OSCOLA':
        return this.toOscola(authors, year, title, publisher, link);
      case 'Vancouver':
        return this.toVancouver(authors, year, title, publisher, link);
      default:
        return this.toApa7(authors, year, title, publisher, link);
    }
  }

  async copyCitation(): Promise<void> {
    const text = this.getCitationText();
    try {
      if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
        return;
      }
    } catch {
      // Fall back to legacy copy path below
    }

    try {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.setAttribute('readonly', 'true');
      textarea.style.position = 'fixed';
      textarea.style.left = '-9999px';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
    } catch {
      // If copy fails, do nothing (user can still manually select/copy).
    }
  }

  private uniq(values: string[]): string[] {
    return Array.from(new Set((values ?? []).filter(Boolean)));
  }

  private toApa7(authors: string[], year: string, title: string, publisher: string, link: string): string {
    const authorText = this.formatAuthorsApa7(this.uniq(authors));
    const parts = [
      authorText,
      year ? `(${year}).` : '(n.d.).',
      title ? `${this.toSentenceCase(title)}.` : '',
      publisher ? `${publisher}.` : '',
      link,
    ].filter(Boolean);
    return parts.join(' ').replace(/\s+/g, ' ').trim();
  }

  private toHarvard(authors: string[], year: string, title: string, publisher: string, link: string): string {
    const authorText = this.formatAuthorsHarvard(this.uniq(authors));
    const parts = [
      authorText,
      year ? `(${year})` : '(n.d.)',
      title ? `${title}.` : '',
      publisher ? `${publisher}.` : '',
      link ? `Available at: ${link}.` : '',
    ].filter(Boolean);
    return parts.join(' ').replace(/\s+/g, ' ').trim();
  }

  private toChicago(authors: string[], year: string, title: string, publisher: string, link: string): string {
    const authorText = this.formatAuthorsChicago(this.uniq(authors));
    const parts = [
      authorText ? `${authorText}.` : '',
      title ? `"${title}".` : '',
      publisher ? `${publisher},` : '',
      year || 'n.d.',
      link ? `${link}.` : '',
    ].filter(Boolean);
    return parts.join(' ').replace(/\s+/g, ' ').trim();
  }

  private toMla(authors: string[], year: string, title: string, publisher: string, link: string): string {
    const authorText = this.formatAuthorsMla(this.uniq(authors));
    const parts = [
      authorText ? `${authorText}.` : '',
      title ? `"${title}".` : '',
      publisher ? `${publisher},` : '',
      year || 'n.d.',
      link ? `${link}.` : '',
    ].filter(Boolean);
    return parts.join(' ').replace(/\s+/g, ' ').trim();
  }

  private toMhra(authors: string[], year: string, title: string, publisher: string, link: string): string {
    const authorText = this.formatAuthorsMhra(this.uniq(authors));
    const parts = [
      authorText ? `${authorText},` : '',
      title ? `"${title}"` : '',
      publisher ? `(${publisher}${year ? `, ${year}` : ''})` : (year ? `(${year})` : ''),
      link ? `${link}.` : '',
    ].filter(Boolean);
    return parts.join(' ').replace(/\s+/g, ' ').trim();
  }

  private toOscola(authors: string[], year: string, title: string, publisher: string, link: string): string {
    // OSCOLA is legal-focused; keep a conservative, readable format.
    const authorText = this.formatAuthorsOscola(this.uniq(authors));
    const parts = [
      authorText ? `${authorText},` : '',
      title ? `${title},` : '',
      publisher || '',
      year ? `(${year})` : '',
      link,
    ].filter(Boolean);
    return parts.join(' ').replace(/\s+/g, ' ').trim();
  }

  private toVancouver(authors: string[], year: string, title: string, publisher: string, link: string): string {
    const authorText = this.formatAuthorsVancouver(this.uniq(authors));
    const parts = [
      authorText,
      title ? `${title}.` : '',
      publisher ? `${publisher}.` : '',
      year ? `${year}.` : '',
      link,
    ].filter(Boolean);
    return parts.join(' ').replace(/\s+/g, ' ').trim();
  }

  private formatAuthorsApa7(authors: string[]): string {
    if (!authors.length) return '';
    const formatted = authors.map((a) => this.toApaName(a)).filter(Boolean);
    if (!formatted.length) return '';

    // APA 7: list up to 20 authors. If > 20, include first 19, ellipsis, and final author.
    if (formatted.length > 20) {
      const first19 = formatted.slice(0, 19);
      const last = formatted[formatted.length - 1];
      return `${first19.join(', ')}, … ${last}`;
    }
    if (formatted.length === 1) return formatted[0];
    if (formatted.length === 2) return `${formatted[0]} & ${formatted[1]}`;
    return `${formatted.slice(0, -1).join(', ')}, & ${formatted[formatted.length - 1]}`;
  }

  private formatAuthorsHarvard(authors: string[]): string {
    if (!authors.length) return '';
    if (authors.length === 1) return authors[0];
    if (authors.length === 2) return `${authors[0]} and ${authors[1]}`;
    return `${authors[0]} et al.`;
  }

  private formatAuthorsChicago(authors: string[]): string {
    if (!authors.length) return '';
    if (authors.length === 1) return authors[0];
    if (authors.length === 2) return `${authors[0]} and ${authors[1]}`;
    return `${authors[0]} et al.`;
  }

  private formatAuthorsMla(authors: string[]): string {
    if (!authors.length) return '';
    if (authors.length === 1) return authors[0];
    return `${authors[0]}, et al`;
  }

  private formatAuthorsMhra(authors: string[]): string {
    if (!authors.length) return '';
    if (authors.length === 1) return authors[0];
    if (authors.length === 2) return `${authors[0]} and ${authors[1]}`;
    return `${authors[0]} and others`;
  }

  private formatAuthorsOscola(authors: string[]): string {
    if (!authors.length) return '';
    return authors.length > 2 ? `${authors[0]} and others` : authors.join(' and ');
  }

  private formatAuthorsVancouver(authors: string[]): string {
    if (!authors.length) return '';
    return authors.slice(0, 6).join(', ') + (authors.length > 6 ? ', et al.' : '');
  }

  private toApaName(name: string): string {
    const trimmed = (name ?? '').trim();
    if (!trimmed) return '';

    // If already "Last, F." style, keep it.
    if (trimmed.includes(',')) {
      return trimmed;
    }

    // Heuristic: "First Middle Last" -> "Last, F. M."
    const parts = trimmed.split(/\s+/).filter(Boolean);
    if (parts.length === 1) return parts[0];
    const last = parts[parts.length - 1];
    const initials = parts.slice(0, -1).map((p) => p[0]?.toUpperCase()).filter(Boolean).map((i) => `${i}.`).join(' ');
    return `${last}, ${initials}`.trim();
  }

  private toSentenceCase(value: string): string {
    const trimmed = (value ?? '').trim();
    if (!trimmed) return '';
    // Keep acronyms/initialisms; only lowercase the tail as a heuristic.
    const firstChar = trimmed[0].toUpperCase();
    const rest = trimmed.slice(1);
    return `${firstChar}${rest}`;
  }

  private toBibTeX(authors: string[], year: string, title: string, publisher: string, identifier: string): string {
    const safeKeyBase = (authors?.[0] ?? 'ucudir').replace(/[^a-zA-Z0-9]/g, '').toLowerCase() || 'ucudir';
    const safeYear = year || 'n.d.';
    const key = `${safeKeyBase}${safeYear}`.replace(/\./g, '');
    const author = (authors ?? []).join(' and ');
    const url = identifier?.startsWith('http') ? identifier : '';

    const lines = [
      `@misc{${key},`,
      author ? `  author = {${author}},` : null,
      title ? `  title = {${title}},` : null,
      year ? `  year = {${year}},` : null,
      publisher ? `  publisher = {${publisher}},` : null,
      url ? `  url = {${url}},` : null,
      `}`,
    ].filter(Boolean);

    return lines.join('\n');
  }

}
