import { AsyncPipe } from '@angular/common';
import {
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';

import { getFirstSucceededRemoteDataPayload } from '../../core/shared/operators';
import { SearchConfigurationService } from '../../core/shared/search/search-configuration.service';
import { SearchService } from '../../core/shared/search/search.service';
import { FacetValue } from '../../shared/search/models/facet-value.model';
import { FilterType } from '../../shared/search/models/filter-type.model';
import { SearchFilterConfig } from '../../shared/search/models/search-filter-config.model';
import { getFacetValueForTypeAndLabel } from '../../shared/search/search.utils';

@Component({
  selector: 'ds-home-discover',
  templateUrl: './home-discover.component.html',
  styleUrls: ['./home-discover.component.scss'],
  imports: [
    AsyncPipe,
    NgbAccordionModule,
    RouterLink,
    TranslateModule,
  ],
})
export class HomeDiscoverComponent implements OnInit {
  @Input() discoveryConfiguration: string;

  facets: SearchFilterConfig[] = [];
  facets$ = new BehaviorSubject<SearchFilterConfig[]>(this.facets);

  constructor(
    private searchConfigService: SearchConfigurationService,
    private searchService: SearchService,
  ) {}

  ngOnInit(): void {
    if (!this.discoveryConfiguration) {
      this.facets$.next([]);
      return;
    }

    this.searchConfigService.searchFacets(null, this.discoveryConfiguration)
      .pipe(getFirstSucceededRemoteDataPayload())
      .subscribe((facetConfigs) => {
        this.facets = (facetConfigs ?? []).filter((config) => config?._embedded?.values?.length > 0);
        this.facets$.next(this.facets);
      });
  }

  getSearchLink(): string[] {
    return [this.searchService.getSearchLink()];
  }

  getSearchQueryParams(facet: SearchFilterConfig, facetValue: FacetValue): Record<string, unknown> {
    const queryParams: Record<string, unknown> = {
      configuration: this.discoveryConfiguration,
      page: 1,
    };

    if (this.isRangeFacet(facet.filterType, facetValue.label)) {
      const dates = facetValue.label.split('-');
      queryParams[facet.paramName + '.min'] = dates[0].trim();
      queryParams[facet.paramName + '.max'] = dates[1].trim();
      return queryParams;
    }

    queryParams[facet.paramName] = getFacetValueForTypeAndLabel(facetValue, facet);
    return queryParams;
  }

  private isRangeFacet(filterType: FilterType, value: string): boolean {
    return filterType === FilterType.range && value.split('-').length === 2;
  }
}

