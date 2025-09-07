import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './Pages/Home'
import Doctors from './Pages/Doctors'
import Login from './Pages/Login'
import About from './Pages/About'
import Contact from './Pages/Contact'
import MyProfile from './Pages/MyProfile'
import MyAppoinment from './Pages/MyAppoinment'
import Appoinments from './Pages/Appoinments'
import Navbar from './Components/Navbar'

function App() {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/doctors/:speciality" element={<Doctors />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/myprofile" element={<MyProfile />} />
        <Route path="/my-appoinment" element={<MyAppoinment />} />
        <Route path="/appoinment/:doctorId" element={<Appoinments />} />

      </Routes>
    </>
  )
}

export default App
