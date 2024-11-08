import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'form-actions',
  templateUrl: './form-actions.component.html',
  styleUrl: './form-actions.component.scss'
})
export class FormActionsComponent {

  @Input() disabled?: boolean;
  @Input() uploading? : boolean;

  @Output() cancel : EventEmitter<null> = new EventEmitter();
}
