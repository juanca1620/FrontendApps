import { ClienteResponseDto } from "../dto/ClienteResponseDto";
import { useEffect, useState } from "react";
import ClienteValidator from "../validator/validators/ClienteValidator";
import ClienteService from "../api/apiService/ClienteService";
import ClienteCreateDto from "../dto/ClienteCreateDto";


export default function useClientes (veterinariaId: number):{
    clientes: ClienteResponseDto[];
    isLoading: boolean;
    error: string;
    crearCliente: (cliente: ClienteCreateDto) => Promise<ClienteResponseDto | null>;
  } {

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

    const crearCliente = async (cliente:ClienteCreateDto):Promise<ClienteResponseDto | null> => {
        setIsLoading(true);
        setError("")


        const validations = await ClienteValidator.validateCreateCliente(cliente);

        if(!validations.success){
            setIsLoading(false);
            setError(validations.errors![0])
            return null;
        }

        console.log(validations)

        const response = await ClienteService.crearCliente(cliente);

        console.log(response)
        

        if (!response.success) {
            setIsLoading(false);
            setError(response.dataError!)
            return null;
        }
        
        setIsLoading(false);
        obtenerClientes();
        return response.data!;
    }

    useEffect(() => {
        obtenerClientes();
    }, []);

    return { clientes, isLoading, error,crearCliente };

}