import {Injectable} from '@angular/core';
import {HttpClient, HttpParams } from '@angular/common/http';
import {Observable} from 'rxjs';
import {ApiResponse} from '../models/api-response';
import {map, tap} from 'rxjs/operators';

export const preventClientErrorHandlingKey = 'prevent-client-error-handling';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
    constructor(
        private http: HttpClient,
  ) {
  }

  public getMany<T>(url: string, params?: HttpParams): Observable<T[]> {
    return this.http.get<ApiResponse<T>>(`api/${url}`, {params: params})
        .pipe(
            map((response) => response.data),
        );
  }

  public getOne<T>(url: string, params?: HttpParams): Observable<T> {
    return this.http.get<ApiResponse<T>>(`api/${url}`, {params: params})
        .pipe(
            map((response) => response.data[0]),
        );
  }

  public postWithoutReturn(url: string, body: any = null, params?: HttpParams, preventErrorHandling = false) {
    let httpHeaders = {};
    if (preventErrorHandling)
      httpHeaders[preventClientErrorHandlingKey] = 'true';

    return this.http.post<never>(`api/${url}`, body, {params: params, headers: httpHeaders});
  }

  public post<T>(url: string, body: any, params?: HttpParams, preventErrorHandling = false): Observable<T> {
    let httpHeaders = {};
    if (preventErrorHandling)
      httpHeaders[preventClientErrorHandlingKey] = 'true';
      
    return this.http.post<ApiResponse<T>>(`api/${url}`, body, {params: params, headers: httpHeaders})
        .pipe(
            map((response) => response.data[0]),
        );
  }

  public postAndGetMany<T>(url: string, body: any, params?: HttpParams): Observable<T[]> {
    return this.http.post<ApiResponse<T>>(`api/${url}`, body, {params: params})
        .pipe(
            map((response) => response.data),
        );
  }

  public postAndGetOne<T>(url: string, body: any, params?: HttpParams, preventErrorHandling = false): Observable<T> {
    let httpHeaders = {};
    if (preventErrorHandling)
      httpHeaders[preventClientErrorHandlingKey] = 'true';

    return this.http.post<ApiResponse<T>>(`api/${url}`, body, {params: params, headers: httpHeaders})
        .pipe(
            map((response) => response.data[0]),
        );
  }

  public delete(url: string, params?: HttpParams): Observable<any> {
    return this.http.delete(`api/${url}`, {params: params});
  }

}
