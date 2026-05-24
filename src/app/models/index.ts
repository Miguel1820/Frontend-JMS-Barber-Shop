export interface Servicio {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  duracion_minutos: number;
  activo: boolean;
  created_at: string;
}

export interface Barbero {
  id: number;
  user_id: number;
  horario_inicio: string;
  horario_fin: string;
  activo: boolean;
  created_at: string;
}

export interface Turno {
  id: number;
  cliente_id: number;
  barbero_id: number;
  servicio_id: number;
  fecha: string;
  hora_inicio: string;
  hora_fin: string;
  estado: 'pendiente' | 'confirmado' | 'completado' | 'cancelado';
  notas?: string;
  created_at: string;
}
