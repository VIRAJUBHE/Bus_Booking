import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { BusService } from '../../services/bus';
import { BookingService } from '../../services/booking';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-seat-selection',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './seat-selection.html',
  styleUrl: './seat-selection.css'
})
export class SeatSelectionComponent implements OnInit {

  busId!: number;

  seats: number[] = [];
  selectedSeats: number[] = [];
  seatStatusMap: { [key: number]: string } = {};
  seatPrices: { [key: number]: number } = {};

  seatRows: any[] = [];
  bus: any;
  loadingSeats = true;

  constructor(
    private route: ActivatedRoute,
    private busService: BusService,
    private bookingService: BookingService,
    private router: Router,
    private authService : AuthService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) return;

    this.busId = +id;

    this.seats = Array.from({ length: 40 }, (_, i) => i + 1);
    this.createSeatLayout();

    this.loadBusData();
  }

  /* ------------------ LOAD DATA ------------------ */

  loadBusData() {
    this.busService.getBusById(this.busId).subscribe({
      next: (data) => {
        this.bus = data;

        this.seats.forEach(seat => {
          this.seatPrices[seat] = this.bus.price;
        });

        this.loadBookedSeats();
      },
      error: (err) => console.error(err)
    });
  }

  loadBookedSeats() {
  this.bookingService.getBookedSeats(this.busId).subscribe({
    next: (data) => {

      this.seatStatusMap = {};

      data.forEach((seatNumber: number) => {
        this.seatStatusMap[seatNumber] = 'BOOKED';
      });
      // ✅ IMPORTANT: trigger UI refresh
      this.seatRows = [...this.seatRows];  
    }
  });
}

  /* ------------------ SEAT LAYOUT ------------------ */

  createSeatLayout() {
    this.seatRows = [];

    for (let i = 0; i < 40; i += 4) {
      this.seatRows.push({
        left: [this.seats[i], this.seats[i + 1]],
        right: [this.seats[i + 2], this.seats[i + 3]]
      });
    }
  }

  /* ------------------ SEAT LOGIC ------------------ */

  toggleSeat(seat: number) {
    if (this.isBooked(seat)) return;

    if (this.selectedSeats.includes(seat)) {
      this.selectedSeats = this.selectedSeats.filter(s => s !== seat);
    } else {
      this.selectedSeats.push(seat);
    }
  }

  isSelected(seat: number): boolean {
    return this.selectedSeats.includes(seat);
  }

  isBooked(seat: number): boolean {
    return !!this.seatStatusMap[seat];
  }

  /* ------------------ PRICE ------------------ */

  get selectedCount(): number {
    return this.selectedSeats.length;
  }

  get totalPrice(): number {
    return this.selectedSeats.reduce(
      (sum, seat) => sum + (this.seatPrices[seat] || 0),
      0
    );
  }

  /* ------------------ BOOKING ------------------ */

  bookNow() {
    console.log("🔥 Book button clicked");
    // 🔥 LOGIN CHECK (ADD THIS AT TOP)
  if (!this.authService.isLoggedIn()) {
    this.router.navigate(['/login'], {
      queryParams: { returnUrl: this.router.url }
    });
    return;
  }

    if (this.selectedSeats.length === 0) {
      alert('Please select at least one seat');
      return;
    }

    // recheck seats before proceeding
    this.bookingService.getBookedSeats(this.busId).subscribe({
      next: (data) => {

        const bookedSeats = data;

        const conflict = this.selectedSeats.some(seat =>
          bookedSeats.includes(seat)
        );

        if (conflict) {
          alert('Some seats were just booked. Please select again.');
          this.selectedSeats = [];
          this.loadBookedSeats();
          return;
        }

        this.proceedToPayment();
      },
      error: (err) => console.error(err)
    });
  }

  proceedToPayment() {
    const userId = localStorage.getItem('userId');
    console.log("USER ID:", userId);

    const bookingData = {
      busId: this.busId,
      seats: this.selectedSeats,
      totalPrice: this.totalPrice
    };

    localStorage.setItem('pendingBooking', JSON.stringify(bookingData));

    if (!userId) {
      this.router.navigate(['/login'], {
        queryParams: { returnUrl: '/payment' }
      });
    } else {
      this.router.navigate(['/payment']);
    }
  }
}