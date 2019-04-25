import { Injectable } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router, CanActivate, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authservice: AuthService) {}

  canActivate(route, state: RouterStateSnapshot) {
    if (this.authservice.isLoggedIn()) {
      return true;
    }

    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}
