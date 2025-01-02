import { HttpInterceptorFn } from '@angular/common/http';
import { StorageService } from '../services/storage.service';
import { inject } from '@angular/core';
import { environment } from '../../../environments/environment';
import { IToken } from '../interfaces/token.interface';

export const setAuthorizationHeadersInterceptor: HttpInterceptorFn = (req, next) => {
  const storageService = inject(StorageService);
  const tokenStored: IToken = storageService.getSessionItem("token");
  const token = tokenStored?.tokenType + " " + tokenStored?.accessToken;
  const isApiUrl = req.url.startsWith(environment.apiUrl);

  if (token && isApiUrl) {
    req = req.clone({
      headers: req.headers.set('Authorization', token)
    });
  }
  
  return next(req);
};