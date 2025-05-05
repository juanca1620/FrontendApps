import React, { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import useAuth from "../hooks/useAuth";
import { useUser } from "../context/UserContext";
import VeterinariaCreateDto from "../dto/VeterinariaCreateDto";
import RegisterForm from "../components/RegisterForm";

export default function () {

    const navigate = useNavigate();

    const { register, isLoading, error, response } = useAuth();

    const { guardarUser } = useUser();
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

    useEffect(() => {
        let toastId;

        if (response) {
            toastId = toast.success("Bienvenido a la app de veterinaria")
            guardarUser(response);
            navigate("/admin")
        }

        return () => {
            toast.dismiss(toastId);
        }
    }, [response])

    const onSummit = async (veterinaria: VeterinariaCreateDto) => {
        await register(veterinaria);
    }

    return (
        <><h1> Registro </h1>
        <RegisterForm loading={isLoading} onSumit={onSummit}></RegisterForm></>
    )
}