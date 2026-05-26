import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-servicios',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="admin-section">
      <h1>Gestionar Servicios</h1>
      <button (click)="volver()">← Volver</button>
      <p>Aquí irá la gestión de servicios</p>
    </div>
  `,
  styles: [`
    .admin-section {
      padding: 20px;
      color: #fff;
    }
  `]
})
export class AdminServiciosComponent {
  constructor(private router: Router) {}

  volver(): void {
    this.router.navigate(['/admin/dashboard']);
  }
}
