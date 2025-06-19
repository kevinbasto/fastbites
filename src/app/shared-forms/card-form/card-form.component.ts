import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Card } from '../../core/entities/card';

@Component({
  selector: 'card-form',
  templateUrl: './card-form.component.html',
  styleUrl: './card-form.component.scss'
,
  standalone: false})
export class CardFormComponent implements OnInit {

  @Input() disablebuttons?: boolean = false;

  @Output() cancel: EventEmitter<void> = new EventEmitter();
  @Output() card: EventEmitter<Card> = new EventEmitter();
  @Output() cardForm: EventEmitter<FormGroup> = new EventEmitter();

  form: FormGroup;
  private formattingCard = false;

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

  ngOnInit(): void {
    this.cardForm.emit(this.form);
    this.cardInput.valueChanges.subscribe((card: string) => {
      if (!this.formattingCard) {
        this.formattingCard = true;
        const formattedCard = this.formatCardNumber(card);
        this.cardInput.setValue(formattedCard, { emitEvent: false }); // Evita bucles infinitos
        this.formattingCard = false;
      }
    });
  }

  get cardInput() {
    return this.form.get("card")!;
  }

  private formatCardNumber(card: string): string {
    // Remueve todos los caracteres que no sean números
    const digits = card.replace(/\D/g, '');

    // Formatea en bloques de 4 dígitos separados por un espacio
    const formattedCard = digits.replace(/(\d{4})(?=\d)/g, '$1 ');

    return formattedCard.trim(); // Retorna el valor formateado sin espacios extra
  }
}
