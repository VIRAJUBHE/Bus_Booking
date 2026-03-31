import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Bus } from '../../models/bus';
import { ActivatedRoute, Router } from '@angular/router';
import { BusService } from '../../services/bus';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search-results',
  imports: [CommonModule],
  templateUrl: './search-results.html',
  styleUrl: './search-results.css',
})
export class SearchResults implements OnInit{

  buses$!: Observable<Bus[]>;
  selectedDate: string = "";
  source: string = "";
  destination: string = "";

  constructor(
    private route: ActivatedRoute,
    private busService: BusService,
    private router: Router
  ) {}

ngOnInit() {

  
  this.route.queryParams.subscribe(params => {
    this.source = params['source'];
    this.destination = params['destination'];
    this.selectedDate = params['date'];

    if (this.source && this.destination && this.selectedDate) {
      this.buses$ = this.busService.searchBus(
        this.source,
        this.destination, 
        this.selectedDate
      );
    }
  });
}

  selectBus(bus: Bus) {
    
    console.log("Bus ID:", bus.busId);
    this.router.navigate(['/seats', bus.busId]);
  }

  goBack() {
  this.router.navigate(['/']);
}

searchTomorrow() {
  const tomorrow = new Date(this.selectedDate);
  tomorrow.setDate(tomorrow.getDate() + 1);

  this.router.navigate(['/search'], {
    queryParams: {
      source: this.source,
      destination: this.destination,
      date: tomorrow.toISOString().split('T')[0]
    }
  });
}

searchDayAfter() {
  const dayAfter = new Date(this.selectedDate);
  dayAfter.setDate(dayAfter.getDate() + 2);

  this.router.navigate(['/search'], {
    queryParams: {
      source: this.source,
      destination: this.destination,
      date: dayAfter.toISOString().split('T')[0]
    }
  });
}

  // ✅ Smart Date (Today / Tomorrow / DD-MM-YYYY)
getFormattedDate(dateValue: string): string {
  if (!dateValue) return '';

  const inputDate = new Date(dateValue);
  const today = new Date();
  const tomorrow = new Date();

  today.setHours(0, 0, 0, 0);
  tomorrow.setDate(today.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);
  inputDate.setHours(0, 0, 0, 0);

  if (inputDate.getTime() === today.getTime()) return 'Today';
  if (inputDate.getTime() === tomorrow.getTime()) return 'Tomorrow';

  const day = String(inputDate.getDate()).padStart(2, '0');
  const month = String(inputDate.getMonth() + 1).padStart(2, '0');
  const year = inputDate.getFullYear();

  return `${day}-${month}-${year}`;
}


// ✅ Professional Time (06:00 AM)
formatTime(time: string): string {
  if (!time) return '';

  const [hours, minutes] = time.split(':').map(Number);

  let period = 'AM';
  let h = hours;

  if (hours >= 12) {
    period = 'PM';
    if (hours > 12) h = hours - 12;
  }

  if (hours === 0) h = 12;

  return `${String(h).padStart(2, '0')}:${String(minutes).padStart(2, '0')} ${period}`;
}


// ✅ Bus Type Color Fix (IMPORTANT ORDER)
getBusTypeClass(type: string): string {
  if (!type) return '';

  const t = type.toLowerCase().replace('-', '').replace(' ', '');

  if (t.includes('nonac')) return 'type-nonac';
  if (t.includes('ac')) return 'type-ac';
  if (t.includes('sleeper')) return 'type-sleeper';

  return 'type-default';
}

}
