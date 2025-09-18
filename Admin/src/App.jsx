import { useContext } from 'react'
import './App.css'
import Login from './Pages/Login'
import { AdminContext } from './Context/AdminContext'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './Components/Navbar'
import Sidebar from './Components/Sidebar'
import { Routes, Route } from 'react-router-dom'
import Dashboard from './Pages/Admin/Dashboard'
import AllAppoinment from './Pages/Admin/AllAppoinment'
import AddDoctors from './Pages/Admin/AddDoctors'
import DoctorList from './Pages/Admin/DoctorList'

function App() {
  const { aToken } = useContext(AdminContext);

  return aToken ? (
    <div className="min-h-screen flex flex-col">
      <ToastContainer />
      <Navbar />

      {/* Sidebar + Main Content in flex row */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <main className="flex-1 bg-gray-50 p-6 overflow-y-auto">
          <Routes>
            <Route path="/" element={<></>} />
            <Route path="/admin-dashboard" element={<Dashboard />} />
            <Route path="/all-appoinments" element={<AllAppoinment />} />
            <Route path="/add-doctor" element={<AddDoctors />} />
            <Route path="/doctor-list" element={<DoctorList />} />
          </Routes>
        </main>
      </div>
    </div>
  ) : (
    <>
      <Login />
      <ToastContainer />
    </>
  )
}

export default App
