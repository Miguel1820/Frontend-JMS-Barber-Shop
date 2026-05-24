import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { TurnoService } from '../../services/turno.service';
import { Turno } from '../../models/index';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-barbero-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './barbero-dashboard.component.html',
  styleUrls: ['./barbero-dashboard.component.scss']
})
export class BarberoDashboardComponent implements OnInit {
  userName = '';
  turnos: Turno[] = [];
  turnosHoy: Turno[] = [];
  loading = false;
  activeTab = 'hoy';

  constructor(
    private authService: AuthService,
    private turnoService: TurnoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadUserData();
    this.loadTurnos();
  }

  loadUserData(): void {
    this.userName = localStorage.getItem('user_email') || 'Barbero';
  }

  loadTurnos(): void {
    const userId = this.authService.getUserId();
    if (userId) {
      this.turnoService.obtenerTurnosBarbero(userId).subscribe({
        next: (turnos) => {
          this.turnos = turnos;
          this.filterTurnosHoy();
        },
        error: (err) => {
          console.error('Error al cargar turnos:', err);
        }
      });
    }
  }

  filterTurnosHoy(): void {
    const today = new Date().toDateString();
    this.turnosHoy = this.turnos.filter(t =>
      new Date(t.fecha).toDateString() === today
    );
  }

  actualizarEstadoTurno(turnoId: number, nuevoEstado: string): void {
    this.turnoService.actualizarEstadoTurno(turnoId, nuevoEstado).subscribe({
      next: () => {
        this.loadTurnos();
      },
      error: (err) => {
        console.error('Error al actualizar turno:', err);
      }
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  getEstadoClass(estado: string): string {
    return `badge-${estado}`;
  }
}
