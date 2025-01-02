import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductFormComponent } from './product-form/product-form.component';
import { FormActionsComponent } from './form-actions/form-actions.component';
import { ReactiveFormsModule } from '@angular/forms';

import { CurrencyMaskModule } from "ng2-currency-mask";

import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { SharedComponentsModule } from '../shared-components/shared-components.module';
import { CategoryFormComponent } from './category-form/category-form.component';
import { MatSelectModule } from '@angular/material/select';
import { PersonalDataFormComponent } from './personal-data-form/personal-data-form.component';
import { FiscalDataFormComponent } from './fiscal-data-form/fiscal-data-form.component';
import { CardFormComponent } from './card-form/card-form.component';
import { PlanSelectorFormComponent } from './plan-selector-form/plan-selector-form.component';




@NgModule({
  declarations: [
    FormActionsComponent,
    ProductFormComponent,
    CategoryFormComponent,
    PersonalDataFormComponent,
    FiscalDataFormComponent,
    CardFormComponent,
    PlanSelectorFormComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedComponentsModule,
    
    CurrencyMaskModule,

    MatInputModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatAutocompleteModule,
    MatSelectModule
  ],
  exports: [
    ProductFormComponent,
    CategoryFormComponent,
    PersonalDataFormComponent,
    FiscalDataFormComponent,
    CardFormComponent,
    PlanSelectorFormComponent,
  ]
})
export class SharedFormsModule { }
