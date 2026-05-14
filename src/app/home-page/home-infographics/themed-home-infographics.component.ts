import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HomeInfographicsComponent } from './home-infographics.component';

@Component({
  selector: 'ds-themed-home-infographics',
  styleUrls: [],
  templateUrl: './home-infographics.component.html',
  imports: [CommonModule, RouterModule],
})
/**
 * Themed wrapper for HomeInfographicsComponent
 */
export class ThemedHomeInfographicsComponent extends HomeInfographicsComponent {
}
