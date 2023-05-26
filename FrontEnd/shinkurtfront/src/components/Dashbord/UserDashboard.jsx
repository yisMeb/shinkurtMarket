import React, { useEffect, useState } from "react";
import axios from "axios";
import "./../../index.css";
import "./Scenes/line";
import Line from "./Scenes/line";

const Sidebar = () => {
  return (
    //a div in bootstrap that is below the header

    <div className="sidebar" id="navbarNav">
      <ul className="sidebar-menu">
        <li>
          <a href="#">Sign Out</a>
        </li>
        <li>
          <a href="#">Compare</a>
        </li>
        <li>
          <a href="#">View History</a>
        </li>
        <li>
          <a href="#">Download Data</a>
        </li>
      </ul>
    </div>
  );
};

const UserDashboard = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://localhost:44372/api/GoldHistorical/GetGoldHistoryAll"
        );
        const parsedData = response.data.map((item) => ({
          g_id: parseFloat(item.g_id),
          date: Date.parse(item.date),
          price: parseFloat(item.price),
          open: parseFloat(item.open),
          high: parseFloat(item.high),
          low: parseFloat(item.low),
          last: parseFloat(item.last),
          volume: parseFloat(item.volume),
          changePercentage: parseFloat(item.changePercentage),
        }));

        setData(parsedData);
        console.log(parsedData);
      } catch (err) {
        console.log(err);
      }
    };
  }, []);

  const datePriceData = data.map(({ Date, Price }) => ({
    x: Date,
    y: Price,
  }));

  const dateChangePercentageData = data.map(({ Date, changePercentage }) => ({
    x: Date,
    y: changePercentage,
  }));

  // <Line data={[{ id: "line", data: datePriceData }]} />
  //  <Line data={[{ id: "line", data: dateChangePercentageData }]} />

  return (
    <div className="admin-dashboard">
      <Sidebar />
      <div className="content">
        <h1>Line Graph Examples</h1>
        <h2>Date vs Price</h2>
        <Line data={[{ id: "line", data: datePriceData }]} />
        <h2>Date vs Change Percentage</h2>
        <Line data={[{ id: "line", data: dateChangePercentageData }]} />
      </div>
    </div>
  );
};

export default UserDashboard;
