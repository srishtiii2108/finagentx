import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/home.jsx'
import Login from './pages/Login.jsx'
import EmailVerify from './pages/EmailVerify.jsx'
import ResetPassword from './pages/ResetPassword.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Portfolio from './pages/Portfolio.jsx' // <-- Naya Portfolio Page Import
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <div>
      <ToastContainer theme="dark" />
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/email-verify' element={<EmailVerify/>}/>
        <Route path='/reset-password' element={<ResetPassword/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/portfolio' element={<Portfolio/>}/> {/* <-- Naya Route */}
      </Routes>
    </div>
  )
}

export default App