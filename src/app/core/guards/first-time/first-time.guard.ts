import { inject } from '@angular/core';
import { doc, Firestore } from '@angular/fire/firestore';
import { ActivatedRoute, CanActivateChildFn, Navigation, NavigationEnd, Router } from '@angular/router';
import { filter, from, Observable } from 'rxjs';
import { AuthService } from '../../services/auth/auth.service';
import { SnackbarService } from '../../services/snackbar/snackbar.service';
import { User } from '../../entities/user';


export const firstTimeGuard: CanActivateChildFn = (childRoute, state) => {
  const router = inject(Router)
  const route = inject(ActivatedRoute)
  const snackbarService = inject(SnackbarService)
  return new Observable<boolean>(obs => {
    router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((event) => {
      if(!(event instanceof NavigationEnd)) return;
      const {url} = event;
      let {firstTime} = JSON.parse(window.localStorage.getItem("profile")!) as unknown as User;
      if(url.includes('first-time') && firstTime)
        obs.next(true)
      

      if(!firstTime)
        obs.next(true);
      else
        router.navigate(['/client/first-time'])
    });
    obs.next(true)
  })
};
