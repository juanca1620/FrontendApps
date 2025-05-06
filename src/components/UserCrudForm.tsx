import React, { useState } from "react";
import { toast } from "react-toastify";
import { ClienteResponseDto } from "../dto/ClienteResponseDto";
import ClienteCreateDto from "../dto/ClienteCreateDto";
import ClienteUpdateDto from "../dto/ClienteUpdateDto";

export default function UserCrudForm(props: {
    veterinariaId: number,
    createCliente: (cliente: ClienteCreateDto) => Promise<void>,
    deleteCliente: (id: number) => Promise<void>,
    findCliente: (id: number) => Promise<ClienteResponseDto | null>,
    updateCliente: (cliente: ClienteUpdateDto) => Promise<ClienteResponseDto | null>
}) {

    const { veterinariaId, createCliente, deleteCliente, findCliente, updateCliente } = props;

    const [id, setId] = useState<number>();
    const [nombre, setNombre] = useState<string>("");
    const [apellido, setApellido] = useState<string>("");
    const [fechaNacimiento, setFechaNacimiento] = useState<Date>();
    const [cedula, setCedula] = useState<number>();

    const handleKeyDownNumberVerificator = (event: React.KeyboardEvent<HTMLInputElement>) => {
        const key = event.key;
        const allowedKeys = ["Backspace", "Delete", "ArrowLeft", "ArrowRight", "Tab"];
        const isNumber = /^[0-9]$/.test(key);

        if (!isNumber && !allowedKeys.includes(key)) {
            event.preventDefault();
            toast.warn("Error: no puedes colocar letras en este campo");
        }
    };

    const validarClienteCreate = (): boolean => {
        if (!nombre.trim()) {
            toast.warn("El campo 'Nombre' no puede estar vacío");
            return false;
        }
        if (!apellido.trim()) {
            toast.warn("El campo 'Apellido' no puede estar vacío");
            return false;
        }
        if (!fechaNacimiento) {
            toast.warn("Debe seleccionar una 'Fecha de Nacimiento'");
            return false;
        }
        if (!cedula || cedula <= 0) {
            toast.warn("El campo 'Cédula' debe ser un número válido");
            return false;
        }
        return true;
    };

    const validarClienteUpdate = (): boolean => {
        if (!id || id <= 0) {
            toast.warn("Se necesita un ID válido para editar");
            return false;
        }
        if (!nombre.trim()) {
            toast.warn("El campo 'Nombre' no puede estar vacío");
            return false;
        }
        if (!apellido.trim()) {
            toast.warn("El campo 'Apellido' no puede estar vacío");
            return false;
        }
        if (!fechaNacimiento) {
            toast.warn("Debe seleccionar una 'Fecha de Nacimiento'");
            return false;
        }
        return true;
    };

    const validarClienteDelete = (): boolean => {
        if (!id || id <= 0) {
            toast.warn("El campo 'id' debe ser un número válido");
            return false;
        }
        return true;
    };

    const construirClienteCreate = (): ClienteCreateDto => {
        return {
            nombre: nombre,
            apellido: apellido,
            fechaNacimiento: fechaNacimiento!,
            cedula: cedula!,
            veterinariaId: veterinariaId
        };
    };

    const construirClienteUpdate = (): ClienteUpdateDto => {
        return {
            id: id!,
            nombre: nombre,
            apellido: apellido,
            fechaNacimiento: fechaNacimiento!
        };
    };

    const handleClickBuscar = async () => {
        if (!id || id <= 0) {
            toast.warn("Debe ingresar un ID válido para buscar");
            return;
        }
        const cliente = await findCliente(id);
        if (cliente != null) {
            setNombre(cliente.nombre);
            setApellido(cliente.apellido);
            setFechaNacimiento(new Date(cliente.fechaNacimiento));
            setCedula(cliente.cedula);
        }

    };

    const handleClickGuardar = async () => {
        if (!validarClienteCreate()) return;

        await createCliente(construirClienteCreate());
        limpiarCampos();
    };

    const handleClickActualizar = async () => {
        if (!validarClienteUpdate()) return;

        await updateCliente(construirClienteUpdate());

        limpiarCampos();

    };

    const handleClickEliminar = async () => {
        if (!validarClienteDelete()) return;

        await deleteCliente(id!);
        limpiarCampos();

    };

    const limpiarCampos = () => {
        setId(undefined);
        setNombre("");
        setApellido("");
        setFechaNacimiento(undefined);
        setCedula(undefined);
    };

    return (
        <>
            <div>
                <label htmlFor="id">Id</label>
                <input
                    type="text"
                    id="id"
                    name="id"
                    value={id || ''}
                    onKeyDown={handleKeyDownNumberVerificator}
                    onChange={(e) => setId(parseInt(e.target.value) || undefined)}
                />
                <button onClick={handleClickBuscar}>Buscar Cliente</button>
            </div>
            <div>
                <label htmlFor="nombre">Nombre</label>
                <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="apellido">Apellido</label>
                <input
                    type="text"
                    id="apellido"
                    name="apellido"
                    value={apellido}
                    onChange={(e) => setApellido(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="fecha">Fecha Nacimiento</label>
                <input
                    type="date"
                    id="fecha"
                    name="fecha"
                    value={fechaNacimiento ? fechaNacimiento.toISOString().split('T')[0] : ''}
                    onChange={(e) => setFechaNacimiento(new Date(e.target.value))}
                />
            </div>
            <div>
                <label htmlFor="cedula">Cédula</label>
                <input
                    type="text"
                    id="cedula"
                    name="cedula"
                    onKeyDown={handleKeyDownNumberVerificator}
                    value={cedula || ''}
                    onChange={(e) => setCedula(parseInt(e.target.value) || undefined)}
                />
            </div>

            <button onClick={handleClickGuardar}>Guardar Cliente</button>
            <button onClick={handleClickActualizar}>Actualizar Cliente</button>
            <button onClick={handleClickEliminar}>Eliminar Cliente</button>
            <button onClick={limpiarCampos}>Limpiar Formulario</button>
        </>
    );
}