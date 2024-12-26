import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Category } from '../../../../../core/entities/category';

@Component({
  selector: 'app-view-category',
  templateUrl: './view-category.component.html',
  styleUrl: './view-category.component.scss'
})
export class ViewCategoryComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { category: Category },
    public dialogRef: MatDialogRef<ViewCategoryComponent>
  ) {}

}
