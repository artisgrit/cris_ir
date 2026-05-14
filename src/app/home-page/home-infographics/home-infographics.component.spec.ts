import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeInfographicsComponent } from './home-infographics.component';

describe('HomeInfographicsComponent', () => {
  let component: HomeInfographicsComponent;
  let fixture: ComponentFixture<HomeInfographicsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeInfographicsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeInfographicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with first tab active', () => {
    expect(component.activeTab).toBe('submissions');
  });

  it('should have three infographic cards', () => {
    expect(component.infographicCards.length).toBe(3);
  });

  it('should set active tab correctly', () => {
    component.setActiveTab('data');
    expect(component.activeTab).toBe('data');
  });

  it('should get correct active card', () => {
    component.setActiveTab('theses');
    const activeCard = component.getActiveCard();
    expect(activeCard.id).toBe('theses');
    expect(activeCard.title).toBe('Theses & Dissertations');
  });
});
