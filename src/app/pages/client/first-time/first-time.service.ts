import { Injectable } from '@angular/core';
import { collection, doc, Firestore, getDocs, setDoc, updateDoc } from '@angular/fire/firestore';
import { Plan } from '../../../core/entities/plan';
import { SnackbarService } from '../../../core/services/snackbar/snackbar.service';
import { environment } from '../../../../environments/environment';
import { Profile } from '../../../core/entities/profile';
import { Card } from '../../../core/entities/card';
import { AuthService } from '../../../core/services/auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class FirstTimeService {

  apiUrl = environment.apiUrl;

  constructor(
    private firestore: Firestore,
    private snackbar: SnackbarService,
    private auth: AuthService,
    private http: HttpClient,
    private router: Router
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

  async postNewProfile(profile: Profile) {
    try {
      const uid = await this.auth.getUID();
      const docRef = await doc(this.firestore, `/users/${uid}/data/profile`);
      let newProf : Profile = {
        ...profile,
        paymentMethods: [],
      };
      await setDoc(docRef, newProf);
      let userDoc = doc(this.firestore, `/users/${uid}`);
      await updateDoc(userDoc, {firstTime: false});
      this.snackbar.openMessage('Información Guardada con éxito');
      let prof = JSON.parse(window.localStorage.getItem("profile")!);
      prof.firstTime = false;
      window.localStorage.setItem("profile", JSON.stringify(prof));
      this.router.navigate(['/client/menu']);
    } catch (error) {
      this.snackbar.openMessage("Hubo un error al procesar la solicitud, reintenta de nuevo mas tarde");
      throw error;
    }
  }

}
