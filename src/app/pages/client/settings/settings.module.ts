import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { MatCardModule } from '@angular/material/card';
import { SettingsComponent } from './settings.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialogModule } from '@angular/material/dialog';
import { SharedComponentsModule } from '../../../shared-components/shared-components.module';
import { SharedFormsModule } from '../../../shared-forms/shared-forms.module';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggle, MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CreateCardComponent } from './dialogs/create-card/create-card.component';


@NgModule({
  declarations: [
    SettingsComponent,
    CreateCardComponent
  ],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    MatCardModule,
    MatDividerModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSlideToggle,
    MatSlideToggleModule,
    SharedComponentsModule,
    SharedFormsModule,
  ]
})
export class SettingsModule { }
