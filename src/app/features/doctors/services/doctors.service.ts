import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { firstValueFrom, Observable } from 'rxjs';
import { IApiResponse } from '../../../core/interfaces/api-response.interface';
import { HttpParamsBuilderService } from '../../../core/services/http-params-builder.service';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class DoctorsService {
  private http = inject(HttpClient);
  private httpParamsBuilder = inject(HttpParamsBuilderService);
  private url: string = environment.apiUrl;

  public register(doctor: FormGroup): Observable<IApiResponse> {
    return this.http.post<IApiResponse>(this.url + '/doctor/register', doctor.value);
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
