import { Component, HostListener } from '@angular/core';
import { Bus } from '../../models/bus';
import { BusService } from '../../services/bus';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
 selector:'app-search-bus',
 imports:[FormsModule,CommonModule],
 templateUrl:'./search-bus.html',
 styleUrl:'./search-bus.css'
})
export class SearchBusComponent{

 source:string="";
 destination:string="";
 

 buses:Bus[]=[];

 constructor(private busService:BusService,
    private router: Router
 ){}

  sourceSuggestions: string[] = [];
  destinationSuggestions: string[] = [];
  selectedSourceIndex = -1;
  selectedDestinationIndex = -1;

  showSourceDropdown = false;
  showDestinationDropdown = false;

  journeyDate: string = "";
  todayDate: string = "";

  swapLocations() {
  const temp = this.source;
  this.source = this.destination;
  this.destination = temp;
  }

  selectSource(value: string) {
  this.source = value;
  this.showSourceDropdown = false;
}

@HostListener('document:click', ['$event'])
onClickOutside(event: any) {
  if (!event.target.closest('.input-box')) {
    this.showSourceDropdown = false;
    this.showDestinationDropdown = false;
  }
}

selectDestination(value: string) {
  this.destination = value;
  this.showDestinationDropdown = false;
}

ngOnInit() {
  const today = new Date();
  this.todayDate = today.toISOString().split('T')[0];
}

  search() {

  // Empty validation
  if (!this.source || !this.destination || !this.journeyDate) {
    alert("Please fill all fields");
    return;
  }

  // Same source & destination validation
  if (this.source === this.destination) {
    alert("Source and destination cannot be same");
    return;
  }

  // Prevent past date manually (extra safety)
  if (this.journeyDate < this.todayDate) {
    alert("You cannot select past dates");
    return;
  }

  // Proceed to next page
  this.router.navigate(['/search'], {
    queryParams: {
      source: this.source,
      destination: this.destination,
      date: this.journeyDate
    }
  });
}

loadSources() {
  this.showSourceDropdown = true;
  this.showDestinationDropdown = false;

  this.busService.getLocations('').subscribe(data => {
    this.sourceSuggestions = data;
  });
}

loadDestinations() {
  this.showDestinationDropdown = true;
  this.showSourceDropdown = false;

  this.busService.getLocations('').subscribe(data => {
    this.destinationSuggestions = data;
  });
}

handleSourceKeys(event: KeyboardEvent) {

  if (!this.sourceSuggestions.length) return;

  if (event.key === 'ArrowDown') {
    this.selectedSourceIndex = (this.selectedSourceIndex + 1) % this.sourceSuggestions.length;
  }

  else if (event.key === 'ArrowUp') {
    this.selectedSourceIndex = (this.selectedSourceIndex - 1 + this.sourceSuggestions.length) % this.sourceSuggestions.length;
  }

  else if (event.key === 'Enter') {
    this.selectSource(this.sourceSuggestions[this.selectedSourceIndex]);
  }
}

handleDestinationKeys(event: KeyboardEvent) {

  if (!this.destinationSuggestions.length) return;

  if (event.key === 'ArrowDown') {
    this.selectedDestinationIndex = (this.selectedDestinationIndex + 1) % this.destinationSuggestions.length;
  }

  else if (event.key === 'ArrowUp') {
    this.selectedDestinationIndex = (this.selectedDestinationIndex - 1 + this.destinationSuggestions.length) % this.destinationSuggestions.length;
  }

  else if (event.key === 'Enter') {
    this.selectDestination(this.destinationSuggestions[this.selectedDestinationIndex]);
  }
}

}