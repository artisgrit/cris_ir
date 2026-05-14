import { NgComponentOutlet } from '@angular/common';
import {
  Component,
  Input,
  OnChanges,
} from '@angular/core';

import { GenericConstructor } from '../../../../../../../../../core/shared/generic-constructor';
import { Bitstream } from '../../../../../../../../../core/shared/bitstream.model';
import { Item } from '../../../../../../../../../core/shared/item.model';
import {
  AttachmentRenderingType,
  getAttachmentTypeRendering,
} from '../attachment-type.decorator';

@Component({
  selector: 'ds-attachment-render',
  templateUrl: './attachment-render.component.html',
  imports: [
    NgComponentOutlet,
  ],
})
export class AttachmentRenderComponent implements OnChanges {

  /**
   * The type of attachment rendering component to display
   */
  @Input() renderingType: string;

  @Input() bitstream: Bitstream;

  @Input() item: Item;

  @Input() tabName: string;

  componentRef: GenericConstructor<any>;

  componentInputs: Record<string, unknown> = {};

  ngOnChanges(): void {
    this.updateComponent();
  }

  private updateComponent(): void {
    const resolvedType = this.renderingType ?? AttachmentRenderingType.DOWNLOAD;
    const config = getAttachmentTypeRendering(resolvedType);

    this.componentRef = config?.componentRef ?? getAttachmentTypeRendering(AttachmentRenderingType.DOWNLOAD)?.componentRef;
    this.componentInputs = {
      bitstream: this.bitstream,
      item: this.item,
      tabName: this.tabName,
      renderingType: resolvedType,
    };
  }
}

