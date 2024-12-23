import { Component, OnInit } from '@angular/core';
import { SettingsService } from './settings.service';
import { TableColumn } from '../../../core/generics/table-column';
import { paymentMethodsTableConfig, paymentMethodsTableHeaders } from './payment-methods';
import { TableConfig } from '../../../core/generics/table-config';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent implements OnInit {

  
  constructor(
    private settingsService: SettingsService,
  ) {
    
  }

  ngOnInit(): void {
    
  }

  headers : Array<TableColumn> = paymentMethodsTableHeaders;
  tableConfig: TableConfig = paymentMethodsTableConfig;
  title : string = "Listado de métodos de pago";
  data? : Array<any>;

  create() {}

  edit(item : any) {}

  deleteItem(item : any) {}


}
