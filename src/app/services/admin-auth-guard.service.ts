import { Router } from '@angular/router';
import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth.service';

@Injectable()
export class AdminAuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate() {
    if (this.authService.roles.includes('ROLE_ADMIN')) {
      return true;
    }

    // Navigate to the Permission Denied Page
    this.router.navigate(['/no-access']);
    return false;
  }
}
