import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ServicioService } from '../../services/servicio.service';
import { Servicio } from '../../models/index';
 
@Component({
  selector: 'app-admin-servicios',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-servicios.component.html',
  styleUrls: ['./admin-servicios.component.scss']
})
export class AdminServiciosComponent implements OnInit {
  servicios: Servicio[] = [];
 
  constructor(private router: Router, private servicioService: ServicioService) {}
 
  ngOnInit(): void {
    this.servicioService.obtenerServicios().subscribe((data) => {
      this.servicios = data;
    });
  }
 
  volver(): void {
    this.router.navigate(['/admin/dashboard']);
  }
}