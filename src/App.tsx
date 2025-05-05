import { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import './ReactToastify.css'
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import React from 'react';
import Login from "./pages/Login";
import { UserProvider, useUser } from './context/UserContext';
import ProtectedRoute from './components/auth/ProjetedRoute';
import AdminHome from './pages/AdminHome';
import GestionClientes from './pages/GestionClientes';
import RegisterPage from './pages/RegisterPage';

function App() {

  return (

    <>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <UserProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/admin" />} />
            <Route path="/login" element={<Login />} />
            <Route path='/register' element = {<RegisterPage/>} />
            <Route element={<ProtectedRoute />}>
              <Route path="/admin" element={<AdminHome />} />
              <Route path="/admin/clientes" element={<GestionClientes/>} />
            </Route>

            <Route path="*" element={<h1>Seccion no encontrada</h1>} />
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </>

  );
}

export default App;
