import { useState } from 'react';
import LoginDto from '../dto/LoginDto';

import AuthService from '../api/apiService/AuthService';
import AuthValidator from '../validator/validators/AuthValidator';
import validationResponse from '../validator/ValidatoResponse';
import { VeterinariaResponseDto } from '../dto/VeterinariaResponseDto';

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
            console.log("llego" + validationResponse.errors?.[0])
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

    return {response,isLoading,error,login}
}
