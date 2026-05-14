import {
  Component,
  OnInit,
} from '@angular/core';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'ds-how-to-deposit-content',
  templateUrl: './how-to-deposit-content.component.html',
  styleUrls: ['./how-to-deposit-content.component.scss'],
  imports: [
    NgbNavModule,
    RouterModule,
  ],
})
export class HowToDepositContentComponent implements OnInit {
  activeTab = 'overview';

  ngOnInit(): void {
  }
}
