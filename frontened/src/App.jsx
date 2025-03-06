import Navbar from './components/Navbar'
import { useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import HomePage from './pages/HomePage'
import SignUpPage from './pages/SignUpPage'
import LoginPage from './pages/LoginPage'
import SettingsPage from './pages/SettingsPage'
import ProfilePage from './pages/ProfilePage'
import { useAuthstore } from './store/useAuthstore'
import {Loader} from "lucide-react"
import { Toaster } from 'react-hot-toast'


function App() {
  const {authUser,checkAuth,ischeckingAuth,onlineUsers} = useAuthstore()

  console.log("online users",onlineUsers)

  useEffect(() => { 
    checkAuth()
  }, [checkAuth]);

  console.log({authUser})

  if(ischeckingAuth && !authUser) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader className='size-9 animate-spin' />
      </div>
    )
  }
  

  return (
    <div className="App " >
      <Navbar className="fixed" />
      
      <Routes>
        <Route path="/" element={authUser ? <HomePage /> :<Navigate to="/login"/>} />
        <Route path="/signup" element={!authUser? <SignUpPage /> : <Navigate to="/"/>} />
        <Route path="/login" element={!authUser? <LoginPage /> : <Navigate to="/"/>} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/Profile" element={authUser ? <ProfilePage /> :<Navigate to="/login"/>} />  
      </Routes>
      <Toaster/>
    </div>
  )
}

export default App
