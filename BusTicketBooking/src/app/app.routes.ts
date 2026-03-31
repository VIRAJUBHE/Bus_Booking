import { Routes } from '@angular/router';

import { BookingHistoryComponent } from './components/booking-history/booking-history';
import { SeatSelectionComponent } from './components/seat-selection/seat-selection';
import { BusListComponent } from './components/bus-list/bus-list';
import { SearchBusComponent } from './components/search-bus/search-bus';
import { BookingComponent } from './components/bookings/bookings';
import { SearchResults } from './components/search-results/search-results';

import { AuthGuard } from './guard/auth.guard';

// ✅ FIXED naming (IMPORTANT)
import { Login } from './components/login/login';
import { RegisterComponent } from './components/register/register';
import { AboutUs } from './components/about-us/about-us';
import { Payment } from './components/payment/payment';
import { AdminLogin } from './components/admin/admin-login/admin-login';
import { AdminLayout } from './components/admin/admin-layout/admin-layout';
import { AdminDashboard } from './components/admin/admin-dashboard/admin-dashboard';
import { AdminBuses } from './components/admin/admin-buses/admin-buses';
import { AdminBookings } from './components/admin/admin-bookings/admin-bookings';
import { AdminGuard } from './components/admin/admin-guard';

export const routes: Routes = [

  // 🔓 Public routes
  { path: 'login', component: Login },
  // 🔒 Protected routes
  { path: '', component: SearchBusComponent},
  { path: 'buses', component: BusListComponent },
  { path: 'search', component: SearchResults},
  { path: 'seats/:id', component: SeatSelectionComponent,canActivate: [AuthGuard] },
  { path: 'bookings', component: BookingHistoryComponent,canActivate: [AuthGuard] },
  { path: 'booking/:busId', component: BookingComponent },
  {path:'about' , component:AboutUs},
  {path:'payment' , component:Payment,canActivate: [AuthGuard]},

  //Admin
  {path:'admin/login',component:AdminLogin},
  {
  path: 'admin',component:AdminLayout,canActivate: [AdminGuard],
  children: [
    {
      path: 'dashboard',component:AdminDashboard
    },
    {
      path: 'buses',component:AdminBuses
    },
    {
      path: 'bookings',component:AdminBookings
    }
    ]
  },

  // ❌ Invalid route → redirect
  { path: '**', redirectTo: 'login' }
];
