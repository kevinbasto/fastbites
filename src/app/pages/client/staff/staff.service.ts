import { Injectable } from '@angular/core';
import { doc, docData, Firestore, setDoc } from '@angular/fire/firestore';
import { AuthService } from '../../../core/services/auth/auth.service';
import { SnackbarService } from '../../../core/services/snackbar/snackbar.service';
import { Observable, Observer } from 'rxjs';
import { Staff } from '../../../core/entities/staff';


@Injectable({
  providedIn: 'root'
})
export class StaffService {

  constructor(
    private auth: AuthService,
    private firestore: Firestore,
    private snackbar: SnackbarService
  ) { }

  fetchStaff() {
    return new Observable<Staff>((obs: Observer<Staff>) => {
      this.auth.getUID()
      .then((uid : string) => {
        const docRef = doc(this.firestore, `/users/${uid}/data/staff`);
        (docData(docRef) as Observable<Staff>).subscribe((staff: Staff) => {
          if(!staff){
            let newStaff: Staff = {
              employees: [],
              groups: []
            };
            setDoc(docRef, newStaff);
          }else{
            obs.next(staff);
          }
        });
      }).catch((err) => {
        obs.error(err)
      });
    });
  }
}
