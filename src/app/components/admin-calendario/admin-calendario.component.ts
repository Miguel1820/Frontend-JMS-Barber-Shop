import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
 
@Component({
  selector: 'app-admin-calendario',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-calendario.component.html',
  styleUrls: ['./admin-calendario.component.scss']
})
export class AdminCalendarioComponent {
  constructor(private router: Router) {}
 
  volver(): void {
    this.router.navigate(['/admin/dashboard']);
  }
}
 