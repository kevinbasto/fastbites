import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Category } from '../../../../../core/entities/category';

@Component({
  templateUrl: './edit-category.component.html',
  styleUrl: './edit-category.component.scss'
})
export class EditCategoryComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { category: Category },
    public dialogRef: MatDialogRef<EditCategoryComponent>
  ) {}

}
