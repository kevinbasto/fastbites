import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PersonalizationRoutingModule } from './personalization-routing.module';
import { SharedComponentsModule } from '../../../shared-components/shared-components.module';
import { SharedFormsModule } from '../../../shared-forms/shared-forms.module';
import { MatCardModule } from '@angular/material/card';
import { PersonalizationComponent } from './personalization.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    PersonalizationComponent
  ],
  imports: [
    CommonModule,
    PersonalizationRoutingModule,
    SharedComponentsModule,
    SharedFormsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule
  ]
})
export class PersonalizationModule { }
