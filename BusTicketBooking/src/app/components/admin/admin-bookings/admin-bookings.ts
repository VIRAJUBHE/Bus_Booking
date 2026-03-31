import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-bookings',
  imports: [CommonModule],
  templateUrl: './admin-bookings.html',
  styleUrl: './admin-bookings.css',
})
export class AdminBookings {

  bookings: any[] = [];
  loading = true;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadBookings();
  }

  loadBookings() {
  this.loading = true;

  this.http.get<any>('http://localhost:8080/admin/bookings')
    .subscribe({
      next: (res) => {
        console.log("Bookings API:", res); // 🔍 MUST CHECK

        // ✅ Handle both cases
        if (Array.isArray(res)) {
          this.bookings = res;
        } else if (res.data) {
          this.bookings = res.data;
        } else {
          this.bookings = [];
        }

        this.loading = false;
      },
      error: (err) => {
        console.error("Error:", err);
        this.loading = false;
      },
      complete: () => {
        this.loading = false; // 🔥 extra safety
      }
    });
}

  cancelBooking(id: number) {
    if (confirm('Cancel this booking?')) {
      this.http.delete(`http://localhost:8080/admin/bookings/${id}`)
        .subscribe(() => this.loadBookings());
    }
  }

}
