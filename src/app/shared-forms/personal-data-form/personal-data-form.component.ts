import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Profile } from '../../core/entities/profile';

@Component({
  selector: 'personal-data-form',
  templateUrl: './personal-data-form.component.html',
  styleUrl: './personal-data-form.component.scss'
,
  standalone: false})
export class PersonalDataFormComponent implements OnChanges, OnInit {

  @Input() enable: boolean = false;
  @Input() profile?: Profile;
  @Input() uploading?: boolean;
  @Input() disableCancel? : boolean;
  @Output() cancelForm : EventEmitter<void> = new EventEmitter();
  @Output() personalData: EventEmitter<Profile> = new EventEmitter();
  @Output() personalDataForm : EventEmitter<FormGroup> = new EventEmitter();

  form: FormGroup;
  private formattingPhone = false; 

  constructor(
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      name: ["", [Validators.required]],
      email: ["", [Validators.required, Validators.email]],
      phone: ["", []],
      address: ['']
    })
    this.form.get("email")?.disable();
  }

  ngOnInit(): void {
    this.personalDataForm.emit(this.form);
    this.phone.valueChanges.subscribe((phone: string) => {
      if (!this.formattingPhone) {
        this.formattingPhone = true;
        const formattedPhone = this.formatPhone(phone);
        this.phone.setValue(formattedPhone, { emitEvent: false }); // Evita disparar valueChanges de nuevo
        this.formattingPhone = false;
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['enable']){
      if(this.enable) this.form.enable() 
      else this.form.disable()
      this.email.disable();
    }

    if(changes['profile'] && this.profile){
      let { name, email, phone, address } = this.profile;
      if(name) this.name.setValue(name)
      if(email) this.email.setValue(email)
      if(phone) this.phone.setValue(phone)
      if(address) this.address.setValue(address)
    }
  }

  submitForm() {
    let data = this.form.getRawValue();
    this.personalData.emit(data);
  }

  get name() {
    return this.form.get("name")!;
  }

  get email() {
    return this.form.get("email")!;
  }

  get phone() {
    return this.form.get("phone")!;
  }

  get address() {
    return this.form.get("address")!;
  }

  private formatPhone(phone: string): string {
    // Lógica de formateo (ejemplo: formato internacional +1 (123) 456-7890)
    const digits = phone.replace(/\D/g, ''); // Remover caracteres no numéricos
    if (digits.length <= 3) return digits;
    if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
  }

}
