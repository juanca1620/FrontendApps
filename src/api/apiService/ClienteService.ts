import ApiResponse from "../ApiResponse";
import axiosInstance from "../AxiosInstance";
import { ClienteResponseDto } from "../../dto/ClienteResponseDto";
import ClienteCreateDto from "../../dto/ClienteCreateDto";
import ClienteUpdateDto from "../../dto/ClienteUpdateDto";

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

const crearCliente = async (cliente:ClienteCreateDto):Promise<ApiResponse<ClienteResponseDto>> => {
    try {
        const response = await axiosInstance.post<ClienteResponseDto>(`api/cliente`,cliente);
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
const editarCliente = async (cliente:ClienteUpdateDto):Promise<ApiResponse<ClienteResponseDto>> => {
    try {
        const response = await axiosInstance.put<ClienteResponseDto>(`api/cliente`,cliente);
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
const eliminarCliente = async (id:number) : Promise<ApiResponse<ClienteResponseDto>> => {
    try {
        const response = await axiosInstance.delete<ClienteResponseDto>(`api/cliente/${id}`);
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

const obtenerCliente = async (id:number) : Promise<ApiResponse<ClienteResponseDto>> => {
    try {
        const response = await axiosInstance.get<ClienteResponseDto>(`api/cliente/${id}`);
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

export default {obtenerTodosLosClientesPorVeterinariaId,crearCliente,eliminarCliente,obtenerCliente , editarCliente}