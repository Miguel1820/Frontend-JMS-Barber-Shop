import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Barbero } from '../models/index';

@Injectable({
  providedIn: 'root'
})
export class BarberoService {
  private apiUrl = 'http://localhost:8000/api/barberos';

  constructor(private http: HttpClient) {}

  obtenerBarberos(): Observable<Barbero[]> {
    return this.http.get<Barbero[]>(this.apiUrl);
  }

  obtenerBarbero(id: number): Observable<Barbero> {
    return this.http.get<Barbero>(`${this.apiUrl}/${id}`);
  }

  crearBarbero(barbero: any): Observable<Barbero> {
    return this.http.post<Barbero>(this.apiUrl, barbero);
  }

  actualizarBarbero(id: number, barbero: any): Observable<Barbero> {
    return this.http.put<Barbero>(`${this.apiUrl}/${id}`, barbero);
  }

  eliminarBarbero(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
