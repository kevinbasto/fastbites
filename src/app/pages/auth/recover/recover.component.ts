import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RecoverService } from './recover.service';
import { Message } from '../../../core/generics/message';
import { Router } from '@angular/router';

@Component({
  templateUrl: './recover.component.html',
  styleUrl: './recover.component.scss'
})
export class RecoverComponent {

  public recoverForm : FormGroup;
  public message? : Message;
  public uploading : boolean;

  constructor(
    public recoverService : RecoverService,
    public builder : FormBuilder,
    private router : Router
  ) { 
    this.recoverForm = this.builder.group({
      email : ["", [ Validators.required, Validators.email]]
    });
    this.uploading = false;
  }

  ngOnInit(): void {
  }

  submit(){
    this.uploading = !this.uploading;
    let recover : any = {
      email: this.recoverForm.get("email")!.value
    };
    this.recoverService.sendRecoverEmail(recover)
    .then(res =>this.message = res)
    .catch(err => this.message = err)
    .finally(() => {
      setTimeout(() => {
        this.uploading = !this.uploading;
        delete this.message;
        this.router.navigate(['/auth/login']);
      }, 10_000);
    });
  }

}
