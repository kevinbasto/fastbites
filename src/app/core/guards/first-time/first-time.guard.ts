import { inject } from '@angular/core';
import { ActivatedRoute, CanActivateChildFn, NavigationEnd, Router } from '@angular/router';
import { filter, Observable } from 'rxjs';
import { User } from '../../entities/user';


export const firstTimeGuard: CanActivateChildFn = (childRoute, state) => {
  const router = inject(Router);
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
