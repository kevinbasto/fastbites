import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropzoneDirective } from './dropzone/dropzone.directive';



@NgModule({
  declarations: [
    DropzoneDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    DropzoneDirective
  ]
})
export class DirectivesModule { }
