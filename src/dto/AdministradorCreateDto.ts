export default interface AdministradorCreateDto {

    correo: string;

    contrasenna: string;
  
    nombre: string;
  
    apellido: string;

    fechaNacimiento: Date | string;

    cedula: number;
  }