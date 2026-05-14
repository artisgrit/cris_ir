import {
  Component,
  OnInit,
} from '@angular/core';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ds-governance-policies-content',
  templateUrl: './governance-policies-content.component.html',
  styleUrls: ['./governance-policies-content.component.scss'],
  imports: [
    NgbNavModule,
  ],
})
export class GovernancePoliciesContentComponent implements OnInit {
  activeTab = 'overview';

  ngOnInit(): void {
  }
}
