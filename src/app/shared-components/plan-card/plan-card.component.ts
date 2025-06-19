import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Plan } from '../../core/entities/plan';

@Component({
  selector: 'plan-card',
  templateUrl: './plan-card.component.html',
  styleUrl: './plan-card.component.scss'
,
  standalone: false})
export class PlanCardComponent {

  @Input() plan!: Plan;
  @Input() selectedPlan: boolean = false;
  @Output() selected : EventEmitter<Plan> = new EventEmitter();

}
