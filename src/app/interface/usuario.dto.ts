
export interface UsuarioDto {
  tipo_usuario?: string;
  nombres?: string;
  apellidos?: string;
  dni?: string;
  correo?: string;
  celular?: string;
  telefono?: string;
  direccion?: string;
  foto_perfil?: File | null;
  usuario?: string;
  password?: string;
  rep_password?: string;
  id_notificaciones?: string;
  carta_presentacion?: string;
  estado?: string;
}
