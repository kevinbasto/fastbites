import { Component, OnInit } from '@angular/core';
import { PersonalizationService } from './personalization.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SnackbarService } from '../../../core/services/snackbar/snackbar.service';
import { Personalization } from '../../../core/entities/personalization';

@Component({
  templateUrl: './personalization.component.html',
  styleUrl: './personalization.component.scss'
})
export class PersonalizationComponent implements OnInit{

  form: FormGroup;
  displayLogo?: string;
  displayBanner? : string;
  uploading: boolean = false;
  edit: boolean = false;

  constructor(
    private personalizationService: PersonalizationService,
    private fb: FormBuilder,
    private snackbar: SnackbarService
  ) {
    this.form = this.fb.group({
      company: this.fb.group({
        name: ['', [Validators.required]],
        description: ['', [Validators.required]],
        logo: [null, []],
      }),
      personalization: this.fb.group({
        background: [null],
        buttonColor: [''],
        actionsFontColor: [''],
        titleColor: [''],
        banner: [null, []]
      })
    });
  }

  ngOnInit(): void {    
    this.personalizationService.loadPersonalization()
    .then((personalization : Personalization) => {
      personalization.personalization.titleColor = personalization.personalization.titleColor? personalization.personalization.titleColor : ''
      personalization.personalization.banner = personalization.personalization.banner? personalization.personalization.banner : '';
      this.form.setValue(personalization);
      this.displayBanner = (personalization.personalization.background as string);
      this.displayLogo = (personalization.company.logo as string);
    }).catch((err) => {
      console.log(err)
      this.snackbar.openMessage('Hubo un error al cargar tu información guardada');
    });
    this.form.disable();
  }

  setLogo(file: File) {
    this.company.get('logo')?.setValue(file);
    const reader = new FileReader();
    reader.onload = () => {
      this.displayLogo = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  setBanner(file: File) {
    this.personalization.get('banner')?.setValue(file);
    const reader = new FileReader();
    reader.onload = () => {
      this.displayBanner = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  get company() {
    return this.form.get('company') as FormGroup; 
  }

  get personalization() {
    return this.form.get('personalization') as FormGroup;
  }

  alternateform() {
    this.edit = !this.edit;
    if(this.edit)
      this.form.enable()
    else
      this.form.disable()
  }

  submitForm() {
    this.uploading = true;
    this.personalizationService.savePersonalization(this.form.value)
    .then((result) => {
      this.snackbar.openMessage('personalizaciones guardadas con éxito');
    })
    .catch((err) => {
      this.snackbar.openMessage('Hubo un error al guardar tus personalizaciones, reintenta mas tarde');
    })
    .finally(() => {
      this.edit = false;
      this.uploading = false;
      this.form.disable()
    });
  }
}
