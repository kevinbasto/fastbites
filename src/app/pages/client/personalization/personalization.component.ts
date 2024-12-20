import { Component, OnInit } from '@angular/core';
import { PersonalizationService } from './personalization.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  templateUrl: './personalization.component.html',
  styleUrl: './personalization.component.scss'
})
export class PersonalizationComponent implements OnInit{

  colorForm: FormGroup;
  uploadingColor: boolean = false;

  constructor(
    private personalizationServ: PersonalizationService,
    private fb: FormBuilder
  ) {
    this.colorForm = this.fb.group({
      color: ['']
    })
  }

  ngOnInit(): void {
    this.colorForm.disable()
    this.colorForm.valueChanges.subscribe(color => console.log(color));
  }

  openpicker(){
    let item = document.getElementById("picker");
    item?.click()
  }

  cancelForm(){
    this.colorForm.setValue({color: "#FFFFFF"});
  }

  saveColorForm(){
    this.uploadingColor = true;
    this.personalizationServ.saveColorForm(this.colorForm.value.color)
    .then(() => this.colorForm.disable())
    .finally(() => this.uploadingColor = false);
  }
}
