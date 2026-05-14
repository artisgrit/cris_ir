import { Component } from '@angular/core';

import { DataReuseContentComponent } from './data-reuse-content/data-reuse-content.component';

@Component({
  selector: 'ds-base-data-reuse',
  templateUrl: './data-reuse.component.html',
  styleUrls: ['./data-reuse.component.scss'],
  imports: [
    DataReuseContentComponent,
  ],
})
/**
 * Component displaying the Data Reuse guide
 */
export class DataReuseComponent {
}
