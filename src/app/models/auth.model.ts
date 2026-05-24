export interface User {
  id: number;
  email: string;
  nombre: string;
  role: 'cliente' | 'barbero' | 'administrador';
  activo: boolean;
  created_at: string;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
  user_id: number;
  role: 'cliente' | 'barbero' | 'administrador';
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  nombre: string;
  password: string;
  role: 'cliente' | 'barbero' | 'administrador';
}
