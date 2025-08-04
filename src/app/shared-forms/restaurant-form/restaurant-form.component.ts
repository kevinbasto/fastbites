import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-restaurant-form',
  templateUrl: './restaurant-form.component.html',
  styleUrl: './restaurant-form.component.scss'
})
export class RestaurantFormComponent {

  form : FormGroup;

  constructor(
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      name: [],
      description: [],
      slogan: []
    })
  }

}
