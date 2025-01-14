import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Submenu } from '../../core/entities/submenu';
import { NgxMaterialTimepickerTheme } from 'ngx-material-timepicker';
import { pickerTheme, weekDays } from './picker-theme';
import { Category } from '../../core/entities/category';
import { MatCheckboxChange } from '@angular/material/checkbox';

@Component({
  selector: 'submenu-form',
  templateUrl: './submenu-form.component.html',
  styleUrl: './submenu-form.component.scss'
})
export class SubmenuFormComponent implements OnChanges {

  @Output() submenuForm: EventEmitter<Submenu> = new EventEmitter();
  @Output() cancelForm: EventEmitter<void> = new EventEmitter();

  @Input() uploading?: boolean = false;
  @Input()  submenu!: Submenu;
  @Input() categories!: Array<Category>;

  form : FormGroup;

  pickerTheme: NgxMaterialTimepickerTheme = pickerTheme;
  weekDays = weekDays;

  constructor(
    private fb: FormBuilder,
  ) {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      description: [''],
      categories: [[], Validators.minLength(1)],
      available: [false],
      time: this.fb.group({
        openingHour: [''],
        closingHour: [''],
        days: this.fb.group({
          monday: [false],
          tuesday: [false],
          wednesday: [false],
          thursday: [false],
          friday: [false],
          saturday: [false],
          sunday: [false]
        }),
      }),
    });
    
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['submenu'] && this.submenu){
      let {  id, ...submenu } = this.submenu;
      this.form.setValue(submenu);
    }
  }

  modifyCategories(id: string, addRemove: MatCheckboxChange) {
    const categories = this.form.get('categories')?.value as string[];
    if (addRemove.checked) {
      if (!categories.includes(id))
        categories.push(id);
    } else {
      const index = categories.indexOf(id);
      if (index > -1)
        categories.splice(index, 1);
    }
    this.form.get('categories')?.setValue(categories);
  }

  cancel() {
    this.cancelForm.emit();
  }

  submitSubmenu() {
    this.submenuForm.emit(this.form.value);
  }

  get Name() {
    return this.form.get('time') as FormControl;
  }

  get Categories() {
    return this.form.get('categories') as FormGroup;
  }

  get Time() {
    return this.form.get('time') as FormGroup;
  }

  get Days() {
    return this.Time.get("days") as FormGroup;
  }
}
