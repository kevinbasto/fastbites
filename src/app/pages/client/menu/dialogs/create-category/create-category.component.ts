import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  templateUrl: './create-category.component.html',
  styleUrl: './create-category.component.scss'
})
export class CreateCategoryComponent {

  constructor(
    public dialogRef: MatDialogRef<CreateCategoryComponent>
  ) {}
}
