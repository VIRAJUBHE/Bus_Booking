import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    const admin = localStorage.getItem('admin');

    if (admin) {
      return true;
    } else {
      alert('Unauthorized access');
      this.router.navigate(['/admin/login']);
      return false;
    }
  }
}