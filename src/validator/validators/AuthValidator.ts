import * as yup from 'yup';
import ValidationResponse from '../ValidatoResponse';
import LoginDto from '../../dto/LoginDto';

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

export default {validateLogin}