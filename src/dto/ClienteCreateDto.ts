
export default interface ClienteCreateDto {
    nombre: string;
    apellido: string;
    fechaNacimiento: Date | string;
    cedula: number;
    veterinariaId: number;
  }