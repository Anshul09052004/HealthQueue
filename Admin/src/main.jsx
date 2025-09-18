import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import AppContextProvider from './Context/AppContext.jsx'
import AdminContextProvider from './Context/AdminContext.jsx'
import DoctorContextProvider from './Context/DoctorContext.jsx'

createRoot(document.getElementById('root')).render(




  <BrowserRouter>
    <AdminContextProvider>
      <DoctorContextProvider>
        <AppContextProvider>
          <App />
        </AppContextProvider>
      </DoctorContextProvider>
    </AdminContextProvider>
  </BrowserRouter>
)
