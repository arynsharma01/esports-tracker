import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './components/Home'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Topbar } from './components/Topbar'
import { Players } from './components/Players'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    
    <BrowserRouter>
    <div>{<Topbar></Topbar>}</div>
    <Routes>
      <Route path='/' element = {<Home></Home>}></Route>
      <Route path='/player' element = {<Players></Players>}></Route>
      
    </Routes>
    </BrowserRouter>
      
    </>
  )
}

export default App
