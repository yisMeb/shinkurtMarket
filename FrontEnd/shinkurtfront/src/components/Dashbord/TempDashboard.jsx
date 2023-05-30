import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Commodity from "./../Markets/Commodity";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

const UserDashboard = () => {
  const [selectedLink, setSelectedLink] = useState(null);
  //logout function is working
  const handleLogout = async (e) => {
    console.log("logout");
    e.preventDefault();
    try {
      //its working
      const response = await axios.post("https://localhost:44372/Logout");

      console.log(response.status);

      // remove token and email from local storage
      localStorage.removeItem("token");
      localStorage.removeItem("email");
    } catch (error) {
      // Handle error
      console.error(error);
    }
    return <Navigate replace to="/home" />;
  };

  const handleLinkClick = (link) => {
    setSelectedLink(link);
  };

  const renderContent = () => {
    switch (selectedLink) {
      case "fulltable": {
        return <GraphComponent />;
      }
      case "favtable":
        return <TableComponent />;
      case "dashboard":
        return <DashboardComponent />;
      default:
        return <Commodity />;
    }
  };

  return (
    <div className="d-flex" style={{ marginTop: "30px" }}>
      {/* Sidebar */}
      <div className="sidebar" style={{ marginTop: "120px" }}>
        <ul className="list-unstyled">
          <li
            className="text-center p-4 text-left"
            onClick={() => handleLinkClick("fulltable")}
          >
            Full Table
          </li>
          <li
            className="text-center p-4 text-left"
            onClick={() => handleLinkClick("favtable")}
          >
            Favourite
          </li>
          <li
            className="text-center p-4 text-left"
            onClick={() => handleLinkClick("dashboard")}
          >
            Dashboard
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="container">
        {/* Central Area */}
        <div className="central-area">{renderContent()}</div>
      </div>
    </div>
  );
};

const GraphComponent = () => {
  return <Commodity />;
};

const TableComponent = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        const parsedData = response.data
          .map((item) => ({
            g_id: parseFloat(item.g_id),
            //date: moment(item.date, "dd/mm/yyyy").toDate(),
            date: item.date,
            price: parseFloat(item.price),
            open: parseFloat(item.open),
            high: parseFloat(item.high),
            low: parseFloat(item.low),
            volume: parseFloat(item.volume),
            changePercentage: parseFloat(item.changePercentage),
          }))
          .reverse();

        setData(parsedData);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);
  //https://localhost:44372/FavoriteNames

  return <div>Table Component</div>;
};

const DashboardComponent = () => {
  return <div>Dashboard Component</div>;
};

export default UserDashboard;

{
  /* 


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
        </div>
*/
}
