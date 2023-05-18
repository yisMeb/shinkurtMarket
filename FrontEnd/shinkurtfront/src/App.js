import React from 'react'
import { Route,Routes } from 'react-router-dom'
import Header from "./components/Header"
import Home from "./components/Home"
import About from './components/About'
import Contact from './components/Contact'
import Footer from "./components/Footer"
import Forex from './components/Markets/Forex'
import Crypto from './components/Markets/Crypto'
import LocalMarket from './components/Markets/LocalMarket'
import Signin from './components/Signin'
import Signup from './components/Signup'

function App(){
    
    return(
        <>
            <Header />
            <div className='container'>
                <Routes>
                    <Route path='/home' element={<Home/>}/>
                    <Route path='/about' element={<About/>}/>
                    <Route path='/contact' element={<Contact/>}/>
                    <Route path='/forex' element={<Forex/>}/>
                    <Route path='/crypto' element={<Crypto/>}/>
                    <Route path='/localmarket' element={<LocalMarket/>}/>
                    <Route path='/signin' element={<Signin/>}/>
                    <Route path='/signup' element={<Signup/>}/>
                </Routes>
            </div>
            <Footer />
        </>
    )
}
export default App