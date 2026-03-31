import { Component, OnInit } from '@angular/core';
import { Bus } from '../../models/bus';
import { BusService } from '../../services/bus';
import { map, Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bus-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bus-list.html',
  styleUrl: './bus-list.css'
})
export class BusListComponent implements OnInit {

  buses$!: Observable<Bus[]>;   // ✅ observable

  constructor(
    private busService: BusService,
    private router: Router
  ) {}

  ngOnInit() {
    this.buses$ = this.busService.getAllBuses(); // OR searchBus(...)

    this.buses$ = this.busService.getAllBuses().pipe(
  map(buses => buses.map(bus => ({
    ...bus,
    departureTime: this.formatTime(bus.departureTime)
  })))
  );
  }

  formatTime(time: string): string {
  if (!time) return '';

  const [hours, minutes] = time.split(':').map(Number);

  let period = 'AM';
  let formattedHour = hours;

  if (hours >= 12) {
    period = 'PM';
    if (hours > 12) formattedHour = hours - 12;
  }

  if (hours === 0) {
    formattedHour = 12;
  }

  return `${String(formattedHour).padStart(2, '0')}:${String(minutes).padStart(2, '0')} ${period}`;
}

  selectBus(busId: number) {
    this.router.navigate(['/seats', busId]);
  }

  getBusTypeClass(type: string): string {
  if (!type) return '';

  type = type.toLowerCase();

  // ✅ FIRST check NON-AC
  if (type.includes('non-ac') || type.includes('non ac')) return 'type-nonac';

  // ✅ THEN check AC
  if (type.includes('ac')) return 'type-ac';

  // ✅ Sleeper
  if (type.includes('sleeper')) return 'type-sleeper';

  return 'type-default';
}

  getFormattedDate(dateValue: string): string {
  if (!dateValue) return '';

  const inputDate = new Date(dateValue);
  const today = new Date();
  const tomorrow = new Date();

  // normalize time (important)
  today.setHours(0, 0, 0, 0);
  tomorrow.setDate(today.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);

  inputDate.setHours(0, 0, 0, 0);

  if (inputDate.getTime() === today.getTime()) {
    return 'Today';
  }

  if (inputDate.getTime() === tomorrow.getTime()) {
    return 'Tomorrow';
  }

  // fallback → DD-MM-YYYY
  const day = String(inputDate.getDate()).padStart(2, '0');
  const month = String(inputDate.getMonth() + 1).padStart(2, '0');
  const year = inputDate.getFullYear();

  return `${day}-${month}-${year}`;
}
}