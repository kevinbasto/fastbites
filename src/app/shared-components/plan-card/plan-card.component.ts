import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Plan } from '../../core/entities/plan';

@Component({
  selector: 'plan-card',
  templateUrl: './plan-card.component.html',
  styleUrl: './plan-card.component.scss'
})
export class PlanCardComponent {

  @Input() plan!: Plan;
  @Output() selected : EventEmitter<Plan> = new EventEmitter();

}
