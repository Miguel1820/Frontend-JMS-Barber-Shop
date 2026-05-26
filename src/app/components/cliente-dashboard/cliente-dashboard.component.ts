import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { TurnoService } from '../../services/turno.service';
import { Turno } from '../../models/index';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cliente-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cliente-dashboard.component.html',
  styleUrls: ['./cliente-dashboard.component.scss']
})
export class ClienteDashboardComponent implements OnInit {
  userName = '';
  turnos: Turno[] = [];
  loading = false;
  activeTab = 'opciones';

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
    const email = this.authService.getEmail();
    this.userName = email ? email.split('@')[0] : 'Cliente';
  }

  loadTurnos(): void {
    const userId = this.authService.getUserId();
    if (userId) {
      this.turnoService.obtenerTurnosCliente(userId).subscribe({
        next: (turnos) => {
          this.turnos = turnos;
        },
        error: (err) => {
          console.error('Error al cargar turnos:', err);
        }
      });
    }
  }

  navigateToReserva(): void {
    this.router.navigate(['/cliente/reservar']);
  }

  cancelarTurno(turnoId: number): void {
    if (confirm('¿Estás seguro de que deseas cancelar este turno?')) {
      this.turnoService.cancelarTurno(turnoId).subscribe({
        next: () => {
          this.loadTurnos();
        },
        error: (err) => {
          console.error('Error al cancelar turno:', err);
        }
      });
    }
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  getEstadoClass(estado: string): string {
    return `badge-${estado}`;
  }
}
