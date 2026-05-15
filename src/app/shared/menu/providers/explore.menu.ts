/**
 * The contents of this file are subject to the license and copyright
 * detailed in the LICENSE and NOTICE files at the root of the source
 * tree and available online at
 *
 * http://www.dspace.org/license/
 */

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { PaginatedList } from '../../../core/data/paginated-list.model';
import { RemoteData } from '../../../core/data/remote-data';
import { Section } from '../../../core/layout/models/section.model';
import { SectionDataService } from '../../../core/layout/section-data.service';
import { getFirstSucceededRemoteData } from '../../../core/shared/operators';
import { MenuItemType } from '../menu-item-type.model';
import {
  AbstractMenuProvider,
  PartialMenuSection,
} from '../menu-provider.model';

/**
 * Menu provider to create the explore menu sections in the public navbar
 */
@Injectable()
export class ExploreMenuProvider extends AbstractMenuProvider {
  constructor(
    protected sectionDataService: SectionDataService,
  ) {
    super();
  }

  /**
   * Retrieves subsections by fetching the browse definitions from the backend and mapping them to partial menu sections.
   */
  getSections(): Observable<PartialMenuSection[]> {
    return this.sectionDataService.findVisibleSections().pipe(
      getFirstSucceededRemoteData(),
      map((rd: RemoteData<PaginatedList<Section>>) => {
        const sectionsById = new Map<string, Section>();
        for (const section of rd.payload.page) {
          sectionsById.set(section.id, section);
        }

        const orderedIds: string[] = [];
        // Research Outputs (prefer researchoutputs, fallback to publications)
        if (sectionsById.has('researchoutputs')) {
          orderedIds.push('researchoutputs');
        } else if (sectionsById.has('publications')) {
          orderedIds.push('publications');
        }

        // Fundings & Projects
        if (sectionsById.has('fundings_and_projects')) {
          orderedIds.push('fundings_and_projects');
        }

        // People
        if (sectionsById.has('researcherprofiles')) {
          orderedIds.push('researcherprofiles');
        }

        // If none of the expected ids exist, keep backend order as fallback
        const idsToRender = orderedIds.length > 0 ? orderedIds : rd.payload.page.map((s) => s.id);

        return idsToRender.map((id, index) => ({
          visible: true,
          index: index + 1,
          model: {
            type: MenuItemType.LINK,
            text: `menu.section.explore_${id}`,
            link: `/explore/${id}`,
          },
        }));
      }),
    );
  }
}
