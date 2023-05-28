import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { TiArrowSortedUp } from 'react-icons/ti';
import { AiFillCaretDown } from 'react-icons/ai';
import '../../index.css'
import { CSVLink } from 'react-csv';
import { useTranslation } from 'react-i18next';
import {AiOutlineStar} from 'react-icons/ai'

function Crypto() {
  const [showAllCry, setShowAllCry] = useState(false);
  const [csvDataCrypto, setCsvDataCrypto] = useState([]);
  const [searchQueryCrypto, setSearchQueryCrypto] = useState('');
  const [dcrypto, setDCrypto] = useState([]);
  const [crypto, setCrypto] = useState([]);
  const [highlightedIndex, setHighlightedIndex] = useState(null);
  const [activeRows, setActiveRows] = useState([]); // Track active state for each row

  useEffect(()=>{
    const fetchCrypto = async () => {  
    try{
        const cres = await axios.get(
          'https://localhost:44372/api/Crypto'
        );
        const fetchedCrypto = cres.data; // Extract the data from the response previousCrypto
        setCrypto(fetchedCrypto);
        setCsvDataCrypto(fetchedCrypto);
       }catch(err){
        console.log(err)
      }
    };
    fetchCrypto();
    
    const interval = setInterval(fetchCrypto, 10000);
    return () => clearInterval(interval);
   },[])

  useEffect(() => {
    if (highlightedIndex !== null) {
      const timeout = setTimeout(() => {
        setHighlightedIndex(null);
      }, 2000);

      return () => clearTimeout(timeout);
    }
  }, [highlightedIndex]);
  

  useEffect(() => {
    const filteredCrypto= crypto.filter((user)=>user.name.toLowerCase().includes(searchQueryCrypto.toLowerCase()));
    setDCrypto(filteredCrypto.slice(0, 10));
  }, [crypto, searchQueryCrypto]);

  const handleSearchCrypto = (event) => {
    setSearchQueryCrypto(event.target.value);
  };
  const displayedCrypto = showAllCry ? crypto : crypto.slice(0, 10).filter((user) =>
  user.name.toLowerCase().includes(searchQueryCrypto.toLowerCase())
);
/* initializing localization */
const { t, i18n } = useTranslation();

/* handle click favorite crypto */

const handleClickFav = (index) => {

  /* check if user is signin here*/


  /* select the rows as favorites */
  setActiveRows((prevActiveRows) => {
    const updatedActiveRows = [...prevActiveRows];
    updatedActiveRows[index] = !updatedActiveRows[index];
    return updatedActiveRows;
  });
};

  return (
    <>
       {/* crypto */}
       <div className="container content-margin-overlap">
        <h3>{t('List of Top Cryptocurrencies')}</h3>
        <div className="container">
          <div className="mt-2">
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Search by name"
              value={searchQueryCrypto}
              onChange={handleSearchCrypto}
            />
          </div>
            <table className="table">
              <thead>
                <tr> 
                  <th scope='col'>Fav</th>
                  <th scope='col'>#</th>
                  <th scope='col' className="name-column">{t('Name')}</th>
                  <th scope='col'>{t('Price')}</th>
                  <th scope='col'>{t('1 Hr')}</th>
                  <th scope='col'>{t('24 Hr')}</th>
                  <th scope='col'>{t('Marketcap')}</th>
                  <th scope='col'>{t('Volume')}</th>
                </tr>
              </thead>
              <tbody className='hvrChnage'>
                {displayedCrypto.map((user, index) => {
                  const isActive = activeRows[index] || false;
                  const isHighlighted = highlightedIndex === index;
                  const color = isHighlighted ? 'green' : '';
                  const rowNumber = index + 1;
                  const hr = user.hour;
                  const dd = user.day;
                  const hrstiker = hr.includes('-') ? 'red' : 'green';
                  const ddsticker= dd.includes('-') ? 'red' : 'green';
                  const hstik = hrstiker=='red' ? <AiFillCaretDown /> : <TiArrowSortedUp />
                  const dstik = ddsticker == 'red' ? <AiFillCaretDown /> : <TiArrowSortedUp />
                  return (
                    <tr key={index}>
                      <button
                        className="border-0"
                        onClick={() => handleClickFav(index)}
                        style={{ color: isActive ? 'orange' : 'initial' }}
                      >
                        <AiOutlineStar />
                      </button>
                      <td className="name-column">{rowNumber}</td>                      
                      <td className="name-column"> <Link to='/history' state={user.name}  className='link-info text-decoration-none'> {user.name} </Link></td>
                      <td style={{ color: color }}>{user.price}</td>
                      <td style={{ color: hrstiker }}> {hstik} {user.hour}</td>
                      <td style={{ color: ddsticker }}>{dstik} {user.day}</td>
                      <td>{user.marketCap}</td>
                      <td >{user.volume}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>             
           {/* Download Button  crypto*/}
           <div className='container d-flex justify-content-between'>
           {!showAllCry && (
              <div className="text-left mb-1">
                <button className="btn btn-primary" onClick={() => setShowAllCry(true)}>
                  Show All
                </button>
              </div>
            )}
            {showAllCry && (
              <div className="text-left mb-1">
                <button className="btn btn-secondary" onClick={() => setShowAllCry(false)}>
                  Show Less
                </button>
              </div>
            )}
            <div className="text-left mb-3">
               {csvDataCrypto.length > 0 && (
               <CSVLink data={csvDataCrypto} filename="top_Crypto_data.csv">
                 <button className="btn btn-outline-success">Download</button>
              </CSVLink>
             )}
           </div>
           </div>
           </div>
         </div>
        </div>
    </>
  )
}
export default Crypto