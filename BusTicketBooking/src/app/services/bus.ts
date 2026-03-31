import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Bus } from '../models/bus';
import { Observable } from 'rxjs';
@Injectable({ providedIn: 'root' })
export class BusService {

  private baseUrl = 'http://localhost:8080/buses';

  constructor(private http: HttpClient) {}

  searchBus(source: string, destination: string, date: string) {
    return this.http.get<Bus[]>(
      `${this.baseUrl}/search?source=${source}&destination=${destination}&date=${date}`
    );
  }

  getLocations(keyword: string) {
  return this.http.get<string[]>(`${this.baseUrl}/locations?keyword=${keyword}`);
  }

  getBusById(id: number) {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  getAllBuses(): Observable<Bus[]> {
  return this.http.get<Bus[]>(`${this.baseUrl}/all`);
}
}