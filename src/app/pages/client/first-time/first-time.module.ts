import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FirstTimeRoutingModule } from './first-time-routing.module';
import { FirstTimeComponent } from './first-time.component';
import { MatStepperModule } from '@angular/material/stepper';
import { SharedComponentsModule } from '../../../shared-components/shared-components.module';
import { SharedFormsModule } from '../../../shared-forms/shared-forms.module';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@NgModule({
  declarations: [
    FirstTimeComponent
  ],
  imports: [
    CommonModule,
    FirstTimeRoutingModule,
    MatStepperModule,
    SharedComponentsModule,
    SharedFormsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatSlideToggle,
    MatProgressSpinnerModule
  ]
})
export class FirstTimeModule { }
