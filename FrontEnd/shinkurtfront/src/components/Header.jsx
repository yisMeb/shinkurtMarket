import { Link} from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import '../index.css'
import {BsMoonStarsFill} from 'react-icons/bs'
import {CgSun} from 'react-icons/cg'

function Header() {
      const [theme,setTheme]=useState(document.body.dataset.bsTheme);
      const [navtheme,setNavtheme]=useState("navbar-dark bg-dark");
       useEffect(()=>{
        document.body.dataset.bsTheme=theme
       },[theme])
  return (
    <header>
        <nav className={navtheme + " navbar fixed-top navbar-expand-lg border-bottom p-3 shadow-lg mb-5"}>
        <div className="container">
           <Link to='/home' className="navbar-brand mb-0 h1 give-space-mr">
            <img className="d-inline-block align-top" src='../../onion.png' alt='logo' width={30} height={30}></img>
            Shinkurt</Link>  
          <button type='button' data-bs-toggle='collapse' data-bs-target="#navbarNav" className="navbar-toggler" aria-controls='navbarNav' aria-expanded='false' aria-label='Toggle navigation'>
            <span className="navbar-toggler-icon"></span>
          </button>
        <div className="collapse navbar-collapse" id='navbarNav'>
            <ul className="navbar-nav">
              <li className="nav-item active">
                 <Link to='/home' className="nav-link active">
                  Home
                 </Link>
              </li>    
              <li className="nav-item dropdown">
                 <Link to="#" className="nav-link dropdown-toggle" id='navbarDropdown' role='button' data-bs-toggle="dropdown" aria-expanded='false'>
                  Catagory
                 </Link>
                 <ul className='dropdown-menu' aria-labelledby='navbarDropdown'>
                    <li><Link to='/forex'className="dropdown-item">Forex</Link></li>
                    <li><Link to='/crypto'className="dropdown-item">crypto</Link></li>
                    <li><Link to='/localmarket'className="dropdown-item">Local Markets</Link></li>
                 </ul>
              </li>
              <li className="nav-item active">
                 <Link to="/about" className="nav-link">
                  About
                 </Link>
              </li>
              <li className="nav-item active">
                 <Link to="/contact" className="nav-link">
                  Contact
                 </Link>
              </li>
            </ul>
            <div className="give-space-mr">
              <Link to='/signin' type='button' className="btn btn-outline-primary active btn-space-giver">
              LogIn
            </Link>
            <Link to='/signup' type='button'  className="btn btn-outline-primary btn-space-giver">
              SignUp
            </Link>
            </div>  

    <div className='form-check form-switch mx-4'>
      {theme==="dark" ? <BsMoonStarsFill size={30}/> : <CgSun size={30}/>}
      <input
         className='form-check-input p-2'
         type="checkbox"
         role='switch'
         id='flexSwitchCheckChecked'
         onClick={()=>{
           var elem=document.body
           setTheme(elem.dataset.bsTheme==="dark" ? "white" : "dark")
           setNavtheme(theme==="dark" ? "navbar-light bg-light" : "navbar-dark bg-dark")
          }}
      />
    </div>  
      </div>
    </div>
    </nav> 
  </header>
  )
}
export default Header