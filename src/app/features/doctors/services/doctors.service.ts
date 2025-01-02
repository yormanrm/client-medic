import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { firstValueFrom, Observable } from 'rxjs';
import { IApiResponse } from '../../../core/interfaces/api-response.interface';
import { HttpParamsBuilderService } from '../../../core/services/http-params-builder.service';

@Injectable({
  providedIn: 'root',
})
export class DoctorsService {
  private http = inject(HttpClient);
  private httpParamsBuilder = inject(HttpParamsBuilderService);
  private url: string = environment.apiUrl;

  public register(doctor: any): Observable<IApiResponse> {
    return this.http.post<IApiResponse>(this.url + '/doctor/register', doctor);
  }

  public getAll(): Observable<IApiResponse> {
    return this.http.get<IApiResponse>(this.url + '/doctor/get-all');
  }

  public getById(id: number): Observable<IApiResponse> {
    const params = this.httpParamsBuilder.builder({ id });
    return this.http.get<IApiResponse>(this.url + '/doctor/get-byID', {
      params,
    });
  }

  public search(text: string): Observable<IApiResponse> {
    return this.http.post<IApiResponse>(this.url + '/doctor/search', text);
  }
}
