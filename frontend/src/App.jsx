 import React, { useEffect } from 'react'
import { Routes , Route, Link, Navigate} from 'react-router-dom'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import SignUpPage from './pages/SignUpPage'
import LoginPage from './pages/LoginPage'
import SettingPage from './pages/SettingPage'
import ProfilePage from './pages/ProfilePage'
import { UseAuthStore } from './Store/UseAuthStore(zustand)'
import { Loader } from 'lucide-react'
import {Toaster} from "react-hot-toast"
import { UsethemeStore } from './Store/UsethemeStore(zustand)'

 //we have also install cors in backend so because frontend and backend are on diffrent port so cors is used to link them 
const App = () => {
   const {theme} = UsethemeStore;
  
  
  const {isCheckingAuth,checkAuth,authUser,onlineUsers} = UseAuthStore();
console.log({onlineUsers})
  
  useEffect(() => {
     
    checkAuth();
   
    }, [checkAuth]);
    

     if (isCheckingAuth && !authUser) return (
      <div className='flex justify-center items-center h-screen'>
        <Loader className="size-15 animate-spin" />
      </div>

    )
 
     
  return (
 console.log(theme),
    <div data-theme="theme">
    <Navbar/>
    <Routes>
      <Route path='/' element={authUser ? <HomePage/>:  <Navigate to="/login"/>}/>
      <Route path='/signup' element={!authUser ? <SignUpPage/>: <Navigate to="/"/>}/>
      <Route path='/login' element={!authUser ?<LoginPage/>: <Navigate to="/" />}/>
      <Route path='/settings' element={<SettingPage/>}/>
      <Route path='/profile' element={authUser ? <ProfilePage/>: <Navigate to="/login"/>}/>
    </Routes>
    <Toaster/>
    </div>
  )
}

export default App
