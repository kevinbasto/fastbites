import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Plan } from '../../core/entities/plan';

@Component({
  selector: 'plan-selector-form',
  templateUrl: './plan-selector-form.component.html',
  styleUrl: './plan-selector-form.component.scss'
})
export class PlanSelectorFormComponent implements OnInit{

  @Input() plans!: Array<Plan>;
  @Output() planForm : EventEmitter<FormGroup> = new EventEmitter()

  form: FormGroup;

  constructor(
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      plan: ['', [Validators.required]],
      trial: [true]
    });
  }

  ngOnInit(): void {
    this.planForm.emit(this.form);
  }

}
