import { ClienteResponseDto } from "../dto/ClienteResponseDto";
import { useEffect, useState } from "react";
import ClienteService from "../api/apiService/ClienteService";


export default function useClientes (veterinariaId: number) {
    const [clientes, setClientes] = useState<ClienteResponseDto[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");


    const obtenerClientes = async () => {
        setIsLoading(true);
        setError("");
        const response = await ClienteService.obtenerTodosLosClientesPorVeterinariaId(veterinariaId);
        console.log(response)
        if (!response.success) {
            setError(response.dataError || "Error desconocido")
            setIsLoading(false);
            return;
        }
        setClientes(response.data || []);
        setIsLoading(false);
    }

    useEffect(() => {
        obtenerClientes();
    }, []);

    return { clientes, isLoading, error };

}