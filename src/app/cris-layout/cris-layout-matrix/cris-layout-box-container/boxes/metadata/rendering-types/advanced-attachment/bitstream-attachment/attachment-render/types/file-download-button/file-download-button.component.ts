import { Component, Input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

import { Bitstream } from '../../../../../../../../../../../core/shared/bitstream.model';
import { Item } from '../../../../../../../../../../../core/shared/item.model';
import { ThemedFileDownloadLinkComponent } from '../../../../../../../../../../../shared/file-download-link/themed-file-download-link.component';

@Component({
  selector: 'ds-file-download-button',
  templateUrl: './file-download-button.component.html',
  imports: [
    ThemedFileDownloadLinkComponent,
    TranslateModule,
  ],
})
export class FileDownloadButtonComponent {
  @Input() bitstream: Bitstream;
  @Input() item: Item;
  @Input() tabName: string;
}

