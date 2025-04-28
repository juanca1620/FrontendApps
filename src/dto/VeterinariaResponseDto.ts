import { AdministradorResponseDto } from './AdministradorResponseDto';

export interface VeterinariaResponseDto {
  id: number;
  ubicacion: string;
  administrador: AdministradorResponseDto;
}