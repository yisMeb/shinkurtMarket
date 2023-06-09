import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { TiArrowSortedUp } from 'react-icons/ti';
import { AiFillCaretDown } from 'react-icons/ai';
import { CSVLink } from 'react-csv';
import { useTranslation } from 'react-i18next';
import {AiOutlineStar} from 'react-icons/ai'

function Commodity() {
  const [commodity, setCommodity] = useState([]);
  const [previousValues, setPreviousValues] = useState([]);
  const [highlightedIndex, setHighlightedIndex] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const [csvData, setCsvData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [dCommodity, setDCommodity] = useState([]);
  const { t, i18n } = useTranslation();
  const [activeRowsCom, setActiveRowsCom] = useState([]); // Track active state for each row
  const [fav, setFav] = useState("");
  const [FavAddFaild,setAddFavFaild]=useState(false);
  const [FavRemFaild,setRemFavFaild]=useState(false);

  const datetoday= new Date();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://localhost:44372/api/ScrappingPrice/GetScrappName'
        );

        // Parse string values to float
        
        const parsedData = response.data.map((item) => ({
          ...item,
          last: parseFloat(item.last),
          low: parseFloat(item.low),
          high: parseFloat(item.high),
        }));
        setCommodity(parsedData);
        setCsvData(parsedData);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
    const interval = setInterval(fetchData, 10000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setPreviousValues(commodity);
  }, [commodity]);

  useEffect(() => {
    if (highlightedIndex !== null) {
      const timeout = setTimeout(() => {
        setHighlightedIndex(null);
      }, 2000);

      return () => clearTimeout(timeout);
    }
  }, [highlightedIndex]);

  useEffect(() => {
    commodity.forEach((user, index) => {
      const previousValue = previousValues[index]
        ? previousValues[index].last
        : null;
      const currentValue = user.last;

      if (previousValue !== null && previousValue > currentValue) {
        setHighlightedIndex(index);
      }
    });
  }, [commodity, previousValues]);

  useEffect(() => {
    const filteredCommodity = commodity.filter((user) =>user.name.toLowerCase().includes(searchQuery.toLowerCase()));
    setDCommodity(filteredCommodity.slice(0, 10));
  }, [commodity, searchQuery]);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };
   
  const displayedCommodity = showAll ? commodity : commodity.slice(0, 10).filter((user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    const navigate = useNavigate();
    let email2 =null
    let emailWithQuotes=null
    const handleClickFav = (index, user) => {
      /* check if user is signin here*/
        if(!localStorage.getItem('token')){
          navigate('/signin', { replace: true });
        }else{  
      /* select the rows as favorites */
      setActiveRowsCom((prevActiveRows) => {
        const updatedActiveRows = [...prevActiveRows];
        updatedActiveRows[index] = !updatedActiveRows[index];
        const isActive = updatedActiveRows[index] || false;
        setFav(user.name)
         emailWithQuotes = localStorage.getItem('email');
         email2 = emailWithQuotes.replace(/^['"](.+(?=['"]$))['"]$/, '$1');
        return updatedActiveRows;
      });
     } };
return (
    <>
    <div className="container container content-margin-overlap">
        <h3>{t('List of Commodities')}</h3>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Search by name"
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>
        </div>           
        {/* Creating our Tables commodity below */}
        <div className="container">
          <div className="mt-2">
            <table className="table">
              <thead>
                <tr>
                  <th scope='col'>Fav</th>
                  <th scope='col'>#</th>
                  <th scope='col' className="name-column">{t('Name')}</th>
                  <th scope='col'>{t('Month')}</th>
                  <th scope='col'>{t('Last')}</th>
                  <th scope='col'>{t('High')}</th>
                  <th scope='col'>{t('Low')}</th>
                  <th scope='col'>{t('change')}</th>
                  <th scope='col'>{t('change %')}</th>
                  <th scope='col'>{t('Time')}</th>
                </tr>
              </thead>
              <tbody className='hvrChnage'>
                {displayedCommodity.map((user, index) => {
                  const isActive = activeRowsCom[index] || false;
                  const isHighlighted = highlightedIndex === index;
                  const color = isHighlighted ? 'lightgreen' : '';
                  const chngVal = user.change;
                  const chngvalPer = user.changePercentage;
                  const chngColor = chngVal.includes('+') ? 'green' : 'red';
                  const chngPerCol = chngvalPer.includes('+') ? 'green' : 'red';
                  const rowNumber = index + 1;
                  const stik = chngColor == 'green' ? ( <TiArrowSortedUp />  ) : (<AiFillCaretDown />);
                  const stikper = chngPerCol == 'green' ? ( <TiArrowSortedUp /> ) : (<AiFillCaretDown /> );
                  //  
                const handleColorChange = async (isActive, user) => {
                  let re=null
                  let rr=null 
                  if (!isActive) {
                    try {
                     re = await axios.post("https://localhost:44372/Favorite", {
                     favoriteName: user.name,
                     email: email2
                     }); 
                     if(!re){
                      //mot added
                      setAddFavFaild(true)
                     }
                     } catch (error) {
                      console.log(error);
                     }
                     }else{
                     try {
                     rr= await axios.post("https://localhost:44372/FavoriteRemove", {
                     favoriteName: user.name,
                     email: email2
                     });
                     if(!rr){
                      //not removed
                      setRemFavFaild(true)
                     }
                     } catch (error) {
                     console.log(error);
                    }
                    }
                   };
                  return (
                    <tr key={index}>
                      <button
                        className="border-0"
                        onClick={() => {handleClickFav(index, user); 
                            handleColorChange(isActive, user);
                            }}
                        style={{ color: isActive ? 'orange' : 'initial' }}
                      >
                        <AiOutlineStar />
                      </button>
                      <td className="name-column">{rowNumber}</td>                      
                     <td className="name-column"><Link to='/history' state={user.name} className='link-info text-decoration-none'> {user.name}</Link></td>
                      <td>{user.month}</td>
                      <td style={{ backgroundColor: color }}>{user.last}</td>
                      <td >{user.high}</td>
                      <td>{user.low}</td>
                      <td style={{ color: chngColor }}>
                        {stik} {user.change}
                      </td>
                      <td style={{ color: chngPerCol }}>
                        {stikper}
                        {user.changePercentage}
                      </td>
                      <td>{user.time == null ? datetoday.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }) : user.time}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className='container d-flex justify-content-between'>
            {!showAll && (
              <div className="text-left mb-1">
                <button className="btn btn-primary" onClick={() => setShowAll(true)}>
                  Show All
                </button>
              </div>
            )}
            {showAll && (
              <div className="text-left mb-1">
                <button className="btn btn-secondary" onClick={() => setShowAll(false)}>
                  Show Less
                </button>
              </div>
            )}
           {/* Download Button */}
            <div className="text-left mb-3">
               {csvData.length > 0 && (
               <CSVLink data={csvData} filename="commodity_data.csv">
                 <button className="btn btn-outline-success">Download</button>
              </CSVLink>
             )}
           </div>
         </div> 
        </div>
        </div>
    </>
  )
}
export default Commodity