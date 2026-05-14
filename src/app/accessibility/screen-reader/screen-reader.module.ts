import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ScreenReaderComponent } from './screen-reader.component';

/**
 * Module for the screen reader accessibility feature
 */
@NgModule({
  imports: [
    CommonModule,
    ScreenReaderComponent,
  ],
  exports: [
    ScreenReaderComponent,
  ],
})
export class ScreenReaderModule { }
