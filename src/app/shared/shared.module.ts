import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimenNgModule } from '../modules/primen-ng/primen-ng.module';
import { EmptyLabelPipe } from './pipes/empty-label.pipe';



@NgModule({
  declarations: [
    EmptyLabelPipe
  ],
  imports: [
    CommonModule,
    PrimenNgModule
  ],
  exports: [
    EmptyLabelPipe,
  ]
})
export class SharedModule { }
