import axiosInstance from "../AxiosInstance";
import LoginDto from "../../dto/LoginDto";
import ApiResponse from "../ApiResponse";
import { VeterinariaResponseDto } from "../../dto/VeterinariaResponseDto";
import VeterinariaCreateDto from "../../dto/VeterinariaCreateDto";

const login = async (data: LoginDto): Promise<ApiResponse<VeterinariaResponseDto>> => {
    try {
        const response = await axiosInstance.post<VeterinariaResponseDto>('/api/veterinaria/login', data);
        return {
            status: response.status,
            data: response.data,
            success: true
        }
    } catch (error) {
        console.log(error)
        return {
            status: error.response.status,
            dataError: error.response?.data.mensaje || 'Error de conexión',
            success: false
        };
    }
}

const register = async (data: VeterinariaCreateDto): Promise<ApiResponse<VeterinariaResponseDto>> => {
    try {
        const response = await axiosInstance.post<VeterinariaResponseDto>('/api/veterinaria/register', data);
        return {
            status: response.status,
            data: response.data,
            success: true
        }
    } catch (error) {
        console.log(error)
        return {
            status: error.response.status,
            dataError: error.response?.data.mensaje || 'Error de conexión',
            success: false
        };
    }
}
export default {
    login,
    register
}