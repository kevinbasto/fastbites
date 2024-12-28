import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Card } from '../../core/entities/card';

@Component({
  selector: 'card-form',
  templateUrl: './card-form.component.html',
  styleUrl: './card-form.component.scss'
})
export class CardFormComponent {

  @Input() disablebuttons?: boolean = false;

  @Output() cancel: EventEmitter<void> = new EventEmitter();
  @Output() card: EventEmitter<Card> = new EventEmitter();

  @Input() form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      name: [''],
      card: [''],
      creditOrDebit: [''],
      expMonth: [''],
      expYear: [''],
      cvc: ['']
    });
  }
}
