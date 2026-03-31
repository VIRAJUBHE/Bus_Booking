import { Component, OnInit } from '@angular/core';
import { BookingService } from '../../services/booking';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bookings',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bookings.html',
  styleUrls: ['./bookings.css']
})
export class BookingComponent implements OnInit {

  userId!: number;
  busId!: number;
  selectedSeats: number[] = [];
  totalAmount: number = 0;
  isLoading: boolean = false;

  constructor(
    private bookingService: BookingService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {

    // ✅ Safe userId handling
    const userIdStr = localStorage.getItem('userId');

    if (!userIdStr || isNaN(Number(userIdStr))) {
      alert("❌ Please login first");
      this.router.navigate(['/login']);
      return;
    }

    this.userId = Number(userIdStr);

    // ✅ Safe busId handling
    const busIdParam = this.route.snapshot.paramMap.get('busId');
    if (!busIdParam) {
      alert("❌ Invalid bus");
      this.router.navigate(['/']);
      return;
    }

    this.busId = Number(busIdParam);

    // ✅ Load selected seats
    const seats = localStorage.getItem('selectedSeats');
    if (seats) {
      this.selectedSeats = JSON.parse(seats);
    }

    // ✅ Dynamic pricing (can change later)
    this.totalAmount = this.selectedSeats.length * 500;
  }

  confirmBooking() {

    if (this.selectedSeats.length === 0) {
      alert("❌ No seats selected");
      return;
    }

    this.isLoading = true;

    this.bookingService
      .bookSeats(this.userId, this.busId, this.selectedSeats)
      .subscribe({
        next: () => {
          alert("✅ Booking Confirmed");

          // ✅ Clear selected seats
          localStorage.removeItem('selectedSeats');

          // ✅ Redirect to booking history
          this.router.navigate(['/bookings']);
        },
        error: (err) => {
          console.error("Booking Error:", err);
          alert(err.error?.message || "❌ Booking Failed");
          this.isLoading = false;
        },
        complete: () => {
          this.isLoading = false;
        }
      });
  }
}
