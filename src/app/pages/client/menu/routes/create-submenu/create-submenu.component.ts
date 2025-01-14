import { Component, OnInit } from '@angular/core';
import { CreateSubmenuService } from './create-submenu.service';
import { Category } from '../../../../../core/entities/category';
import { Router } from '@angular/router';
import { Submenu } from '../../../../../core/entities/submenu';
import { Menu } from '../../../../../core/entities/menu';
import { SnackbarService } from '../../../../../core/services/snackbar/snackbar.service';

@Component({
  selector: 'app-create-submenu',
  templateUrl: './create-submenu.component.html',
  styleUrl: './create-submenu.component.scss'
})
export class CreateSubmenuComponent implements OnInit {

  categories?: Array<Category>;
  uploading: boolean = false;

  constructor(
    private submenuServ: CreateSubmenuService,
    private router: Router,
    private snackbar: SnackbarService,
  ) {}

  ngOnInit(): void {
    this.submenuServ.fetchMenu()
    .then((menu: Menu) => {
      const { categories } = menu;
      this.categories = categories;
    }).catch((err) => {
      
    });
  }

  cancelSubmenu() {
    this.router.navigate(['/client/menu']);
  }

  submitSubmenu(submenu: Submenu) {
    this.uploading = true;
    this.submenuServ.createSubmenu(submenu)
    .then((result) => {
      this.snackbar.openMessage('Submenu creado con éxito');
      this.router.navigate(['/client/menu']);
    }).catch((err) => {
      this.snackbar.openMessage('Hubo un error al crear el nuevo submenu');
    })
    .finally(() => this.uploading = false);
  }
}
