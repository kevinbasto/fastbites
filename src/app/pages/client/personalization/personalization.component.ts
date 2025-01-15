import { Component, OnInit } from '@angular/core';
import { PersonalizationService } from './personalization.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  templateUrl: './personalization.component.html',
  styleUrl: './personalization.component.scss'
})
export class PersonalizationComponent implements OnInit{

  form: FormGroup;

  constructor(
    private personalizationServ: PersonalizationService,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      company: this.fb.group({
        name: [''],
        description: [''],
        Logo: [null]
      })
    });
  }

  ngOnInit(): void {    
  }

  get company() {
    return this.form.get('company') as FormGroup; 
  }

}
