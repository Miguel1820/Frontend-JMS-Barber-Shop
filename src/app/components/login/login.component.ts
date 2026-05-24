import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  loading = false;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) return;

    this.loading = true;
    this.error = null;

    this.authService.login(this.loginForm.value).subscribe({
      next: (response) => {
        const role = this.authService.getRole();
        if (role === 'cliente') {
          this.router.navigate(['/cliente/dashboard']);
        } else if (role === 'barbero') {
          this.router.navigate(['/barbero/dashboard']);
        } else if (role === 'administrador') {
          this.router.navigate(['/admin/dashboard']);
        }
      },
      error: (err) => {
        this.loading = false;
        this.error = err.error?.detail || 'Error al iniciar sesión';
      }
    });
  }

  navigateToRegister(): void {
    this.router.navigate(['/register']);
  }
}
