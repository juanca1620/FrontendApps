import React from "react";
import { useState } from "react";
import VeterinariaCreateDto from "../dto/VeterinariaCreateDto";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const RegisterForm = ({ onSumit, loading }: { onSumit: (veterinaria: VeterinariaCreateDto) => void; loading: boolean }) => {
    
    const [ubicacion , setUbicacion] = useState<string> ("")
    const [correo, setCorreo] = useState<string> ("");
    const [contrasenna, setContrasenna] = useState<string>("");
    const [nombre,setNombre] = useState<string>("")
    const [apellido , setApellido] = useState<string>("")
    const [fechaNacimiento , setFechaNacimiento] = useState<Date>(new Date())
    const [cedula,setCedula] = useState<number>(0)

    const navigate = useNavigate()

        const handleKeyDownNumberVerificator = (event: React.KeyboardEvent<HTMLInputElement>) => {
            const key = event.key;
            const allowedKeys = ["Backspace", "Delete", "ArrowLeft", "ArrowRight", "Tab"];
            const isNumber = /^[0-9]$/.test(key);
          
            if (!isNumber && !allowedKeys.includes(key)) {
                event.preventDefault();
                toast.warn("Error: no puedes colocar letras en este campo");
            }
        };

        const crearDtoVeterinaria = ():VeterinariaCreateDto => {
            return {
                ubicacion,
                administrador:{
                    correo,
                    contrasenna,
                    nombre,
                    apellido,
                    fechaNacimiento,
                    cedula
                }
            }
        }

        const summitRegister = async () => {
            const veterinaria = crearDtoVeterinaria();
            onSumit(veterinaria);
        }

        const loginButtonHandler = ()=> {
            navigate("/login")
        }

    return (
        <form onSubmit={(e) => {
            e.preventDefault();
            summitRegister();
        }}>
         <div>
            <label htmlFor="ubicacion">Ubicacion</label>
            <input type="text" id="ubicacion" name="ubicacion" required onChange={(e) => setUbicacion(e.target.value)}/>
        </div>
        <div>
            <label htmlFor="correo">Correo</label>
            <input type="text" id="correo" name="correo" required onChange={(e) => setCorreo(e.target.value)}/>
        </div>
        <div>
            <label htmlFor="password">Contraseña</label>
            <input type="password" id="password" name="password" required onChange={(e) => setContrasenna(e.target.value)}/>
        </div>
        <div>
            <label htmlFor="nombre">Nombre</label>
            <input type="text" id="nombre" name="nombre" required onChange={(e) => setNombre(e.target.value)}/>
        </div>
        <div>
            <label htmlFor="apellido">Apellido</label>
            <input type="text" id="apellido" name="apellido" required onChange={(e) => setApellido(e.target.value)}/>
        </div>
        <div>
            <label htmlFor="fecha_nacimiento">Fecha de nacimiento</label>
            <input type="date" id="fecha_nacimiento" name="fecha_nacimiento" required onChange={(e) => setFechaNacimiento(new Date(e.target.value))}/>
        </div>
        <div>
            <label htmlFor="cedula">cedula</label>
            <input type="text" id="cedula" name="cedula" required onChange={(e) => setCedula(parseInt(e.target.value))} onKeyDown={handleKeyDownNumberVerificator}/>
        </div>
        <button type="submit" disabled={loading}>
            Enviar
        </button>
        <button onClick={loginButtonHandler}>Tienes una cuenta? Logueate</button>
        </form>
    );
}

export default RegisterForm;