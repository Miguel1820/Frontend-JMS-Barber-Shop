import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const requiredRole = route.data['role'];
    const userRole = this.authService.getRole();

    console.log('RoleGuard - Required:', requiredRole, 'User:', userRole);
    console.log('After trim - Required:', requiredRole?.trim(), 'User:', userRole?.trim());

    if (userRole && userRole.trim() === requiredRole?.trim()) {
      return true;
    }

    console.log('RoleGuard - Access denied');
    this.router.navigate(['/login']);
    return false;
  }
}
