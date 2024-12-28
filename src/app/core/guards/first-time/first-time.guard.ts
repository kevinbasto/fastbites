import { inject } from '@angular/core';
import { doc, Firestore } from '@angular/fire/firestore';
import { CanActivateChildFn, NavigationEnd, Router } from '@angular/router';
import { filter, from, Observable } from 'rxjs';
import { AuthService } from '../../services/auth/auth.service';
import { SnackbarService } from '../../services/snackbar/snackbar.service';

export const firstTimeGuard: CanActivateChildFn = (childRoute, state) => {
  const router = inject(Router);
  const snackbarService = inject(SnackbarService)
  const firestore = inject(Firestore);
  const authService = inject(AuthService)
  return from(new Promise<boolean>(async (resolve, reject) => {
    try {
      let uid = await authService.getUID();
      let document = JSON.parse(window.localStorage.getItem("user")?? "{}");
      if(!document){
        let docRef = doc(firestore, `/users/${uid}`);  
      }

      

      resolve(true);
    } catch (error) {
      snackbarService.openMessage("Ocurrió un error procesando tu solicitud");
      resolve(true);
    }
  }));
};
