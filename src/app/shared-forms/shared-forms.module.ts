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
import { SubmenuFormComponent } from './submenu-form/submenu-form.component';
import { NgxMaterialTimepickerModule } from "ngx-material-timepicker";
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { TableFormComponent } from './table-form/table-form.component';
import { ExportFormComponent } from './export-form/export-form.component';



@NgModule({
  declarations: [
    FormActionsComponent,
    ProductFormComponent,
    CategoryFormComponent,
    SubmenuFormComponent,
    PersonalDataFormComponent,
    FiscalDataFormComponent,
    CardFormComponent,
    PlanSelectorFormComponent,
    TableFormComponent,
    ExportFormComponent
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
    MatSelectModule,
    MatCheckboxModule,
    NgxMaterialTimepickerModule,
    MatExpansionModule
  ],
  exports: [
    ProductFormComponent,
    CategoryFormComponent,
    SubmenuFormComponent,
    PersonalDataFormComponent,
    FiscalDataFormComponent,
    CardFormComponent,
    PlanSelectorFormComponent,
    TableFormComponent,
    ExportFormComponent,
  ]
})
export class SharedFormsModule { }
