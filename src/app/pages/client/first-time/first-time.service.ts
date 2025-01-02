import { Injectable } from '@angular/core';
import { collection, Firestore, getDocs } from '@angular/fire/firestore';
import { Plan } from '../../../core/entities/plan';
import { SnackbarService } from '../../../core/services/snackbar/snackbar.service';

@Injectable({
  providedIn: 'root'
})
export class FirstTimeService {

  constructor(
    private firestore: Firestore,
    private snackbar: SnackbarService
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

}
