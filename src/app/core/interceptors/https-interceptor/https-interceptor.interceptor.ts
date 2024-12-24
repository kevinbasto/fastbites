import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { from, Observable, switchMap } from 'rxjs';

export const httpsInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);

  // Usamos el Observable para obtener el token asincrónicamente
  return from(authService.getToken()).pipe(
    switchMap((token) => {
      // Clonamos la solicitud original y agregamos el token en el encabezado Authorization
      const clonedRequest = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Pasamos la solicitud modificada a la siguiente cadena de interceptores
      return next(clonedRequest);
    })
  );
};