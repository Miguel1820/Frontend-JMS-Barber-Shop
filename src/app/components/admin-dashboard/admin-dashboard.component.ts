import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
  userName = '';
  activeTab = 'opciones';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadUserData();
  }

  loadUserData(): void {
    const email = this.authService.getEmail();
    this.userName = email ? email.split('@')[0] : 'Administrador';
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  navigateToGestionar(seccion: string): void {
    switch(seccion) {
      case 'barberos':
        this.router.navigate(['/admin/barberos']);
        break;
      case 'servicios':
        this.router.navigate(['/admin/servicios']);
        break;
      case 'calendario':
        this.router.navigate(['/admin/calendario']);
        break;
    }
  }
}
