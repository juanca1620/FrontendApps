import React from "react";
import { useNavigate} from "react-router-dom";
import LogOutButton from "../components/LogOutButton";

const AdminHome = () => {
    const navigate = useNavigate();

    const handleClienteButtonClick = () => {
        navigate("/admin/clientes");
    };

    return (
        <div className="container">
            <h1>Bienvenido a la página de administración</h1>
            <p>Aquí puedes gestionar los datos de tu veterinaria.</p>
            <button onClick={handleClienteButtonClick}>Ir a la seccion de clientes</button>
            <LogOutButton />
        </div>
    );
}

export default AdminHome;