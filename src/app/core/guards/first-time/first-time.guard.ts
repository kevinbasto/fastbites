import { CanActivateChildFn } from '@angular/router';

export const firstTimeGuard: CanActivateChildFn = (childRoute, state) => {
  return true;
};
