import { AsyncPipe } from '@angular/common';
import {
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import {
  APP_CONFIG,
  AppConfig,
} from '../../../../../../config/app-config.interface';
import { DSONameService } from '../../../../../core/breadcrumbs/dso-name.service';
import { LinkService } from '../../../../../core/cache/builders/link.service';
import { Context } from '../../../../../core/shared/context.model';
import { Item } from '../../../../../core/shared/item.model';
import { getFirstSucceededRemoteDataPayload } from '../../../../../core/shared/operators';
import { ViewMode } from '../../../../../core/shared/view-mode.model';
import { WorkspaceItem } from '../../../../../core/submission/models/workspaceitem.model';
import { ThemedLoadingComponent } from '../../../../../shared/loading/themed-loading.component';
import { CollectionElementLinkType } from '../../../../../shared/object-collection/collection-element-link.type';
import { ItemSearchResult } from '../../../../../shared/object-collection/shared/item-search-result.model';
import { listableObjectComponent } from '../../../../../shared/object-collection/shared/listable-object/listable-object.decorator';
import { ListableObjectComponentLoaderComponent } from '../../../../../shared/object-collection/shared/listable-object/listable-object-component-loader.component';
import { WorkspaceItemSearchResult } from '../../../../../shared/object-collection/shared/workspace-item-search-result.model';
import { SearchResultListElementComponent } from '../../../../../shared/object-list/search-result-list-element/search-result-list-element.component';
import { TruncatableService } from '../../../../../shared/truncatable/truncatable.service';
import { followLink } from '../../../../../shared/utils/follow-link-config.model';
import { WorkspaceItemAdminWorkflowActionsComponent } from '../../actions/workspace-item/workspace-item-admin-workflow-actions.component';

@Component({
  selector: 'ds-workspace-item-admin-workflow-result-grid-element',
  templateUrl: './workspace-item-search-result-admin-workflow-grid-element.component.html',
  imports: [
    AsyncPipe,
    ListableObjectComponentLoaderComponent,
    ThemedLoadingComponent,
    WorkspaceItemAdminWorkflowActionsComponent,
  ],
})
@listableObjectComponent(WorkspaceItemSearchResult, ViewMode.GridElement, Context.AdminWorkflowSearch)
export class WorkspaceItemSearchResultAdminWorkflowGridElementComponent extends SearchResultListElementComponent<WorkspaceItemSearchResult, WorkspaceItem> implements OnInit {
  LinkTypes = CollectionElementLinkType;

  ViewModes = ViewMode;

  derivedSearchResult$: BehaviorSubject<ItemSearchResult> = new BehaviorSubject(undefined);

  public badgeContext = Context.MyDSpaceWorkspace;

  constructor(
    protected truncatableService: TruncatableService,
    protected linkService: LinkService,
    public dsoNameService: DSONameService,
    @Inject(APP_CONFIG) protected appConfig: AppConfig,
  ) {
    super(truncatableService, dsoNameService, appConfig);
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.deriveSearchResult();
  }

  private deriveSearchResult() {
    this.linkService.resolveLink(this.object.indexableObject, followLink('item'));
    this.object.indexableObject.item.pipe(
      getFirstSucceededRemoteDataPayload(),
    ).subscribe((item: Item) => {
      this.derivedSearchResult$.next(Object.assign(new ItemSearchResult(), {
        indexableObject: item,
        hitHighlights: this.object.hitHighlights,
      }));
    });
  }
}

