import { Component } from '@angular/core';
import { EditProductService } from './edit-product.service';

@Component({
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.scss'
})
export class EditProductComponent {
  
  constructor(
    editProductServ: EditProductService
  ) {}
  
}
