import { Component, OnInit } from '@angular/core';
import { EditSubmenuService } from './edit-submenu.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SnackbarService } from '../../../../../core/services/snackbar/snackbar.service';
import { Menu } from '../../../../../core/entities/menu';
import { Submenu } from '../../../../../core/entities/submenu';
import { Category } from '../../../../../core/entities/category';

@Component({
  selector: 'app-edit-submenu',
  templateUrl: './edit-submenu.component.html',
  styleUrl: './edit-submenu.component.scss'
,
  standalone: false})
export class EditSubmenuComponent implements OnInit {

  id!: string;
  submenu!: Submenu;
  categories!: Array<Category>;
  uploading: boolean = false;

  constructor(
    private editSubmenuServ: EditSubmenuService,
    private route: ActivatedRoute,
    private router: Router,
    private snackbar: SnackbarService
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = params.get("id")!;
      this.editSubmenuServ.fetchMenu()
      .then((menu: Menu) => {
        this.submenu = menu.submenus.filter(sub => sub.id == this.id)[0];
        this.categories = menu.categories;
      }).catch((err) => {
        
      });
    })
  }

  cancelForm() {
    this.router.navigate(['/client/menu']);
  }

  editSubmenu(submenu: Submenu) {
    let sub = {...this.submenu, ...submenu};
    this.uploading = true;
    this.editSubmenuServ.editSubmenu(sub)
    .then((result) => {
      this.snackbar.openMessage('Submenu editado con éxito');
      this.router.navigate(['/client/menu']);
    }).catch((err) => {
      this.snackbar.openMessage('No se pudo editar el submenu');
    })
    .finally(() => this.uploading = false);
  }

}
