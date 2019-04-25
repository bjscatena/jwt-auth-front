import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient, private helper: JwtHelperService) {}

  login(credentials) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = { headers: headers };

    return this.http
      .post<{ username: string; token: string }>(
        'http://localhost:8080/auth/signin',
        JSON.stringify(credentials),
        options
      )
      .pipe(
        map(user => {
          if (user.username && user.token) {
            // We wanna store it in localStorage
            localStorage.setItem('token', user.token);
            return true;
          }
          return false;
        })
      );
  }

  logout() {
    localStorage.removeItem('token');
  }

  isLoggedIn() {
    const token = localStorage.getItem('token');

    if (!token) {
      return false;
    }

    return !this.helper.isTokenExpired(token);
  }

  get roles() {
    const token = localStorage.getItem('token');

    if (!token) {
      return null;
    }

    return this.helper.decodeToken(token).roles;
  }
}
