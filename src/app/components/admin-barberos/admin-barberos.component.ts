import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BarberoService } from '../../services/barbero.service';
import { Barbero } from '../../models/index';
 
@Component({
  selector: 'app-admin-barberos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-barberos.component.html',
  styleUrls: ['./admin-barberos.component.scss']
})
export class AdminBarberosComponent implements OnInit {
  barberos: Barbero[] = [];
 
  constructor(private router: Router, private barberoService: BarberoService) {}
 
  ngOnInit(): void {
    this.barberoService.obtenerBarberos().subscribe((data) => {
      this.barberos = data;
    });
  }
 
  volver(): void {
    this.router.navigate(['/admin/dashboard']);
  }
}
 