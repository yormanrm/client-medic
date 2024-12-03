import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { IApiResponse } from '../../../interfaces/api-response.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private http = inject(HttpClient);
  private url: string = environment.apiUrl + '/auth/login'

  public login(username: string, password: string): Observable<IApiResponse> {
    return this.http.post<IApiResponse>(this.url, {username, password});
  }

}
