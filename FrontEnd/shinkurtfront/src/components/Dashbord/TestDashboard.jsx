import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const UserDashboard = () => {
  const [selectedLink, setSelectedLink] = useState(null);

  const handleLinkClick = (link) => {
    setSelectedLink(link);
  };

  const renderContent = () => {
    switch (selectedLink) {
      case "graph":
        return <GraphComponent />;
      case "table":
        return <TableComponent />;
      case "dashboard":
        return <DashboardComponent />;
      default:
        return <div>No content selected</div>;
    }
  };

  return (
    <div>
      {/* Sidebar */}
      <div className="sidebar">
        <ul>
          <li onClick={() => handleLinkClick("graph")}>Graph</li>
          <li onClick={() => handleLinkClick("table")}>Table</li>
          <li onClick={() => handleLinkClick("dashboard")}>Dashboard</li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="container">
        {/* Header */}
        <div className="header">
          <h1>User Dashboard</h1>
          <div className="buttons">
            <button className="btn btn-primary">Button 1</button>
            <button className="btn btn-secondary">Button 2</button>
            {/* Add more buttons if needed */}
          </div>
          <div className="logout">
            <a href="#">Logout</a>
          </div>
        </div>

        {/* Central Area */}
        <div className="central-area">{renderContent()}</div>
      </div>
    </div>
  );
};

const GraphComponent = () => {
  return <div>Graph Component</div>;
};

const TableComponent = () => {
  return <div>Table Component</div>;
};

const DashboardComponent = () => {
  return <div>Dashboard Component</div>;
};

export default UserDashboard;
