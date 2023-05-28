import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

function HandleClickHistory({nameClick}) {
    const location=useLocation()
    console.log(typeof location.state)
     
  return (
    <div className="content-margin-overlap container">
        <h2>Check if SignedIn</h2>
      {  
         location.state.includes("Gold") ? <h1>golddd</h1> : <h1>not gold</h1>
      }
    </div>
  )
}

export default HandleClickHistory
