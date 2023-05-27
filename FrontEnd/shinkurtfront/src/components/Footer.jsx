import React from 'react'
import { Link } from 'react-router-dom'
import {FaHome} from 'react-icons/fa'
import {AiOutlineMail} from 'react-icons/ai'
import {AiFillPhone} from 'react-icons/ai'
import {FaMobile} from 'react-icons/fa'
import {BsFacebook} from 'react-icons/bs'
import {BsTelegram} from 'react-icons/bs'
import {BsTwitter} from 'react-icons/bs'
import {AiFillInstagram} from 'react-icons/ai'


function Footer() {
  return (
    <div className='content-margin-overlap my-5 position-relative'>
       <footer className="text-center shadow text-lg-start">
       <div className="container p-4 pb-0">
       <section className="">
       <div className="row">
       <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
       <h5 className="text-uppercase mb-4 font-weight-bold"> Shinkurt</h5>
            <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Facere, culpa corrupti. Provident eos odit asperiores ipsa molestias!
            </p>
       </div>
       <hr className="w-100 clearfix d-md-none"/>
       <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mt-3">
            <h5 className="text-uppercase mb-4 font-weight-bold">Products</h5>
            <p>
            <Link to="#" className='text-decoration-none'>Lorem-epsum</Link>
            </p>
            <p>
            <Link to="#" className='text-decoration-none'>Lorem-epsum</Link>
            </p>
            <p>
            <Link to="#" className='text-decoration-none'>Lorem-epsum</Link>
            </p>
            <p>
            <Link to="#" className='text-decoration-none'>Lorem-epsum</Link>
            </p>
        </div>
        <hr className="w-100 clearfix d-md-none"/>
        <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mt-3">
            <h5 className="text-uppercase mb-4 font-weight-bold"> Useful links</h5>
            <p>
            <Link to="#" className='text-decoration-none'>About</Link>
            </p>
            <p>
            <Link to="#" className='text-decoration-none'>Subscribe</Link>
            </p>
            <p>
            <Link to="#" className='text-decoration-none'>News</Link>
            </p>
          </div>
        <hr className="w-100 clearfix d-md-none" /> 
         <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mt-3">
            <h5 className="text-uppercase mb-4 font-weight-bold">Contact</h5>
            <p><i className="mr-3"> <FaHome/> </i> Addis Ababa, Ethiopia</p>
             <p><i className="mr-3"> <AiOutlineMail/></i> info@gmail.com</p>
            <p><i className="mr-3"> <AiFillPhone/> </i> +1121822548</p>
            <p><i className="mr-3"> <FaMobile/> </i> +251 9452859</p>
        </div>
       </div>
       </section>
       <hr className="my-3"/>
       <section className="p-3 pt-0">
        <div className="row d-flex align-items-center">
        <div className="col-md-7 col-lg-8 text-center text-md-start">
        <div className="p-3">
        © 2023 Copyright:
              <Link to='/home'>shinkurt.com</Link>
             </div>
            </div>
            <div className="col-md-5 col-lg-4 ml-lg-0 text-center text-md-end">
            <Link to='https://www.facebook.com/' className="btn btn-outline-primary btn-floating m-1" role="button"><BsFacebook size={25}/> </Link>
            <Link to='https://www.instagram.com/' className="btn btn-outline-primary btn-floating m-1" role="button"><AiFillInstagram size={25}/> </Link>
            <Link to='https://www.telegram.com/' className="btn btn-outline-primary btn-floating m-1" role="button"><BsTelegram size={25}/> </Link>
            <Link to='https://www.twitter.com/' className="btn btn-outline-primary btn-floating m-1" role="button"><BsTwitter size={25}/> </Link>
              </div>
              </div>
      </section>
       </div>
      </footer>
    </div>
  )
}
export default Footer