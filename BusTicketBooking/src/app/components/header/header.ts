import { Component, HostListener } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [RouterLink,CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {


  isScrolled = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 20;
  }

  constructor(private router: Router,private authService:AuthService) {}

goToMyBookings() {
  const userId = localStorage.getItem('userId');  // ✅ FIX

  if (!userId) {
    this.router.navigate(['/login'], {
      queryParams: { returnUrl: '/bookings' } // 🔥 better UX
    });
  } else {
    this.router.navigate(['/bookings']); // ✅ FIXED
  }
}

isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }

}
