import { Component } from '@angular/core';

import { DataReuseContentComponent } from './data-reuse-content/data-reuse-content.component';
import { DataReuseComponent } from './data-reuse.component';

@Component({
  selector: 'ds-themed-data-reuse',
  styleUrls: [],
  templateUrl: './data-reuse.component.html',
  imports: [DataReuseContentComponent],
})
/**
 * Themed wrapper for DataReuseComponent
 */
export class ThemedDataReuseComponent extends DataReuseComponent {
}
