import { Component, Inject, OnInit } from '@angular/core';
import { Category } from '../../../../../core/entities/category';
import { ActivatedRoute, Router } from '@angular/router';
import { EditCategoryService } from './edit-category.service';
import { Menu } from '../../../../../core/entities/menu';
import { SnackbarService } from '../../../../../core/services/snackbar/snackbar.service';

@Component({
  templateUrl: './edit-category.component.html',
  styleUrl: './edit-category.component.scss'
})
export class EditCategoryComponent implements OnInit {

  id!: string;
  category?: Category;
  uploading: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private editCategoryService: EditCategoryService,
    private snackbar: SnackbarService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id')!;
      this.editCategoryService.fetchMenu()
      .then((menu: Menu) => {
        this.category = menu.categories.filter(cat => cat.id == this.id)[0];
      }).catch((err) => {
        this.router.navigate(['/client/menu']);
      })
    })
  }

  cancel() {
    this.router.navigate(['/client/menu']);
  }

  submitCategory(category: Category) {
    this.uploading = true;
    this.editCategoryService.editCategory(category)
    .then((result) => {
      this.snackbar.openMessage('Categoría actualizada con éxito');
      this.router.navigate(['/client/menu']);
    }).catch((err) => {
      this.snackbar.openMessage('No se pudo actualizar la categoría');
    })
    .finally(() => this.uploading = false);
  }
}
