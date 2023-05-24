import React, { useEffect, useState } from 'react';
import { BsFire } from 'react-icons/bs';
import { BiTimeFive } from 'react-icons/bi';
import { AiFillStar } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useTable } from 'react-table';

function Home() {
  const [commodity, setCommodity] = useState([]);
  const [previousValues, setPreviousValues] = useState([]);
  const [highlightedIndex, setHighlightedIndex] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://localhost:44372/api/ScrappingPrice/GetScrappName');
        
        // Parse string values to float
        const parsedData = response.data.map(item => ({...item,
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
      const previousValue = previousValues[index] ? previousValues[index].last : null;
      const currentValue = user.last;

      if (previousValue !== null && previousValue > currentValue) {
        setHighlightedIndex(index);
      }
    });
  }, [commodity, previousValues]);


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
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Month</th>
                  <th>Last</th>
                  <th>High</th>
                  <th>Low</th>
                  <th>Change</th>
                  <th>Change %</th>
                  <th>Time</th>
                </tr>
              </thead>
              <tbody>
                {commodity.map((user, index) => {
                   const isHighlighted = highlightedIndex === index;
                   const color = isHighlighted ? 'red' : '';
                  const chngVal=user.change
                  const chngvalPer=user.changePercentage
                  const chngColor=chngVal.includes("+") ? 'green' :'red'
                  const chngPerCol=chngvalPer.includes("+") ? 'green' : 'red'
                  return (
                    <tr key={index}>
                      <td>{user.name}</td>
                      <td>{user.month}</td>
                      <td style={{backgroundColor: color }}>{user.last}</td>
                      <td>{user.high}</td>
                      <td>{user.low}</td>
                      <td style={{color: chngColor}}>{user.change}</td>
                      <td  style={{color: chngPerCol}}>{user.changePercentage}</td>
                      <td>{user.time}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;