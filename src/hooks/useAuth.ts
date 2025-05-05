import { useState } from 'react';
import LoginDto from '../dto/LoginDto';

import AuthService from '../api/apiService/AuthService';
import AuthValidator from '../validator/validators/AuthValidator';
import validationResponse from '../validator/ValidatoResponse';
import { VeterinariaResponseDto } from '../dto/VeterinariaResponseDto';
import VeterinariaCreateDto from '../dto/VeterinariaCreateDto';

export default function useAuth() {
    const [response, setResponse] = useState<VeterinariaResponseDto | undefined>(undefined);

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [error, setError] = useState<string>("");

    const login = async (loginDto: LoginDto) => {
        setError("");
        setIsLoading(true);

        const { contrasenna, correo } = loginDto;

        const validationResponse: validationResponse = await AuthValidator.validateLogin({ contrasenna, correo });
        if (!validationResponse.success) {
            setError(validationResponse.errors?.[0] || "Error desconocido")
            setIsLoading(false);
            return;
        }
        console.log(validationResponse)

        const response = await AuthService.login(loginDto);

        if (!response.success) {
            setIsLoading(false);
            setError(response.dataError || "Error desconocido")
            return;
        }

        setResponse(response.data);
    }

    const register = async (veterinaria:VeterinariaCreateDto) => {
        setError("");
        setIsLoading(true);

        const validationResponse: validationResponse = await AuthValidator.validateRegister(veterinaria)
        if (!validationResponse.success) {
            setError(validationResponse.errors?.[0] || "Error desconocido")
            setIsLoading(false);
            return;
        }
        console.log(validationResponse)

        const response = await AuthService.register(veterinaria)

        if (!response.success) {
            setIsLoading(false);
            setError(response.dataError || "Error desconocido")
            return;
        }

        setResponse(response.data);
    }

    return {response,isLoading,error,login,register}
}
