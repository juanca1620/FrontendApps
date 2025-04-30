import ApiResponse from "../ApiResponse";
import axiosInstance from "../AxiosInstance";
import { ClienteResponseDto } from "../../dto/ClienteResponseDto";

const obtenerTodosLosClientesPorVeterinariaId = async (veterinariaId: number): Promise<ApiResponse<ClienteResponseDto[]>> => {
    try {
        const response = await axiosInstance.get<ClienteResponseDto[]>(`api/cliente/veterinaria/${veterinariaId}`);
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

export default {obtenerTodosLosClientesPorVeterinariaId}