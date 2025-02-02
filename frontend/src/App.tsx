
import './App.css'
import Home from './components/Home'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Topbar } from './components/Topbar'
import { Players } from './components/Players'
import { Signup } from './components/Signup'
import { AddTeam } from './components/AddTeam'
import Signin from './components/Signin'
import { MyTeams } from './components/MyTeams'

import Addplayer from './components/AddPlayer'
import Contact from './components/Contact'
import Tournaments from './components/Tournaments'
import Test from './components/Test'
import AddCoins from './components/AddCoins'


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
    <Route path='/add-players' element = {<Addplayer></Addplayer>}></Route>
    <Route path='/contact' element = {<Contact></Contact>}></Route>
    <Route path='/tournaments' element = {<Tournaments></Tournaments>}></Route>
    <Route path='/test' element = {<Test/>}></Route>
    <Route path='/add-coins' element = {<AddCoins/>}></Route>
    
      
      
      
    </Routes>
    </BrowserRouter>
      
    </>
  )
}

export default App
