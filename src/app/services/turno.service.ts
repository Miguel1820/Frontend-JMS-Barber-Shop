import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Turno } from '../models/index';

@Injectable({
  providedIn: 'root'
})
export class TurnoService {
  private apiUrl = 'http://localhost:8000/api/turnos';
  // New method to obtener todos los turnos (uso admin)


  constructor(private http: HttpClient) {}

  crearTurno(turno: any, clienteId: number): Observable<Turno> {
    return this.http.post<Turno>(`${this.apiUrl}/?cliente_id=${clienteId}`, turno);
  }

  obtenerTurnosCliente(clienteId: number): Observable<Turno[]> {
    return this.http.get<Turno[]>(`${this.apiUrl}/cliente/${clienteId}`);
  }

  obtenerTurnosBarbero(barberoUserId: number): Observable<Turno[]> {
    return this.http.get<Turno[]>(`${this.apiUrl}/barbero/${barberoUserId}`);
  }

  actualizarEstadoTurno(turnoId: number, nuevoEstado: string): Observable<Turno> {
    return this.http.put<Turno>(`${this.apiUrl}/${turnoId}/estado?nuevo_estado=${nuevoEstado}`, {});
  }

  cancelarTurno(turnoId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${turnoId}`);
  }
}
