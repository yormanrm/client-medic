import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { StorageService } from '../services/storage.service';
import { IToken } from '../interfaces/token.interface';
import { SweetalertService } from '../services/sweetalert.service';

export const authenticationGuard: CanActivateFn = (route, state) => {
  const storage = inject(StorageService);
  const router = inject(Router);
  const token: IToken = storage.getSessionItem("token");

  // Si no hay token, redirige a la página de autenticación
  if (!token) {
    if (state.url === '/authentication') {
      // Permitir acceso si ya estamos en /authentication
      return true;
    }
    return router.createUrlTree(['/authentication']);
  }

  // Si hay token y el usuario intenta acceder a /authentication, redirige al dashboard
  if (token && state.url === '/authentication') {
    return router.createUrlTree(['/']);
  }

  // Si pasa todas las condiciones, permite el acceso
  return true;
};