import { Component, OnInit } from '@angular/core';
import { Booking } from '../../models/booking';
import { BookingService } from '../../services/booking';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { finalize, Observable } from 'rxjs';
import { NoBookings } from "../../pages/no-bookings/no-bookings";


@Component({
  selector: 'app-booking-history',
  standalone: true,
  imports: [CommonModule, NoBookings],
  templateUrl: './booking-history.html',
  styleUrls: ['./booking-history.css'],
})
export class BookingHistoryComponent implements OnInit {

  bookings$!: Observable<Booking[]>;
  userId!: number;
  loading = true;

  // ✅ Overlay
  selectedBooking: any = null;

  constructor(
    private bookingService: BookingService,
    private router: Router
  ) {}

  ngOnInit() {
    const userIdStr = localStorage.getItem('userId');

    if (!userIdStr || isNaN(Number(userIdStr))) {
      this.router.navigate(['/login'], {
        queryParams: { returnUrl: '/bookings' }
      });
      return;
    }

    this.userId = Number(userIdStr);

    this.loading = true;

this.bookings$ = this.bookingService.getUserBookings(this.userId);

this.bookings$.subscribe({
  next: () => this.loading = false,
  error: () => this.loading = false
});
  }

  // ✅ Open popup
  openDetails(booking: any) {
    this.selectedBooking = booking;
  }

  // ✅ Close popup
  closeDetails() {
    this.selectedBooking = null;
  }

  // ✅ Seat numbers fix
  getSeatNumbers(booking: any): string {
  if (!booking?.bookingSeats?.length) return 'No seats';

  const uniqueSeats = [
    ...new Set(
      booking.bookingSeats.map((bs: any) => bs?.seat?.seatNumber)
    )
  ];

  return uniqueSeats.join(', ');
}

  // ✅ Price fix
  getTotalPrice(booking: any): number {
  return booking.totalAmount || 0;
  }

  // ✅ Download ticket
  downloadTicket() {
  const element = document.getElementById('ticket-details');

  if (!element) {
    alert("❌ Ticket not found");
    return;
  }

  html2canvas(element).then(canvas => {
    const imgData = canvas.toDataURL('image/png');

    const pdf = new jsPDF();
    pdf.addImage(imgData, 'PNG', 10, 10, 180, 120);
    pdf.save(`BusKaro.pdf`);
  });
}

  cancelBooking(bookingId: number) {
  if (!confirm('Are you sure you want to cancel?')) return;

  this.bookingService.cancelBooking(bookingId).subscribe({
    next: (res: any) => {
      alert(res.message);   // ✅ FIX HERE

      this.closeDetails();
      this.ngOnInit();
    },
    error: (err) => {
      alert('Cancellation failed');
      console.error(err);
    }
  });
}

}
