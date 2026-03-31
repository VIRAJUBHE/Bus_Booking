import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({ providedIn: 'root' })
export class SeatService {

  private baseUrl = 'http://localhost:8080/seats';

  constructor(private http: HttpClient) {}

  getSeats(busId: number) {
    return this.http.get<any[]>(`${this.baseUrl}/bus/${busId}`);
  }
}