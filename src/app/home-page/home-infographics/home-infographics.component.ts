import {
  Component,
  Input,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface InfographicCard {
  id: string;
  title: string;
  icon: string;
  image?: string;
  description: string;
  viewLink: string;
  viewText: string;
}

@Component({
  selector: 'ds-home-infographics',
  templateUrl: './home-infographics.component.html',
  styleUrls: ['./home-infographics.component.scss'],
  imports: [CommonModule, RouterModule],
})
export class HomeInfographicsComponent {
  @Input() variant: 'tabs' | 'cards' = 'tabs';
  activeTab = 'how-to-deposit';

  infographicCards: InfographicCard[] = [
    {
      id: 'how-to-deposit',
      title: 'How to Deposit',
      icon: 'fas fa-upload fa-xl',
      image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0idXJsKCNncmFkKSIvPjxkZWZzPjxsaW5lYXJHcmFkaWVudCBpZD0iZ3JhZCIgeDE9IjAlIiB5MT0iMCUiIHgyPSIwJSIgeTI9IjEwMCUiPjxzdG9wIG9mZnNldD0iMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiMwYjNkOTE7c3RvcC1vcGFjaXR5OjEiIC8+PHN0b3Agb2Zmc2V0PSIxMDAlIiBzdHlsZT0ic3RvcC1jb2xvcjojMWE1Y2JmO3N0b3Atb3BhY2l0eToxIiAvPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPjwvc3ZnPg==',
      description: 'Detailed information about deposit processes into Apollo, including eligibility for inclusion in Apollo.',
      viewLink: '/info/how-to-deposit',
      viewText: 'How to deposit page'
    },
    {
      id: 'data-reuse',
      title: 'Data Reuse',
      icon: 'fas fa-recycle fa-xl',
      image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0idXJsKCNncmFkKSIvPjxkZWZzPjxsaW5lYXJHcmFkaWVudCBpZD0iZ3JhZCIgeDE9IjAlIiB5MT0iMCUiIHgyPSIxMDAlIiB5Mj0iMTAwJSI+PHN0b3Agb2Zmc2V0PSIwJSIgc3R5bGU9InN0b3AtY29sb3I6IzBiM2Q5MTtzdG9wLW9wYWNpdHk6MSIgLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiNkNzAxNGQ7c3RvcC1vcGFjaXR5OjEiIC8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+PC9zdmc+',
      description: 'Information on how to discover, reuse and cite data in Apollo.',
      viewLink: '/info/data-reuse',
      viewText: 'Data reuse page'
    },
    {
      id: 'governance-policies',
      title: 'Governance',
      icon: 'fas fa-gavel fa-xl',
      image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0idXJsKCNncmFkKSIvPjxkZWZzPjxsaW5lYXJHcmFkaWVudCBpZD0iZ3JhZCIgeDE9IjEwMCUiIHkxPSIwJSIgeDI9IjAlIiB5Mj0iMTAwJSI+PHN0b3Agb2Zmc2V0PSIwJSIgc3R5bGU9InN0b3AtY29sb3I6I2Q3MDE0ZDtzdG9wLW9wYWNpdHk6MSIgLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiNmZmQ5MzI7c3RvcC1vcGFjaXR5OjEiIC8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+PC9zdmc+',
      description: 'Detailed information about repository governance and an outline of key relevant policies.',
      viewLink: '/info/governance-policies',
      viewText: 'Governance and policies page'
    }
  ];

  getActiveCard(): InfographicCard {
    return this.infographicCards.find((card) => card.id === this.activeTab) ?? this.infographicCards[0];
  }

  setActiveTab(tabId: string): void {
    this.activeTab = tabId;
  }
}
