import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'ds-inline-pdf-viewer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './inline-pdf-viewer.component.html',
  styleUrls: ['./inline-pdf-viewer.component.scss'],
})
export class InlinePdfViewerComponent {
  @Input() src: SafeResourceUrl | null = null;
  @Input() title = 'PDF preview';
}

