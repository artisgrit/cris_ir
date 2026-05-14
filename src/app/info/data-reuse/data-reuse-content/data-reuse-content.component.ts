import {
  Component,
  OnInit,
} from '@angular/core';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'ds-data-reuse-content',
  templateUrl: './data-reuse-content.component.html',
  styleUrls: ['./data-reuse-content.component.scss'],
  imports: [
    NgbNavModule,
    RouterModule,
  ],
})
export class DataReuseContentComponent implements OnInit {
  activeTab = 'discover';

  ngOnInit(): void {
  }
}
