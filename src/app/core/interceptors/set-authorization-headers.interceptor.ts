import { HttpInterceptorFn } from '@angular/common/http';
import { StorageService } from '../services/storage.service';
import { inject } from '@angular/core';
import { environment } from '../../../environments/environment';

export const setAuthorizationHeadersInterceptor: HttpInterceptorFn = (req, next) => {
  const storageService = inject(StorageService);
  const token: any = storageService.getSessionItem("token");
  const isTokenStored = token?.token;
  const isApiUrl = req.url.startsWith(environment.apiUrl);

  if (isTokenStored && isApiUrl) {
    req = req.clone({
      headers: req.headers.set('Authorization', token.token)
    });
  }
  
  return next(req);
};