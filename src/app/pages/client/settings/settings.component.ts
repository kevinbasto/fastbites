import { Component, OnInit } from '@angular/core';
import { SettingsService } from './settings.service';
import { TableColumn } from '../../../core/generics/table-column';
import { paymentMethodsTableConfig, paymentMethodsTableHeaders } from './payment-methods';
import { TableConfig } from '../../../core/generics/table-config';
import { Profile } from '../../../core/entities/profile';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent implements OnInit {

  editPersonal : boolean = false;
  profile?: Profile;
  uploadPersonal: boolean = false;
  editFiscal : boolean = false;
  
  constructor(
    private settingsService: SettingsService,
  ) {}

  ngOnInit(): void {
    this.fetchProfileData();
  }

  fetchProfileData() {
    this.settingsService.fetchProfile()
    .then((profile: Profile) => {
      this.profile = profile;
    });
  }

  postProfileData(profile: Profile) {
    this.uploadPersonal = !this.uploadPersonal;
    // this.settingsService.postProfile(profile)
    // .then((result) => {
    //   this.editPersonal = false;
    // })
    // .catch((err) => {
      
    // })
    // .finally(() => this.uploadPersonal = !this.uploadPersonal);
  }

  headers : Array<TableColumn> = paymentMethodsTableHeaders;
  tableConfig: TableConfig = paymentMethodsTableConfig;
  title : string = "Listado de métodos de pago";
  data? : Array<any>;

  createCard() {
    this.settingsService.createCard()
  }

  edit(item : any) {}

  deleteItem(item : any) {}


}
