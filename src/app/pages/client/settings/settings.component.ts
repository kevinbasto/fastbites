import { Component, OnInit } from '@angular/core';
import { SettingsService } from './settings.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TableColumn } from '../../../core/generics/table-column';
import { paymentMethodsTableConfig, paymentMethodsTableHeaders } from './payment-methods';
import { TableConfig } from '../../../core/generics/table-config';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent implements OnInit {

  editMenu : boolean = false;
  editMenuForm : FormGroup;

  constructor(
    private settingsService: SettingsService,
    private builder: FormBuilder
  ) {
    this.editMenuForm = this.builder.group({
      name: [""],
      iva: [false]
    });
  }

  ngOnInit(): void {
    this.editMenuForm.disable();
  }

  alternateEdit() {
    this.editMenu = !this.editMenu;
    if(this.editMenu)
      this.editMenuForm.enable();
    else
      this.editMenuForm.disable()
  }

  headers : Array<TableColumn> = paymentMethodsTableHeaders;
  tableConfig: TableConfig = paymentMethodsTableConfig;
  title : string = "Listado de métodos de pago";
  data? : Array<any>;

  create() {}

  edit(item : any) {}

  deleteItem(item : any) {}


}
