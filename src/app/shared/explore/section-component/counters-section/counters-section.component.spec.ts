import {
  ComponentFixture,
  TestBed,
  waitForAsync,
} from '@angular/core/testing';
import { of } from 'rxjs';

import { SearchManager } from '../../../../core/browse/search-manager';
import { InternalLinkService } from '../../../../core/services/internal-link.service';
import { NativeWindowService } from '../../../../core/services/window.service';
import { ThemedLoadingComponent } from '../../../loading/themed-loading.component';
import { NativeWindowMockFactory } from '../../../mocks/mock-native-window-ref';
import { CountersSectionComponent } from './counters-section.component';

describe('CountersSectionComponent', () => {
  let component: CountersSectionComponent;
  let fixture: ComponentFixture<CountersSectionComponent>;
  let searchManagerSpy: jasmine.SpyObj<SearchManager>;

  beforeEach(waitForAsync(() => {
    searchManagerSpy = jasmine.createSpyObj('SearchManager', ['search']);
    searchManagerSpy.search.and.returnValue(of({ hasSucceeded: true, payload: { totalElements: 1 } } as any));

    TestBed.configureTestingModule({
      imports: [CountersSectionComponent],
      providers: [
        { provide: SearchManager, useValue: searchManagerSpy },
        { provide: InternalLinkService, useValue: {} },
        { provide: NativeWindowService, useFactory: NativeWindowMockFactory },
      ],
    })
      .overrideComponent(CountersSectionComponent, { remove: { imports: [ThemedLoadingComponent] } }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CountersSectionComponent);
    component = fixture.componentInstance;
    component.sectionId = 'section-1';
    component.countersSection = {
      componentType: 'counters',
      style: 'default',
      counterSettingsList: [{
        discoveryConfigurationName: 'default',
        entityName: 'Dataset',
        icon: 'dataset-icon',
        link: '/datasets',
      }],
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should apply the product fixedFilter for dataset counters by default', () => {
    expect(searchManagerSpy.search).toHaveBeenCalled();
    const searchOptions = searchManagerSpy.search.calls.mostRecent().args[0] as any;
    expect(searchOptions.fixedFilter).toBe('f.entityType=Product,equals');
    expect(searchOptions.configuration).toBe('default');
  });
});
