import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {

    const userId = localStorage.getItem('userId');

    if (!userId) {
      this.router.navigate(['/login'], {
        queryParams: { returnUrl: '/' + route.url.map(s => s.path).join('/') }
      });
      return false;
    }

    return true;
  }
};
