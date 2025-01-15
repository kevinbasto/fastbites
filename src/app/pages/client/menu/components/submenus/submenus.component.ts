import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { submenusTableConfig, submenusTableHeaders } from './submenus-table.headers';
import { Submenu } from '../../../../../core/entities/submenu';
import { environment } from '../../../../../../environments/environment';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { SubmenusService } from './submenus.service';
import { Menu } from '../../../../../core/entities/menu';

@Component({
  selector: 'app-submenus',
  templateUrl: './submenus.component.html',
  styleUrl: './submenus.component.scss'
})
export class SubmenusComponent implements OnInit, OnChanges {

  form: FormGroup;

  @Input() submenus?: Array<Submenu> = [];
  @Input() menu!: Menu;
  headers = submenusTableHeaders;
  config = submenusTableConfig;
  options = environment.paginationOptions;
  size = environment.defaultPageSize;
  displaySubmenus: Array<Submenu> = [];
  filteredSubmenus?: Array<Submenu>;

  constructor(
    private router: Router,
    private submenuService: SubmenusService,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      name: [""]
    });
  }

  ngOnInit(): void {
    this.form.valueChanges.subscribe((value) => {
      console.log(value);
      this.filteredSubmenus = this.submenus?.filter((submenu) => {
        const matchesName = value.name === "" || submenu.name.toLowerCase().includes(value.name.toLowerCase());
        return matchesName;
      });
      console.log(this.filteredSubmenus);
      this.setPage();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['submenus'] && this.submenus) {
      this.setPage();
    }
  }

  createSubmenu() {
    this.router.navigate(['/client/menu/submenu/create']);
  }

  editSubmenu(submenu: Submenu) {
    console.log(submenu);
    this.router.navigate([`/client/menu/submenu/${submenu.id}`]);
  }

  deleteSubmenu(submenu: Submenu) {
    this.submenuService.deleteSubmenu(submenu);
  }

  viewSubmenu(submenu: Submenu) {
    this.submenuService.viewSubmenu(submenu, this.menu!);
  }

  toggleSubmenu(submenu: Submenu) {
    this.submenuService.toggleSubmenu(submenu);
  }

  setPage() {
    this.displaySubmenus = [];
    const submenusToDisplay = this.filteredSubmenus || this.submenus || [];
    for (let i = 0; i < this.size; i++) {
      if (i < submenusToDisplay.length)
        this.displaySubmenus.push(submenusToDisplay[i]);
    }
  }

  changePage(page: PageEvent) {
    const startIndex = page.pageIndex * page.pageSize;
    const endIndex = startIndex + page.pageSize;
    this.displaySubmenus = this.filteredSubmenus?.slice(startIndex, endIndex) || [];
  }
}