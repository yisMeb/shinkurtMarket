import React, { useEffect, useState } from "react";
import axios from "axios";
import "./../../index.css";
import "./Scenes/line";
import Line from "./Scenes/line";
import moment from "moment";
import Button from "react-bootstrap/Button";

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

const ChartComponent = () => {
  const [startDate, setStartDate] = useState([]);
  const [endDate, setEndDate] = useState([]);

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  // Rest of the component code...

  return (
    <div>
      <label>
        Start Date:
        <input type="date" value={startDate} onChange={handleStartDateChange} />
      </label>

      <label>
        End Date:
        <input type="date" value={endDate} onChange={handleEndDateChange} />
      </label>

      {/* Render the chart using the selected date range */}
    </div>
  );
};

const UserDashboard = () => {
  const [data, setData] = useState([]);
  const [startDate, setStartDate] = useState([]);
  const [endDate, setEndDate] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://localhost:44372/api/GoldHistorical/GetGoldHistoryAll"
        );
        const parsedData = response.data.map((item) => ({
          g_id: parseFloat(item.g_id),
          //date: moment(item.date, "dd/mm/yyyy").toDate(),
          date: item.date,
          price: parseFloat(item.price),
          open: parseFloat(item.open),
          high: parseFloat(item.high),
          low: parseFloat(item.low),
          last: parseFloat(item.last),
          volume: parseFloat(item.volume),
          changePercentage: parseFloat(item.changePercentage),
        }));

        setData(parsedData);
        //console.log("hereeeeee");
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const datePriceData = data.map(({ date, price }) => ({
    x: date,
    y: price,
  }));
  console.log(datePriceData);

  const dateChangePercentageData = data.map(({ date, changePercentage }) => ({
    x: date,
    y: changePercentage,
  }));
  //select date for veiewing data
  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  const dateChangePercentageData2 = data
    .filter(({ Date }) => {
      // Assuming Date is a string in the format 'YYYY-MM-DD'
      if (startDate && endDate) {
        return Date >= startDate && Date <= endDate;
      }
      if (startDate) {
        return Date >= startDate;
      }
      if (endDate) {
        return Date <= endDate;
      }
      return true; // No date filter applied
    })
    .map(({ Date, changePercentage }) => ({
      x: Date,
      y: changePercentage,
    }));

  console.log(dateChangePercentageData2);
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
