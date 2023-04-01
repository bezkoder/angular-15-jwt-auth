import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Availability } from '../models/Availability';

@Injectable({
  providedIn: 'root'
})
export class SolutionService {
  private apiUrl = 'https://example.com/api/solution'; // replace with your own API URL

  constructor(private http: HttpClient) { }

  getAllAvailabilities(): Observable<Availability[]> {
    return this.http.get<Availability[]>(`${this.apiUrl}/availabilities`);
  }

  createAvailability(availability: Availability): Observable<Availability> {
    return this.http.post<Availability>(`${this.apiUrl}/availabilities`, availability);
  }

  deleteAvailability(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/availabilities/${id}`);
  }
}
