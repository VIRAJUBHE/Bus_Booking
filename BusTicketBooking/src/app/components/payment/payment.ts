import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookingService } from '../../services/booking';

@Component({
  selector: 'app-payment',
  imports: [],
  templateUrl: './payment.html',
  styleUrl: './payment.css',
})
export class Payment implements OnInit{

  bookingData: any;
  userId!: number;

  constructor(
    private router: Router,
    private bookingService: BookingService
  ) {}

  ngOnInit() {

    const data = localStorage.getItem('pendingBooking');

    if (!data) {
      this.router.navigate(['/']);
      return;
    }

    this.bookingData = JSON.parse(data);
    this.userId = Number(localStorage.getItem('userId'));

    if (!this.userId) {
      this.router.navigate(['/login'], {
        queryParams: { returnUrl: '/payment' }
      });
    }
  }

  payNow() {

    // 🔥 REAL BOOKING HAPPENS HERE
    this.bookingService
      .bookSeats(this.userId, this.bookingData.busId, this.bookingData.seats)
      .subscribe({
        next: () => {

          alert('✅ Payment Successful & Booking Confirmed');

          // clear temp data
          localStorage.removeItem('pendingBooking');

          // redirect
          this.router.navigate(['/']);
        },
        error: (err) => {
          alert('❌ Booking failed');
          console.error(err);
        }
      });
  }

}
