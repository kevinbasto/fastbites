import { Component, Input } from '@angular/core';
import { submenusTableConfig, submenusTableHeaders } from './submenus-table.headers';
import { Submenu } from '../../../../../core/entities/submenu';
import { environment } from '../../../../../../environments/environment';
import { PageEvent } from '@angular/material/paginator';


@Component({
  selector: 'app-submenus',
  templateUrl: './submenus.component.html',
  styleUrl: './submenus.component.scss'
})
export class SubmenusComponent {

  @Input() submenus?: Array<any> = [];
  headers = submenusTableHeaders;
  config = submenusTableConfig;
  options = environment.paginationOptions
  size = environment.defaultPageSize;
  displaySubmenus: Array<Submenu> = [];

  constructor() { }

  createSubmenu() { }

  editSubmenu(submenu: Submenu) { }

  deleteSubmenu(submenu: Submenu) { }

  viewSubmenu(submenu: Submenu) { }

  toggleSubmenu(submenu: Submenu) { }

  setPage() {
    for (let i = 0; i < this.size; i++) {
      if (i < this.submenus!.length)
        this.displaySubmenus.push(this.submenus![i])
    }
  }

  changePage(page: PageEvent) {
    const startIndex = page.pageIndex * page.pageSize;
    const endIndex = startIndex + page.pageSize;
    this.displaySubmenus = this.submenus?.slice(startIndex, endIndex) || [];
  }

}
