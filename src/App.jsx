import React from 'react'
import Navbar from './components/Navbar'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './components/Home'
import Search from './components/Search'
import History from './components/History'
import PlayingVideo from './components/PlayingVideo'
import SignIn from './components/SignIn'
import ProtectedRoute from './components/ProtectedRoute'
import { useAuth } from './Context/AuthContext'
import Loading from './loader/Loading'

const App = () => {
const { loading } = useAuth();
const location = useLocation();
const isSignInPage = location.pathname === '/signin';
  return (
    <div className="h-screen overflow-hidden">
      {loading && <Loading/>}
      {!isSignInPage && <Navbar />}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path ='/search' element = {<Search/>} />
        <Route path='/history' element={<ProtectedRoute><History /></ProtectedRoute>} />
        <Route path='/video/:id' element={<PlayingVideo />} />
        <Route path='/signin' element={<SignIn />} />
      </Routes>
    </div>
  )
}

export default App
