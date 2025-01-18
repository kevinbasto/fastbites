import { Component, Input } from '@angular/core';
import { Plan } from '../../core/entities/plan';
import { Profile } from '../../core/entities/profile';

@Component({
  selector: 'plan-summary',
  templateUrl: './plan-summary.component.html',
  styleUrl: './plan-summary.component.scss'
})
export class PlanSummaryComponent {

  @Input() plan!: Plan;
  @Input() profile!: Profile;

}
