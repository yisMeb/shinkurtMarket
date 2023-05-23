import React, { useEffect, useState } from 'react'
import {BsFire} from 'react-icons/bs'
import {BiTimeFive} from 'react-icons/bi'
import {AiFillStar} from 'react-icons/ai'
import { Link } from 'react-router-dom'
import axios from 'axios'

function Home() {
      /* Connect to ASP.NET CORE WEB API bellow */
      useEffect(()=>{
           axios.get('https://localhost:44372/api/ScrappingPrice/GetScrappName')
              .then((response)=>{
                console.log(response.data)
              })
          }, [])
   
  return (

     <>
     <div className="content-margin-overlap">
         <div className="container d-flex justify-content-between">
            <div className="text-center shadow p-5 text-left">
             <span className='text-align-top'><BsFire color="red"/>Trending</span>
             <ol>
                  <li>
                     <Link to="/">XAU_USD</Link>
                 </li>
                 <li>
                     <Link to="/">Gold</Link>
                 </li>
              </ol>
              
            </div>
            <div className="text-center shadow p-5 d-flex flex-column">
              <span className='font-weight-bold'><BiTimeFive/>Recently Added</span>
              <ol>
                  <li>
                     <Link to="/">XAU_USD</Link>
                 </li>
                 <li>
                     <Link to="/">Gold</Link>
                 </li>
              </ol>
              
            </div>
            <div className="text-center shadow p-5">
              <span className='font-weight-bold' ><AiFillStar  style={{ color: "#FCD611" }} />Articles</span>
              <ol>
                  <li>
                     <Link to="/">Buy STock</Link>
                 </li>
                 <li>
                     <Link to="/">Gold Price</Link>
                 </li>
              </ol>
              
            </div>
            </div>
            
         {/* Creating our Tables bellow */}
            
      </div>
     </>
  )
}

export default Home
