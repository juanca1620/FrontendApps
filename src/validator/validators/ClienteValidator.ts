import * as yup from 'yup';
import ClienteCreateDto from '../../dto/ClienteCreateDto';
import ValidationResponse from '../ValidatoResponse';
import ClienteUpdateDto from '../../dto/ClienteUpdateDto';

const clienteUpdateSchema = yup.object().shape({
  id: yup.number()
    .required('El ID es obligatorio')
    .positive('El ID debe ser un número positivo')
    .typeError('El ID debe ser un número'),

  nombre: yup.string()
    .required('El nombre no puede estar vacío')
    .min(2, 'El nombre debe tener entre 2 y 50 caracteres')
    .max(50, 'El nombre debe tener entre 2 y 50 caracteres'),

  apellido: yup.string()
    .required('El apellido no puede estar vacío')
    .min(2, 'El apellido debe tener entre 2 y 50 caracteres')
    .max(50, 'El apellido debe tener entre 2 y 50 caracteres'),

  fechaNacimiento: yup.date()
    .required('La fecha de nacimiento es obligatoria')
    .max(new Date(), 'La fecha de nacimiento debe ser en el pasado')
    .typeError('Debe ser una fecha válida')
});

const clienteCreateSchema = yup.object().shape({
  nombre: yup.string()
    .required('El nombre no puede estar vacío')
    .min(2, 'El nombre debe tener entre 2 y 50 caracteres')
    .max(50, 'El nombre debe tener entre 2 y 50 caracteres'),

  apellido: yup.string()
    .required('El apellido no puede estar vacío')
    .min(2, 'El apellido debe tener entre 2 y 50 caracteres')
    .max(50, 'El apellido debe tener entre 2 y 50 caracteres'),

  fechaNacimiento: yup.date()
    .required('La fecha de nacimiento es obligatoria')
    .max(new Date(), 'La fecha de nacimiento debe ser en el pasado')
    .typeError('Debe ser una fecha válida'),

  cedula: yup.number()
    .required('La cédula no puede estar vacía')
    .min(1000000, 'La cédula debe tener al menos 7 dígitos')
    .max(9999999999, 'La cédula no puede exceder los 10 dígitos')
    .typeError('La cédula debe ser un número'),

  veterinariaId: yup.number()
    .required('El ID de la veterinaria es obligatorio')
    .positive('El ID de la veterinaria debe ser un número positivo')
    .integer()
    .typeError('El ID debe ser un número')
});

const validateCreateCliente= async (data: ClienteCreateDto): Promise<ValidationResponse> => {
    try {
        await clienteCreateSchema.validate(data, { abortEarly: false });
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

const validateUpdateCliente = async (data: ClienteUpdateDto): Promise<ValidationResponse> => {
    try {
        await clienteUpdateSchema.validate(data, { abortEarly: false });
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

export default {validateCreateCliente, validateUpdateCliente}