import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { LoginFormComponent } from './login-form/login-form.component';
import { RegisterFormComponent } from './register-form/register-form.component';
import { RecoverFormComponent } from './recover-form/recover-form.component';
import { FormActionsComponent } from './form-actions/form-actions.component';

export const forms = [
  LoginFormComponent,
  RegisterFormComponent,
  RecoverFormComponent
];

@NgModule({
  declarations: [
    ...forms,
    FormActionsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,

    // material imports
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
  ],
  exports: [
    ...forms
  ]
})
export class FormsModule { }
