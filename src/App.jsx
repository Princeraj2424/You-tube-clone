import React from 'react'
import Navbar from './components/Navbar'
import { Routes } from 'react-router-dom'
const App = () => {
 
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path ='/' exact element = {<Home/>} />
        <Route path ='/search ' element = {<Search/>} />
        <Route path = 'video/:id' element = {<PlayingVideo/>}/>   
      </Routes>
    </div>
  )
}

export default App
