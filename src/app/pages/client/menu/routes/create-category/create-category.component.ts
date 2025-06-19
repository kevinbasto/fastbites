import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CreateCategoryService } from './create-category.service';
import { Category } from '../../../../../core/entities/category';
import { SnackbarService } from '../../../../../core/services/snackbar/snackbar.service';

@Component({
  templateUrl: './create-category.component.html',
  styleUrl: './create-category.component.scss'
,
  standalone: false})
export class CreateCategoryComponent {

  uploading: boolean = false;

  constructor(
    private router: Router,
    private createCategoryServ: CreateCategoryService,
    private snackbar: SnackbarService
  ) {}

  cancel() {
    this.router.navigate(['/client/menu']);
  }

  submitCategory(category: Category) {
    this.uploading = true;
    this.createCategoryServ.createNewCategory(category)
    .then((result) => {
      this.snackbar.openMessage('La categoría ha sido creada con éxito');
      this.router.navigate(['/client/menu']);
    }).catch((err) => {
      this.snackbar.openMessage('Hubo un problema al crear la categoría');
    })
    .finally(() => this.uploading = false);
  }
}
