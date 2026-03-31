import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin-layout',
  imports: [RouterModule],
  templateUrl: './admin-layout.html',
  styleUrl: './admin-layout.css',
})
export class AdminLayout {

  constructor(private router: Router) {}

  logout() {
    localStorage.removeItem('admin');
    this.router.navigate(['/admin/login']);
  }

}
