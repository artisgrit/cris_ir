import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';

import { HomeNewsComponent as BaseComponent } from '../../../../../app/home-page/home-news/home-news.component';
import { ThemedHomeInfographicsComponent } from '../../../../../app/home-page/home-infographics/themed-home-infographics.component';
import { ThemedTextSectionComponent } from '../../../../../app/shared/explore/section-component/text-section/themed-text-section.component';

@Component({
  selector: 'ds-themed-home-news',
  // styleUrls: ['./home-news.component.scss'],
  styleUrls: ['../../../../../app/home-page/home-news/home-news.component.scss'],
  // templateUrl: './home-news.component.html'
  templateUrl: '../../../../../app/home-page/home-news/home-news.component.html',
  imports: [
    AsyncPipe,
    ThemedHomeInfographicsComponent,
    ThemedTextSectionComponent,
  ],
})
export class HomeNewsComponent extends BaseComponent {
}
