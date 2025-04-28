import { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import './ReactToastify.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React from 'react';
import Login from "./pages/Login";

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
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
