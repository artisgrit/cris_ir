import { Component } from '@angular/core';

import { HowToDepositContentComponent } from './how-to-deposit-content/how-to-deposit-content.component';

@Component({
  selector: 'ds-base-how-to-deposit',
  templateUrl: './how-to-deposit.component.html',
  styleUrls: ['./how-to-deposit.component.scss'],
  imports: [
    HowToDepositContentComponent,
  ],
})
/**
 * Component displaying the How to Deposit guide
 */
export class HowToDepositComponent {
}
