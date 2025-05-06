import React, { useEffect } from "react";
import LogOutButton from "../components/LogOutButton";
import UsersTable from "../components/UsersTable";
import useClientes from "../hooks/useClientes";
import { useUser } from "../context/UserContext";
import { toast } from "react-toastify"
import UserCrudForm from "../components/UserCrudForm";
import ClienteCreateDto from "../dto/ClienteCreateDto";
import { ClienteResponseDto } from "../dto/ClienteResponseDto";
import ClienteUpdateDto from "../dto/ClienteUpdateDto";

const GestionClientes = () => {

    const { user } = useUser();

    const veterinariaId = user!.id;
    const { clientes, isLoading, error, crearCliente , eliminarCliente ,buscarCliente,editarCliente} = useClientes(veterinariaId)

    useEffect(() => {
        toast.info("Estamos trayendo los clientes de tu veterinaria, por favor paciencia");
    }, []);

    useEffect(() => {

        let toastId;

        if (isLoading) {
            toastId = toast.loading("Cargando tu peticion ...", {
                autoClose: false
            })
        }

        return () => {
            if (toastId) {
                toast.dismiss(toastId);
            }
        }
    }, [isLoading])

    useEffect(() => {

        let toastId;

        if (error) {
            toastId = toast.error(error)
        }

        return () => {
            if (toastId) {
                toast.dismiss(toastId);
            }
        }
    }, [error])

    const createCliente = async (cliente: ClienteCreateDto) => {
        const clienteF = await crearCliente(cliente);
        if (clienteF != null) {
            toast.success("Cliente creado con exito")
        }
    }

    const deleteCliente = async (id : number) => {
        const clienteF = await eliminarCliente(id);
        console.log(clienteF)
        if (clienteF != null) {
            toast.success("Cliente eliminado con exito")
        }
    }

    const getCliente = async (id : number):Promise<ClienteResponseDto | null> => {
        const clienteF = await buscarCliente(id);
        return clienteF;
    }

    const updateCliente = async (cliente : ClienteUpdateDto) => {
        const clienteF = await editarCliente(cliente);
        if (clienteF != null) {
            toast.success("Cliente editado con exito")
        }
        return clienteF;
    }


    return (
        <div className="container">
            <h1>Gestión de Clientes</h1>
            <p>Aquí puedes gestionar los datos de tus clientes.</p>
            <UserCrudForm veterinariaId={user!.id} createCliente={createCliente} deleteCliente={deleteCliente} findCliente={getCliente} updateCliente={updateCliente} ></UserCrudForm>
            <UsersTable clientes={clientes}></UsersTable>
            <LogOutButton />
        </div>
    );
}

export default GestionClientes;