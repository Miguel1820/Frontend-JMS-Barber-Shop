import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-calendario',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="admin-section">
      <h1>Ver Calendario</h1>
      <button (click)="volver()">← Volver</button>
      <p>Aquí irá la vista del calendario</p>
    </div>
  `,
  styles: [`
    .admin-section {
      padding: 20px;
      color: #fff;
    }
  `]
})
export class AdminCalendarioComponent {
  constructor(private router: Router) {}

  volver(): void {
    this.router.navigate(['/admin/dashboard']);
  }
}
