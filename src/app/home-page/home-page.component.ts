import {
  AsyncPipe,
  isPlatformServer,
  NgClass,
} from '@angular/common';
import {
  Component,
  Inject,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouterModule } from '@angular/router';
import {
  BehaviorSubject,
  combineLatest,
  Observable,
  of,
} from 'rxjs';
import {
  catchError,
  map,
  startWith,
  switchMap,
  take,
} from 'rxjs/operators';
import {
  APP_CONFIG,
  AppConfig,
} from 'src/config/app-config.interface';

import { environment } from '../../environments/environment';
import { NotifyInfoService } from '../core/coar-notify/notify-info/notify-info.service';
import { SiteDataService } from '../core/data/site-data.service';
import {
  SectionComponent,
  TextRowSection,
} from '../core/layout/models/section.model';
import { SectionDataService } from '../core/layout/section-data.service';
import { LocaleService } from '../core/locale/locale.service';
import {
  LinkDefinition,
  LinkHeadService,
} from '../core/services/link-head.service';
import { ServerResponseService } from '../core/services/server-response.service';
import { getFirstSucceededRemoteDataPayload } from '../core/shared/operators';
import { Site } from '../core/shared/site.model';
import { SuggestionsPopupComponent } from '../notifications/suggestions/popup/suggestions-popup.component';
import {
  isEmpty,
  isNotEmpty,
} from '../shared/empty.util';
import { ThemedBrowseSectionComponent } from '../shared/explore/section-component/browse-section/themed-browse-section.component';
import { ThemedCountersSectionComponent } from '../shared/explore/section-component/counters-section/themed-counters-section.component';
import { ThemedFacetSectionComponent } from '../shared/explore/section-component/facet-section/themed-facet-section.component';
import { ThemedSearchSectionComponent } from '../shared/explore/section-component/search-section/themed-search-section.component';
import { ThemedTextSectionComponent } from '../shared/explore/section-component/text-section/themed-text-section.component';
import { ThemedTopSectionComponent } from '../shared/explore/section-component/top-section/themed-top-section.component';
import { HomeCoarComponent } from './home-coar/home-coar.component';
import { ThemedHomeNewsComponent } from './home-news/themed-home-news.component';
import { ThemedHomeInfographicsComponent } from './home-infographics/themed-home-infographics.component';

@Component({
  selector: 'ds-base-home-page',
  styleUrls: ['./home-page.component.scss'],
  templateUrl: './home-page.component.html',
  imports: [
    AsyncPipe,
    HomeCoarComponent,
    NgClass,
    RouterModule,
    SuggestionsPopupComponent,
    ThemedBrowseSectionComponent,
    ThemedCountersSectionComponent,
    ThemedFacetSectionComponent,
    ThemedHomeNewsComponent,
    ThemedSearchSectionComponent,
    ThemedTextSectionComponent,
    ThemedTopSectionComponent,
    ThemedHomeInfographicsComponent,
  ],
})
export class HomePageComponent implements OnInit, OnDestroy {

  site$: BehaviorSubject<Site> = new BehaviorSubject<Site>(null);
  recentSubmissionspageSize: number;

  sectionId = 'site';

  /**
   * Two-dimensional array (rows and columns) of section components
   */
  sectionComponents: Observable<SectionComponent[][]>;
  flatSectionComponents$: Observable<SectionComponent[]>;
  searchSectionComponents$: Observable<SectionComponent[]>;
  facetSectionComponents$: Observable<SectionComponent[]>;
  mainSectionComponents$: Observable<SectionComponent[]>;
  mainSectionComponentRows$: Observable<SectionComponent[][]>;

  hasHomeHeaderMetadata: boolean;

  homeHeaderSection: TextRowSection = {
    content: 'cris.cms.home-header',
    contentType: 'text-metadata',
    componentType: 'text-row',
    style: '',
  };

  /**
   * An array of LinkDefinition objects representing inbox links for the home page.
   */
  inboxLinks: LinkDefinition[] = [];

  constructor(
    @Inject(APP_CONFIG) protected appConfig: AppConfig,
    @Inject(PLATFORM_ID) private platformId: string,
    private route: ActivatedRoute,
    private sectionDataService: SectionDataService,
    private siteService: SiteDataService,
    private locale: LocaleService,
    private responseService: ServerResponseService,
    private notifyInfoService: NotifyInfoService,
    protected linkHeadService: LinkHeadService,
  ) {
    this.recentSubmissionspageSize = environment.homePage.recentSubmissions.pageSize;
    // Get COAR REST API URLs from REST configuration
    // only if COAR configuration is enabled
    this.notifyInfoService.isCoarConfigEnabled().pipe(
      switchMap((coarLdnEnabled: boolean) => {
        if (coarLdnEnabled) {
          return this.notifyInfoService.getCoarLdnLocalInboxUrls();
        } else {
          return of([]);
        }
      }),
    ).subscribe((coarRestApiUrls: string[]) => {
      if (coarRestApiUrls.length > 0) {
        this.initPageLinks(coarRestApiUrls);
      }
    });
  }

  ngOnInit(): void {
    this.route.data.pipe(
      map((data) => data.site as Site),
      take(1),
    ).subscribe((site: Site) => {
      this.site$.next(site);
    });

    this.sectionComponents = this.sectionDataService.findById('site').pipe(
      getFirstSucceededRemoteDataPayload(),
      map((section) => section.componentRows),
    );

    this.flatSectionComponents$ = this.sectionComponents.pipe(
      map((rows) => rows?.flat() ?? []),
    );

    this.searchSectionComponents$ = this.flatSectionComponents$.pipe(
      map((components) => components.filter((c) => c.componentType === 'search')),
    );

    this.facetSectionComponents$ = this.flatSectionComponents$.pipe(
      map((components) => components.filter((c) => c.componentType === 'facet')),
    );

    this.mainSectionComponents$ = this.flatSectionComponents$.pipe(
      map((components) => components.filter((c) => c.componentType !== 'facet' && c.componentType !== 'search')),
    );

    // Non-top section rows from 'site' (browse, counters, text-row)
    const siteNonTopRows$ = this.sectionComponents.pipe(
      map((rows) => (rows ?? [])
        .map((row) => row.filter((c) => c.componentType !== 'facet' && c.componentType !== 'search' && c.componentType !== 'top'))
        .filter((row) => row.length > 0),
      ),
    );

    // Top section rows from 'researchoutputs' — uses valid discovery configs, avoids the homepage error
    const researchOutputsTopRows$ = this.sectionDataService.findById('researchoutputs').pipe(
      getFirstSucceededRemoteDataPayload(),
      map((section) => (section.componentRows ?? [])
        .map((row) => row.filter((c) => c.componentType === 'top'))
        .filter((row) => row.length > 0),
      ),
      catchError(() => of([] as SectionComponent[][])),
      startWith([] as SectionComponent[][]),
    );

    this.mainSectionComponentRows$ = combineLatest([siteNonTopRows$, researchOutputsTopRows$]).pipe(
      map(([siteNonTopRows, researchOutTopRows]) => [...siteNonTopRows, ...researchOutTopRows]),
    );

    combineLatest([this.siteService.find().pipe(take(1)), this.locale.getCurrentLanguageCode()]).subscribe(
      ([site, language]: [Site, string]) => {
        this.hasHomeHeaderMetadata = !isEmpty(site?.firstMetadataValue('cris.cms.home-header',
          { language }));
      },
    );
  }

  componentClass(sectionComponent: SectionComponent) {
    const defaultCol = 'col-12';
    return (isNotEmpty(sectionComponent.style) && sectionComponent.style.includes('col')) ?
      sectionComponent.style : `${defaultCol} ${sectionComponent.style}`;
  }

  hasColClass(style: string): boolean {
    return style?.split(' ').some((c) => c === 'col' || c.startsWith('col-')) ?? false;
  }

  /**
   * Initializes page links for COAR REST API URLs.
   * @param coarRestApiUrls An array of COAR REST API URLs.
   */
  private initPageLinks(coarRestApiUrls: string[]): void {
    const rel = this.notifyInfoService.getInboxRelationLink();
    let links = '';
    coarRestApiUrls.forEach((coarRestApiUrl: string) => {
      // Add link to head
      const tag: LinkDefinition = {
        href: coarRestApiUrl,
        rel: rel,
      };
      this.inboxLinks.push(tag);
      this.linkHeadService.addTag(tag);

      links = links + (isNotEmpty(links) ? ', ' : '') + `<${coarRestApiUrl}> ; rel="${rel}"`;
    });

    if (isPlatformServer(this.platformId)) {
      // Add link to response header
      this.responseService.setHeader('Link', links);
    }
  }

  /**
   * It removes the inbox links from the head of the html.
   */
  ngOnDestroy(): void {
    this.inboxLinks.forEach((link: LinkDefinition) => {
      this.linkHeadService.removeTag(`href='${link.href}'`);
    });
  }
}
