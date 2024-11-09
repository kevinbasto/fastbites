import { inject } from '@angular/core';
import { CanActivateChildFn, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

export const authGuard: CanActivateChildFn = async (childRoute, state) => {
  let authService = inject(AuthService);
  let router = inject(Router);
  let uid = await authService.getUID();
  if(!uid)
    router.navigate(['auth/login'])
  else
    return true;
  return false;
};
