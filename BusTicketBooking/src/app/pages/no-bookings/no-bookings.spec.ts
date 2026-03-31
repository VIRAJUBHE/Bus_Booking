import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoBookings } from './no-bookings';

describe('NoBookings', () => {
  let component: NoBookings;
  let fixture: ComponentFixture<NoBookings>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoBookings]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoBookings);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
