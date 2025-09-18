import { useState } from 'react'
import './App.css'
import Login from './Pages/Login'
import { useContext } from 'react'
import { AdminContext } from './Context/AdminContext'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './Components/Navbar'

function App() {
  const { aToken } = useContext(AdminContext);
  return aToken ? (
    <div>
      <ToastContainer />
      <Navbar />
    </div>
  ) : (
    <>
      <Login />
      <ToastContainer />
    </>

  )
}

export default App
