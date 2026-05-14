import { Component } from '@angular/core';

import { GovernancePoliciesContentComponent } from './governance-policies-content/governance-policies-content.component';

@Component({
  selector: 'ds-base-governance-policies',
  templateUrl: './governance-policies.component.html',
  styleUrls: ['./governance-policies.component.scss'],
  imports: [
    GovernancePoliciesContentComponent,
  ],
})
/**
 * Component displaying the Governance & Policies information
 */
export class GovernancePoliciesComponent {
}
