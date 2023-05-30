import React from 'react';
import { BsFire } from 'react-icons/bs';
import { BiTimeFive } from 'react-icons/bi';
import { AiFillStar } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import Crypto from './Markets/Crypto'
import Commodity from './Markets/Commodity';
import '../index.css'
import { useTranslation } from 'react-i18next';
import {MdOutlineDoubleArrow} from 'react-icons/md'
import { useNavigate } from 'react-router-dom';

function Home() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const handlePremium=()=>{
    if (!localStorage.getItem('token') || !localStorage.getItem('email')) {
      navigate('/signin', { replace: true });
    }else{
      return navigate('/subscribe', { replace: true });
    }
  }
  return (
    <>
      <div className="content-margin-overlap">
        <div className="container d-flex justify-content-between">
          <div className="text-center shadow p-5 text-left">
            <span className="text-align-top">
              <BsFire color="red" />
             {t('Trending')}
            </span>
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
            <span className="font-weight-bold">
              <BiTimeFive />
              {t('Recently Added')}
            </span>
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
            <span className="font-weight-bold">
              <AiFillStar style={{ color: '#FCD611' }} />
              {t('Articles')}
            </span>
            <ol>
              <li>
                <Link to="/">Buy Stock</Link>
              </li>
              <li>
                <Link to="/">Gold Price</Link>
              </li>
            </ol>
          </div>
        </div>
        {/* Subscribe */}
        <button type="button" 
        onClick={handlePremium}
        className='btn btn-outline-primary mt-4 ml-1 shadow-sm btn-sm p-3 col-xs-10 text-left'>
        {t('TRY OUR SUBSCRIPTION')} {<MdOutlineDoubleArrow size={20}/>}
        </button>
        {/* Crypto */}
        { <Crypto/> }
        {/* Commodity */}
        {<Commodity/>}
        </div>
    </>
  );
}

export default Home;