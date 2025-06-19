import { Component, OnInit } from '@angular/core';
import { SettingsService } from './settings.service';
import { TableColumn } from '../../../core/generics/table-column';
import { paymentMethodsTableConfig, paymentMethodsTableHeaders } from './payment-methods-table.headers';
import { TableConfig } from '../../../core/generics/table-config';
import { Profile } from '../../../core/entities/profile';
import { SnackbarService } from '../../../core/services/snackbar/snackbar.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
,
  standalone: false})
export class SettingsComponent implements OnInit {

  editPersonal : boolean = false;
  profile?: Profile;
  uploadPersonal: boolean = false;
  editFiscal : boolean = false;
  
  constructor(
    private settingsService: SettingsService,
    private snackbar: SnackbarService
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
    this.settingsService.postProfile(profile)
    .then(() => {
      this.snackbar.openMessage('Perfil actualizado con éxito');
      this.editPersonal = false;
    }).catch(() => {
      this.snackbar.openMessage('No se pudo actualizar el perfil');
    })
    .finally(() => this.uploadPersonal = !this.uploadPersonal);
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
  cards? : Array<any>;

  createCard() {
    this.settingsService.createCard()
  }

  edit(item : any) {}

  deleteItem(item : any) {}


}
