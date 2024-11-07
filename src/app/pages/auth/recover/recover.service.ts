import { Injectable } from '@angular/core';
import { Message } from '../../../core/entities/message';
import { Auth, sendPasswordResetEmail } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class RecoverService {

  constructor(
    private auth: Auth
  ) { }

  async sendRecoverEmail(recover: any) : Promise<Message> {
    try {
      await sendPasswordResetEmail(this.auth, recover.email);
      return {
        name: "Correo de recuperación enviado!",
        message: "El correo de recuperación ha sido enviado con éxito"
      }
    } catch (error) {
      throw error;
    }
  }
}
