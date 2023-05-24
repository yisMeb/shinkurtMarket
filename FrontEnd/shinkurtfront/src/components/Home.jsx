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
    // Function to fetch data from the API
    const fetchData = async () => {
      try {
        const response = await axios.get('https://localhost:44372/api/ScrappingPrice/GetScrappName');
        console.log(response.data);
        setCommodity(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
    setPreviousValues(commodity);
    const interval = setInterval(fetchData, 10000);//evert 10 second
    return () => clearInterval(interval);
  },[], [commodity]);

  useEffect(() => {
    if (highlightedIndex !== null) {
      const timer = setTimeout(() => {
        setHighlightedIndex(null);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [highlightedIndex]);

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
                    
                  return (
                    <tr key={index}>
                      <td>{user.name}</td>
                      <td>{user.month}</td>
                      <td >
                        {user.last}
                      </td>
                      <td>{user.high}</td>
                      <td>{user.low}</td>
                      <td>{user.change}</td>
                      <td>{user.changePercentage}</td>
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