import { Component, Input } from '@angular/core';
import { submenusTableConfig, submenusTableHeaders } from './submenus-table.headers';


@Component({
  selector: 'app-submenus',
  templateUrl: './submenus.component.html',
  styleUrl: './submenus.component.scss'
})
export class SubmenusComponent {

  @Input() submenus? : Array<any> = [];
  headers = submenusTableHeaders;
  config = submenusTableConfig;

  constructor() {}

  createSubmenu() {}

  editSubmenu(submenu: any) {}

  deleteSubmenu(submenu: any) {}

  viewSubmenu(submenu: any) {}
}
