import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  private baseUrl = 'http://localhost:8082/api';

  constructor(private http: HttpClient) { }

  getLocation(address: string): Observable<any> {
    const params = new HttpParams().set('address', address);
    return this.http.get<any>(`${this.baseUrl}/location`, { params });
  }
}
