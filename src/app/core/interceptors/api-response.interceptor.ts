import { HttpErrorResponse, HttpEvent, HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { StorageService } from '../services/storage.service';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, throwError } from 'rxjs';
import { ApiResponse } from '../models/api-response.model';
import { SweetalertService } from '../services/sweetalert.service';

export const apiResponseInterceptor: HttpInterceptorFn = (req, next) => {

  const storageService = inject(StorageService);
  const sweetAlertService = inject(SweetalertService);
  const router = inject(Router);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.error.code === 401) {
        sweetAlertService.toastAlert(error.error.message, 'info', "bottom");
        storageService.removeSessionItem('token');
        router.navigate(['authentication']);
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