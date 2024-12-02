import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Category } from '../../core/entities/category';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrl: './category-form.component.scss'
})
export class CategoryFormComponent {

  @Output() category: EventEmitter<Category> = new EventEmitter();

  form: FormGroup

  constructor( private fb : FormBuilder ) {
    this.form = this.fb.group({
      name: [""]
    });
  }
}
