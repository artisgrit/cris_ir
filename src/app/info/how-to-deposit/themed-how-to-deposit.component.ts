import { Component } from '@angular/core';

import { HowToDepositContentComponent } from './how-to-deposit-content/how-to-deposit-content.component';
import { HowToDepositComponent } from './how-to-deposit.component';

@Component({
  selector: 'ds-themed-how-to-deposit',
  styleUrls: [],
  templateUrl: './how-to-deposit.component.html',
  imports: [HowToDepositContentComponent],
})
/**
 * Themed wrapper for HowToDepositComponent
 */
export class ThemedHowToDepositComponent extends HowToDepositComponent {
}
