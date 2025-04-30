import React from "react";

import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const LogOutButton = () => {
    const { eliminarUser } = useUser();
    const navigate = useNavigate();

    const handleLogout = () => {
        eliminarUser();
        toast.success("Sesión cerrada con éxito");
        navigate("/login", { replace: true });
    };

    return (
        <button onClick={handleLogout} className="btn btn-danger">
            Cerrar Sesión
        </button>
    );
}

export default LogOutButton;