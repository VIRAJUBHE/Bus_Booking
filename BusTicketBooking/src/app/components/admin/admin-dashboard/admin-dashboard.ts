import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-admin-dashboard',
  imports: [CommonModule],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css',
})
export class AdminDashboard {

  stats: any = {};
  loading = true;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadStats();
    this.loadChart();
    this.loadBookingsChart();
    this.loadBusTypeChart();
  }

  loadStats() {
    this.loading = true;

    this.http.get('http://localhost:8080/admin/dashboard')
      .subscribe({
        next: (res) => {
          this.stats = res;
          this.loading = false;
          
        },
        error: () => this.loading = false
      });
  }

  loadChart() {
    this.http.get<any[]>('http://localhost:8080/admin/dashboard/revenue-chart')
      .subscribe((data) => {

        const labels = data.map(d => d.date);
        const values = data.map(d => d.revenue);

        new Chart('revenueChart', {
          type: 'line',
          data: {
            labels: labels,
            datasets: [{
              label: 'Revenue',
              data: values,
              borderWidth: 2,
              tension: 0.3
            }]
          }
        });

      });
  }

  loadBookingsChart() {
  this.http.get<any[]>('http://localhost:8080/admin/dashboard/bookings-chart')
    .subscribe(data => {

      const labels = data.map(d => d.date);
      const values = data.map(d => d.count);

      new Chart('bookingsChart', {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [{
            label: 'Bookings',
            data: values
          }]
        }
      });

    });
}

loadBusTypeChart() {
  this.http.get<any[]>('http://localhost:8080/admin/dashboard/bus-type-chart')
    .subscribe(data => {

      const labels = data.map(d => d.type);
      const values = data.map(d => d.count);

      new Chart('busTypeChart', {
        type: 'pie',
        data: {
          labels: labels,
          datasets: [{
            data: values
          }]
        }
      });

    });
}

}
