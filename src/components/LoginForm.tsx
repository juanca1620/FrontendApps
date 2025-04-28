import React from "react";
import { useState } from "react";


const loginForm = ({onSumit , loading}) => {
    
    const [correo, setCorreo] = useState<string> ("");
    const [contrasenna, setContrasenna] = useState<string>("");

    return (
        <form onSubmit={(e) => {
            e.preventDefault();  // ✋ Detiene el refresco automático
            onSumit({ correo, contrasenna }); // 👉 Ahora sí mandamos los datos
        }}>
        <div>
            <label htmlFor="correo">Correo</label>
            <input type="text" id="correo" name="correo" required onChange={(e) => setCorreo(e.target.value)}/>
        </div>
        <div>
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" required onChange={(e) => setContrasenna(e.target.value)}/>
        </div>
        <button type="submit" disabled={loading}>
            Enviar
        </button>
        </form>
    );
}

export default loginForm;