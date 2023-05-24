import React, { useEffect, useState } from 'react';
import { BsFire } from 'react-icons/bs';
import { BiTimeFive } from 'react-icons/bi';
import { AiFillStar } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { TiArrowSortedUp } from 'react-icons/ti';
import { AiFillCaretDown } from 'react-icons/ai';
import '../index.css'

function Home() {
  const [commodity, setCommodity] = useState([]);
  const [previousValues, setPreviousValues] = useState([]);
  const [highlightedIndex, setHighlightedIndex] = useState(null);
  const [showAll, setShowAll] = useState(false);

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
  }, [commodity]);

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

  const displayedCommodity = showAll ? commodity : commodity.slice(0, 10);

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

        {/* Creating our Tables below */}
        <div className="container">
          <div className="mt-3">
            <h3>List of Commodities</h3>
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
            {!showAll && (
              <div className="text-left mb-1">
                <button className="btn btn-primary" onClick={() => setShowAll(true)}>
                  Show All
                </button>
              </div>
            )}
            {showAll && (
              <div className="text-left mb-1">
                <button className="btn btn-primary" onClick={() => setShowAll(false)}>
                  Show Less
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
