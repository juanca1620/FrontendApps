import * as yup from 'yup';
import ValidationResponse from '../ValidatoResponse';
import LoginDto from '../../dto/LoginDto';
import VeterinariaCreateDto from '../../dto/VeterinariaCreateDto';

const loginSchema = yup.object().shape({
    correo: yup.string()
        .required('El correo electrónico no puede estar vacío')
        .email('Debe proporcionar un correo electrónico válido')
        .max(100, 'El correo electrónico no puede exceder los 100 caracteres'),

    contrasenna: yup.string()
        .required('La contraseña no puede estar vacía')
        .min(8, 'La contraseña debe tener al menos 8 caracteres')
        .max(50, 'La contraseña no puede exceder los 50 caracteres')
});


const validateLogin = async (data: LoginDto): Promise<ValidationResponse> => {
    try {
        await loginSchema.validate(data, { abortEarly: false });
        return { success: true };
    } catch (err) {
        if (err instanceof yup.ValidationError) {
            return {
                success: false,
                errors: err.errors
            };
        }
        return {
            success: false,
            errors: ['Error de validación desconocido']
        };
    }
};

const administradorSchema = yup.object().shape({
    correo: yup.string()
      .required('El correo electrónico no puede estar vacío')
      .email('Debe proporcionar un correo electrónico válido')
      .max(100, 'El correo electrónico no puede exceder los 100 caracteres'),
    
    contrasenna: yup.string()
      .required('La contraseña no puede estar vacía')
      .min(8, 'La contraseña debe tener al menos 8 caracteres')
      .max(50, 'La contraseña no puede exceder los 50 caracteres'),
    
    nombre: yup.string()
      .required('El nombre no puede estar vacío')
      .min(2, 'El nombre debe tener al menos 2 caracteres')
      .max(50, 'El nombre no puede exceder los 50 caracteres'),
    
    apellido: yup.string()
      .required('El apellido no puede estar vacío')
      .min(2, 'El apellido debe tener al menos 2 caracteres')
      .max(50, 'El apellido no puede exceder los 50 caracteres'),
    
    fechaNacimiento: yup.date()
      .required('La fecha de nacimiento es obligatoria')
      .max(new Date(Date.now() - 86400000), 'La fecha de nacimiento debe ser en el pasado'),
    
    cedula: yup.number()
      .required('La cédula no puede estar vacía')
      .min(1000000, 'La cédula debe tener al menos 7 dígitos')
      .max(9999999999, 'La cédula no puede exceder los 10 dígitos')
      .integer('La cédula debe ser un número entero')
  });

  const veterinariaSchema = yup.object().shape({
    ubicacion: yup.string()
      .required('La ubicación no puede estar vacía'),
    
    administrador: administradorSchema.required('El administrador es requerido')
  });
  
  const validateRegister = async (data: VeterinariaCreateDto): Promise<ValidationResponse> => {
    try {
      await veterinariaSchema.validate(data, { abortEarly: false });
      return { success: true };
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        return {
          success: false,
          errors: err.errors
        };
      }
      return {
        success: false,
        errors: ['Error de validación desconocido']
      };
    }
  };

export default {validateLogin,validateRegister}