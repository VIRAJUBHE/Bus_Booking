import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-buses',
  imports: [FormsModule , CommonModule],
  templateUrl: './admin-buses.html',
  styleUrl: './admin-buses.css',
})
export class AdminBuses {

  buses: any[] = [];
  loading = true;

  bus = {
    busName: '',
    busNumber: '',
    source: '',
    destination: '',
    departureTime: '',
    journeyDate: '',
    price: 0,
    totalSeats: 40,
    busType: ''
  };

  isEdit = false;
  editId: number | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadBuses();
    
  }

loadBuses() {
  this.loading = true;

  this.http.get<any[]>('http://localhost:8080/admin/buses')
    .subscribe({
      next: (res) => {
        console.log("Buses:", res);   // 🔍 debug
        this.buses = res || [];
        this.loading = false;         // ✅ ALWAYS turn off
      },
      error: (err) => {
        console.error(err);
        this.loading = false;         // ✅ ALSO turn off on error
      },
      complete: () => {
        this.loading = false;         // 🔥 EXTRA SAFETY
      }
    });
}

  submitBus() {

    if (!this.bus.busName || !this.bus.source || !this.bus.destination) {
    alert("Please fill all required fields");
    return;
  }

  if (this.bus.price <= 0 || this.bus.totalSeats <= 0) {
    alert("Invalid price or seats");
    return;
  }

    if (this.isEdit) {
      this.http.put(`http://localhost:8080/admin/buses/${this.editId}`, this.bus)
        .subscribe(() => {
          this.resetForm();
          this.loadBuses();
        });
    } else {
      this.http.post('http://localhost:8080/admin/buses', this.bus)
        .subscribe(() => {
          this.resetForm();
          this.loadBuses();
        });
    }
  }

  editBus(b: any) {
    this.bus = { ...b };
    this.isEdit = true;
    this.editId = b.busId;
  }

  deleteBus(id: number) {
    if (confirm('Delete this bus?')) {
      this.http.delete(`http://localhost:8080/admin/buses/${id}`)
        .subscribe(() => this.loadBuses());
    }
  }

  resetForm() {
    this.bus = {
      busName: '',
      busNumber: '',
      source: '',
      destination: '',
      departureTime: '',
      journeyDate: '',
      price: 0,
      totalSeats: 40,
      busType: ''
    };
    this.isEdit = false;
    this.editId = null;
  }

}
