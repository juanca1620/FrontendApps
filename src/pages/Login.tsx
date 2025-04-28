import React, { use, useEffect } from "react";
import LoginForm from "../components/LoginForm";
import useAuth from "../hooks/useAuth";
import LoginDto from "../dto/LoginDto";
import { toast } from "react-toastify";

function Login() {

    const { login, isLoading, error, response } = useAuth();

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
        }
        return () => {
            toast.dismiss(toastId);
        }
    }, [response])

    const onSumit = async (loginDto: LoginDto) => {

        await login(loginDto);


    }
    return (
        <>
            <LoginForm onSumit={onSumit} loading={isLoading} />
        </>);
}

export default Login;