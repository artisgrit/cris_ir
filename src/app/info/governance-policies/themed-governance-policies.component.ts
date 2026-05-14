import { Component } from '@angular/core';

import { GovernancePoliciesContentComponent } from './governance-policies-content/governance-policies-content.component';
import { GovernancePoliciesComponent } from './governance-policies.component';

@Component({
  selector: 'ds-themed-governance-policies',
  styleUrls: [],
  templateUrl: './governance-policies.component.html',
  imports: [GovernancePoliciesContentComponent],
})
/**
 * Themed wrapper for GovernancePoliciesComponent
 */
export class ThemedGovernancePoliciesComponent extends GovernancePoliciesComponent {
}
