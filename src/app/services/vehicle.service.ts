import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  constructor(private http: HttpClient) {}

  getVehicles() {
    let headers = new HttpHeaders();
    let token = localStorage.getItem('token');
    headers.append('Authorization', 'Bearer' + token);
    headers.append('Content-Type', 'application/json');

    const options = { headers: headers };

    return this.http.get('http://localhost:8080/api/vehicles', options);
  }
}
