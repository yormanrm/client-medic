import { HttpErrorResponse, HttpEvent, HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { StorageService } from '../services/storage.service';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, throwError } from 'rxjs';
import { ApiResponse } from '../models/api-response.model';
import { ConfirmDialogService } from '../../shared/service/confirm-dialog.service';

export const apiResponseInterceptor: HttpInterceptorFn = (req, next) => {

  const storageService = inject(StorageService);
  const router = inject(Router);
  const confirmDialogService = inject(ConfirmDialogService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      console.log(error);
      if (error.error.code === 401) {
        confirmDialogService.showConfirmDialog(
          'Unauthorized',
          error.error.message,
          () => {
            storageService.removeSessionItem('token');
            router.navigate(['authentication']);
          },
          () => {},
          false // No mostrar el botón de cancelar
        );
      }
      return throwError(() => 
        new ApiResponse(error.error.code, error.error.error, error.error.message, error.error.data)
      );
    }),
    map((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        return event.clone({
          body: new ApiResponse(event.body.code, event.body.error, event.body.message, event.body.data)
        });
      }
      return event;
    })
  );
};