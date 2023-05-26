import React, { useEffect, useState } from 'react';
import { BsFire } from 'react-icons/bs';
import { BiTimeFive } from 'react-icons/bi';
import { AiFillStar } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { TiArrowSortedUp } from 'react-icons/ti';
import { AiFillCaretDown } from 'react-icons/ai';
import '../index.css'
import { saveAs } from 'file-saver';
import { CSVLink } from 'react-csv';

function Home() {
  const [commodity, setCommodity] = useState([]);
  const [previousValues, setPreviousValues] = useState([]);
  const [previousCrypto, setPreviousCrypto] = useState([]);
  const [highlightedIndex, setHighlightedIndex] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const [showAllCry, setShowAllCry] = useState(false);
  const [csvData, setCsvData] = useState([]);
  const [csvDataCrypto, setCsvDataCrypto] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchQueryCrypto, setSearchQueryCrypto] = useState('');
  const [dCommodity, setDCommodity] = useState([]);
  const [dcrypto, setDCrypto] = useState([]);
  const [crypto, setCrypto] = useState([]);

  useEffect(()=>{
    const fetchCrypto = async () => {  
    try{
        const cres = await axios.get(
          'https://localhost:44372/api/Crypto'
        );
        const fetchedCrypto = cres.data; // Extract the data from the response
        setCrypto(fetchedCrypto);
        setCsvDataCrypto(fetchedCrypto);         
      }catch(err){
        console.log(err)
      }
    };
    fetchCrypto();
    
    const interval = setInterval(fetchCrypto, 1000);
    return () => clearInterval(interval);
   },[])

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
    const interval = setInterval(fetchData, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setPreviousValues(commodity);
    setPreviousCrypto(crypto);
  }, [commodity, crypto]);

  useEffect(() => {
    if (highlightedIndex !== null) {
      const timeout = setTimeout(() => {
        setHighlightedIndex(null);
      }, 1000);

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
    const filteredCrypto= crypto.filter((user)=>user.name.toLowerCase().includes(searchQueryCrypto.toLowerCase()));
    setDCommodity(filteredCommodity.slice(0, 10));
    setDCrypto(filteredCrypto.slice(0, 10));
  }, [commodity, crypto, searchQuery, searchQueryCrypto]);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };
  const handleSearchCrypto = (event) => {
    setSearchQueryCrypto(event.target.value);
  };
   
  const displayedCommodity = showAll ? commodity : commodity.slice(0, 10).filter((user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase())
    ); 
    const displayedCrypto = showAllCry ? crypto : crypto.slice(0, 10).filter((user) =>
      user.name.toLowerCase().includes(searchQueryCrypto.toLowerCase())
    );

  return (
    <>
      <div className="content-margin-overlap">
        <div className="container d-flex justify-content-between">
          <div className="text-center shadow p-5 text-left">
            <span className="text-align-top">
              <BsFire color="red" />
              Trending
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
              Recently Added
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
              Articles
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

        {/* crypto */}
        <div className="container mt-3">
        <h3>List Of Top Cryptos</h3>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Search by name"
              value={searchQueryCrypto}
              onChange={handleSearchCrypto}
            />
          </div>
        </div> 
        {/* crypto table */}
        <div className="container">
          <div className="mt-3">
            <table className="table table-striped">
              <thead>
                <tr> 
                  <th scope='col'>#</th>
                  <th scope='col' className="name-column">Name</th>
                  <th scope='col'>Price</th>
                  <th scope='col'>1 Hr</th>
                  <th scope='col'>24 Hr</th>
                  <th scope='col'>MarketCap</th>
                  <th scope='col'>Volume</th>
                </tr>
              </thead>
              <tbody className='hvrChnage'>
                {displayedCrypto.map((user, index) => {
                  const isHighlighted = highlightedIndex === index;
                  const color = isHighlighted ? 'green' : '';
                  const rowNumber = index + 1;
                  const hr = user.hour;
                  const dd = user.day;
                  const hrstiker = hr.includes('-') ? 'red' : 'green';
                  const ddsticker= dd.includes('-') ? 'red' : 'green';
                  return (
                    <tr key={index}>
                      <td className="name-column">{rowNumber}</td>                      
                      <td className="name-column">{user.name}</td>
                      <td style={{ color: color }}>{user.price}</td>
                      <td style={{ color: hrstiker }}>{user.hour}</td>
                      <td style={{ color: ddsticker }}>{user.day}</td>
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
       {/* search */}
       <div className="container mt-3">
        <h3>List Of Commodities</h3>
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
          <div className="mt-3">
            <table className="table table-striped">
              <thead>
                <tr> 
                  <th scope='col'>#</th>
                  <th scope='col' className="name-column">Name</th>
                  <th scope='col'>Month</th>
                  <th scope='col'>Last</th>
                  <th scope='col'>High</th>
                  <th scope='col'>Low</th>
                  <th scope='col'>Change</th>
                  <th scope='col'>Change %</th>
                  <th scope='col'>Time</th>
                </tr>
              </thead>
              <tbody className='hvrChnage'>
                {displayedCommodity.map((user, index) => {
                  const isHighlighted = highlightedIndex === index;
                  const color = isHighlighted ? 'lightgreen' : '';
                  const chngVal = user.change;
                  const chngvalPer = user.changePercentage;
                  const chngColor = chngVal.includes('+') ? 'green' : 'red';
                  const chngPerCol = chngvalPer.includes('+') ? 'green' : 'red';
                  const rowNumber = index + 1;
                  const stik =
                    chngColor == 'green' ? (
                      <TiArrowSortedUp />
                    ) : (
                      <AiFillCaretDown />
                    );
                  const stikper =
                    chngPerCol == 'green' ? (
                      <TiArrowSortedUp />
                    ) : (
                      <AiFillCaretDown />
                    );
                  return (
                    <tr key={index}>
                      <td className="name-column">{rowNumber}</td>                      
                      <td className="name-column">{user.name}</td>
                      <td>{user.month}</td>
                      <td style={{ backgroundColor: color }}>{user.last}</td>
                      <td>{user.high}</td>
                      <td>{user.low}</td>
                      <td style={{ color: chngColor }}>
                        {stik} {user.change}
                      </td>
                      <td style={{ color: chngPerCol }}>
                        {stikper}
                        {user.changePercentage}
                      </td>
                      <td>{user.time}</td>
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
      </div>
    </>
  );
}

export default Home;