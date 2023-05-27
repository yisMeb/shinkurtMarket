import React from 'react'
import { Route,Routes } from 'react-router-dom'
import Header from "./components/Header"
import Home from "./components/Home"
import About from './components/About'
import Contact from './components/Contact'
import Footer from "./components/Footer"
import Crypto from './components/Markets/Crypto'
import Commodity from './components/Markets/Commodity'
import Signin from './components/Signin'
import Signup from './components/Signup'
import UserDashboard from './components/Dashbord/UserDashboard'
import HandleClickHistory from './components/Histories/HandleClickHistory'

function App(){
   
    return(
        <>
            <Header />
            <div className='container'>
                <Routes>
                    <Route path='/' element={<Home/>}/>
                    <Route path='/about' element={<About/>}/>
                    <Route path='/contact' element={<Contact/>}/>
                    <Route path='/crypto' element={<Crypto/>}/>
                    <Route path='/Commodity' element={<Commodity/>}/>
                    <Route path='/signin' element={<Signin/>}/>
                    <Route path='/signup' element={<Signup/>}/>
                    <Route path='/dashboard' element={<UserDashboard/>}/>
                    <Route path='/history' element={<HandleClickHistory/>}/>
                
                </Routes>
            </div>
            <Footer />
        </>
    )
}
export default App