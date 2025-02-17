import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { StorageService } from '../services/storage.service';
import { IToken } from '../interfaces/token.interface';
import { ConfirmDialogService } from '../../shared/service/confirm-dialog.service';

export const roleGuard: CanActivateFn = (route, state) => {
  const storage = inject(StorageService);
  const router = inject(Router);
  const confirmDialogService = inject(ConfirmDialogService);
  const token: IToken = storage.getSessionItem('token');

  // Obtén los roles permitidos de los datos de la ruta
  const allowedRoles = route.data?.['roles'] as Array<string>;

  // Verifica si el rol del token está permitido
  if (!allowedRoles || !allowedRoles.includes(token.role)) {
    confirmDialogService.showConfirmDialog(
      'Access denied',
      'You do not have the necessary permissions to perform this action',
      () => router.navigate(['/dashboard']),
      () => {},
      false // No mostrar el botón de cancelar
    );
    return false;
  }

  return true;
};
