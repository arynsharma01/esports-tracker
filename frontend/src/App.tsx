
import './App.css'
import Home from './components/Home'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Topbar } from './components/Topbar'
import { Players } from './components/Players'
import { Signup } from './components/Signup'
import { AddTeam } from './components/AddTeam'
import Signin from './components/Signin'
import { MyTeams } from './components/MyTeams'


function App() {
  

  return (
    <>
    
    <BrowserRouter>
    <div>{<Topbar></Topbar>}</div>
    <Routes>
    
    <Route path='/' element = {<Home></Home>}></Route>
    <Route path='/players' element = {<Players></Players>}></Route>
    <Route path='/signup' element = {<Signup></Signup>}></Route>
    <Route path='/signin' element = {<Signin></Signin>}></Route>
    <Route path='/add/team' element = {<AddTeam></AddTeam>}></Route>
    <Route path='/view/myteams' element = {<MyTeams></MyTeams>}></Route>
    
      
      
      
    </Routes>
    </BrowserRouter>
      
    </>
  )
}

export default App
