import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Category } from '../../core/entities/category';

@Component({
  selector: 'category-form',
  templateUrl: './category-form.component.html',
  styleUrl: './category-form.component.scss'
})
export class CategoryFormComponent implements OnChanges {

  @Input() categoryData?: Category; 
  @Input() uploading: boolean = false;

  @Output() cancel : EventEmitter<null> = new EventEmitter();
  @Output() category: EventEmitter<Partial<Category>> = new EventEmitter();

  form: FormGroup

  constructor( private fb : FormBuilder ) {
    this.form = this.fb.group({
      name: ["", [Validators.required]],
      description: ['', [Validators.required]],
      available: [false]
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes["categoryData"] && this.categoryData)
      this.form.setValue({name: this.categoryData.name, description: this.categoryData.description, available: this.categoryData.available});
    
  }

  submitCat() {
    let category: Category = {...this.categoryData, ...this.form.value};
    this.category.emit(category);
  }
}
