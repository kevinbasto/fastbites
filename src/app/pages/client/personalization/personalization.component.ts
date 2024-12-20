import { Component, OnInit } from '@angular/core';
import { PersonalizationService } from './personalization.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  templateUrl: './personalization.component.html',
  styleUrl: './personalization.component.scss'
})
export class PersonalizationComponent implements OnInit{

  form: FormGroup;
  uploadingColor: boolean = false;
  file?: File;

  constructor(
    private personalizationServ: PersonalizationService,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      color: [''],
      profile: [],
    })
  }

  ngOnInit(): void {
    this.form.disable();
  }

  openpicker(){
    let item = document.getElementById("picker");
    item?.click()
  }

  cancelForm(){
    this.form.setValue({color: "#FFFFFF"});
  }

  saveForm(){
    this.uploadingColor = true;
    this.personalizationServ.saveColorForm(this.form.value.color)
    .then(() => this.form.disable())
    .finally(() => this.uploadingColor = false);
  }

  setImage(file: File){
    this.file = file;
    this.form.get("image")?.setValue(file);
  }
}
