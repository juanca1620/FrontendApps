import React, { useState } from "react";
import { toast } from "react-toastify";
import { ClienteResponseDto } from "../dto/ClienteResponseDto";
import { darkScrollbar } from "@mui/material";
import ClienteCreateDto from "../dto/ClienteCreateDto";

export default function UserCrudForm(props: { veterinariaId: number , createCliente}) {


    const { veterinariaId , createCliente} = props

    const [id, setId] = useState<number>();

    const [nombre, setNombre] = useState<string>();

    const [apellido, setApellido] = useState<string>()

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

    const validarCliente = (): boolean => {
        // Validar nombre
        if (nombre == undefined || nombre?.trim() === "") {
            toast.warn("El campo 'Nombre' no puede estar vacío");
            return false;
        }

        // Validar apellido
        if (apellido == undefined || apellido?.trim() === "") {
            toast.warn("El campo 'Apellido' no puede estar vacío");
            return false;
        }

        // Validar fecha de nacimiento
        if (fechaNacimiento == undefined) {
            toast.warn("Debe seleccionar una 'Fecha de Nacimiento'");
            return false;
        }

        // Validar cédula
        if (cedula === undefined || cedula <= 0) {
            toast.warn("El campo 'Cédula' debe ser un número válido");
            return false;
        }

        return true;
    };

    const construirClienteCreate = (): ClienteCreateDto => {
        return {
            nombre: nombre!,
            apellido: apellido!,
            fechaNacimiento: fechaNacimiento!,
            cedula: cedula!,
            veterinariaId: veterinariaId!
        };
    };

    const handleClickGuardar = () => {
        const clienteCreate = construirClienteCreate();
        const validationResponse = validarCliente();
        if(validationResponse){
            createCliente(clienteCreate);
        }
    }

    return (
        <>
            <div>
                <label htmlFor="id">Id</label>
                <input type="text" id="id" name="id" onKeyDown={handleKeyDownNumberVerificator} onChange={(e) => setId(parseInt(e.target.value))} />
            </div>
            <div>
                <label htmlFor="nombre">Nombre</label>
                <input type="text" id="nombre" name="nombre" onChange={(e) => setNombre((e.target.value))} />
            </div>
            <div>
                <label htmlFor="apellido">Apellido</label>
                <input type="text" id="apellido" name="nombre" onChange={(e) => setApellido((e.target.value))} />
            </div>
            <div>
                <label htmlFor="fecha">Fecha Nacimiento</label>
                <input type="date" id="fecha" name="nombre" onChange={(e) => setFechaNacimiento(new Date(e.target.value))} />
            </div>
            <div>
                <label htmlFor="cedula">cedula</label>
                <input type="text" id="cedula" name="nombre" onKeyDown={handleKeyDownNumberVerificator} onChange={(e) => setCedula(parseInt(e.target.value))} />
            </div>
            <button onClick={(e) => handleClickGuardar()}>
                Guardar Cliente
            </button>
        </>
    )
}
