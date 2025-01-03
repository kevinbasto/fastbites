import { Injectable } from '@angular/core';
import { collection, Firestore, getDocs } from '@angular/fire/firestore';
import { Plan } from '../../../core/entities/plan';
import { SnackbarService } from '../../../core/services/snackbar/snackbar.service';
import { environment } from '../../../../environments/environment';
import { Profile } from '../../../core/entities/profile';
import { Card } from '../../../core/entities/card';
import { AuthService } from '../../../core/services/auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirstTimeService {

  apiUrl = environment.apiUrl;

  constructor(
    private firestore: Firestore,
    private snackbar: SnackbarService,
    private auth: AuthService,
    private http: HttpClient
  ) { }

  async fetchPlans() {
    try {
      const plansCollection = collection(this.firestore, `/plans`);
      const plansRef = await getDocs(plansCollection);
      const {docs} = plansRef
      let plans : Array<Plan> = [];
      for(let doc of docs)
        plans.push(doc.data() as unknown as Plan)
      return plans;
    } catch (error) {
      this.snackbar.openMessage("Hubo un problema obteniendo los planes del software, reintenta mas tarde");
      throw error;
    }
  }

  async postNewProfile(profile: {profile: Profile, plan : {plan: Plan, trial: boolean}, card: Card}) {
    try {
      const uid = await this.auth.getUID();
      await lastValueFrom(this.http.post(`${this.apiUrl}/customers`, {...profile, uid}))
      .then((result) => {
        this.snackbar.openMessage("Usuario creado con exito");
      }).catch((err) => {
        this.snackbar.openMessage("Error al crear el usuario");
        throw err;
      });
    } catch (error) {
      this.snackbar.openMessage("Hubo un error al procesar la solicitud, reintenta de nuevo mas tarde");
      throw error;
    }
  }

}
