import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TurnoService } from '../../services/turno.service';
import { ServicioService } from '../../services/servicio.service';
import { BarberoService } from '../../services/barbero.service';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { Servicio, Barbero } from '../../models/index';

@Component({
  selector: 'app-reservar-turno',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './reservar-turno.component.html',
  styleUrls: ['./reservar-turno.component.scss']
})
export class ReservarTurnoComponent implements OnInit {
  reservaForm: FormGroup;
  servicios: Servicio[] = [];
  barberos: Barbero[] = [];
  horariosDisponibles: string[] = [];
  loading = false;
  error: string | null = null;
  success = false;

  constructor(
    private fb: FormBuilder,
    private turnoService: TurnoService,
    private servicioService: ServicioService,
    private barberoService: BarberoService,
    private authService: AuthService,
    private router: Router
  ) {
    this.reservaForm = this.fb.group({
      servicio_id: ['', Validators.required],
      barbero_id: ['', Validators.required],
      fecha: ['', Validators.required],
      hora_inicio: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadServicios();
    this.loadBarberos();
    this.generateHorarios();
  }

  loadServicios(): void {
    this.servicioService.obtenerServicios().subscribe({
      next: (servicios) => {
        this.servicios = servicios;
      },
      error: (err) => {
        console.error('Error al cargar servicios:', err);
      }
    });
  }

  loadBarberos(): void {
    this.barberoService.obtenerBarberos().subscribe({
      next: (barberos) => {
        this.barberos = barberos;
      },
      error: (err) => {
        console.error('Error al cargar barberos:', err);
      }
    });
  }

  generateHorarios(): void {
    this.horariosDisponibles = [];
    for (let i = 9; i <= 17; i++) {
      this.horariosDisponibles.push(`${i.toString().padStart(2, '0')}:00`);
    }
  }

  onSubmit(): void {
    if (this.reservaForm.invalid) return;

    this.loading = true;
    this.error = null;

    const clienteId = this.authService.getUserId();
    const servicioId = parseInt(this.reservaForm.get('servicio_id')?.value);
    const servicio = this.servicios.find(s => s.id === servicioId);

    if (!servicio) return;

    const horaInicio = this.reservaForm.get('hora_inicio')?.value;
    const horaFin = this.calcularHoraFin(horaInicio, servicio.duracion_minutos);

    const turnoData = {
      servicio_id: servicioId,
      barbero_id: parseInt(this.reservaForm.get('barbero_id')?.value),
      fecha: new Date(this.reservaForm.get('fecha')?.value),
      hora_inicio: horaInicio,
      hora_fin: horaFin
    };

    if (clienteId) {
      this.turnoService.crearTurno(turnoData, clienteId).subscribe({
        next: () => {
          this.success = true;
          setTimeout(() => {
            this.router.navigate(['/cliente/dashboard']);
          }, 2000);
        },
        error: (err) => {
          this.loading = false;
          this.error = err.error?.detail || 'Error al crear el turno';
        }
      });
    }
  }

  calcularHoraFin(horaInicio: string, duracion: number): string {
    const [horas, minutos] = horaInicio.split(':').map(Number);
    const totalMinutos = horas * 60 + minutos + duracion;
    const horaFinal = Math.floor(totalMinutos / 60);
    const minutosFinal = totalMinutos % 60;
    return `${horaFinal.toString().padStart(2, '0')}:${minutosFinal.toString().padStart(2, '0')}`;
  }

  getMinFecha(): string {
    const today = new Date();
    return today.toISOString().split('T')[0];
  }

  volver(): void {
    this.router.navigate(['/cliente/dashboard']);
  }
}
