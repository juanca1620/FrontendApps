import React, { useEffect } from "react";
import LogOutButton from "../components/LogOutButton";
import UsersTable from "../components/UsersTable";
import useClientes from "../hooks/useClientes";
import { useUser } from "../context/UserContext";
import {toast} from "react-toastify"

const GestionClientes = () => {
    
    const { user } = useUser();

    const veterinariaId = user!.id;
    const { clientes, isLoading, error } = useClientes(veterinariaId);

    useEffect(() => {
        toast.info("Estamos trayendo los clientes de tu veterinaria, por favor paciencia");
      }, []);

    console.log(clientes);

    return (
        <div className="container">
            <h1>Gestión de Clientes</h1>
            <p>Aquí puedes gestionar los datos de tus clientes.</p>
            <UsersTable clientes = {clientes}></UsersTable>
            <LogOutButton />
        </div>
    );
}

export default GestionClientes;