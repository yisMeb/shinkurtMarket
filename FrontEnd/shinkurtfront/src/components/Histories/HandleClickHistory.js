import React, { useEffect, useState, useMemo } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./../../index.css";
import { useTable, usePagination } from "react-table";
import "./../../index.css";
import "./../Dashbord/Scenes/line";
import Line from "./../Dashbord/Scenes/line";

const HandleClickHistory = ({ nameClick }) => {
  const location = useLocation();
  console.log(typeof location.state);
  const [data, setData] = useState([]);

  let url = "";
  if (location.state.includes("Aluminium")) {
    url = "https://localhost:44372/GetALHistoryAll";
  } else if (location.state.includes("Brent Oil")) {
    url = "https://localhost:44372/GetBrentHistoryAll";
  } else if (location.state.includes("Copper")) {
    url = "https://localhost:44372/GetcprHistoryAll";
  } else if (location.state.includes("Crude Oil WTI")) {
    url = "https://localhost:44372/GetCrudeHistoryAll";
  } else if (location.state.includes("Fedder Cattle")) {
    url = "https://localhost:44372/GetFHistoryAll";
  } else if (location.state.includes("Gasoline RBOB")) {
    url = "https://localhost:44372/GetGasolHistoryAll";
  } else if (location.state.includes("Gold")) {
    url = "https://localhost:44372/api/GoldHistorical/GetGoldHistoryAll";
  } else if (location.state.includes("Live Cattle")) {
    url = "https://localhost:44372/GetcatHistoryAll";
  } else if (location.state.includes("London Coffee")) {
    url = "https://localhost:44372/GetLHistoryAll";
  } else if (location.state.includes("Lumber")) {
    url = "https://localhost:44372/GetLumberHistoryAll";
  } else if (location.state.includes("Natural Gas")) {
    url = "https://localhost:44372/GetNgassHistoryAll";
  } else if (location.state.includes("Oats")) {
    url = "https://localhost:44372/GetOTHistoryAll";
  } else if (location.state.includes("Orange Juice")) {
    url = "https://localhost:44372/GetOjuiceHistoryAll";
  } else if (location.state.includes("Silver")) {
    url = "https://localhost:44372/GetSilverHistoryAll";
  } else if (location.state.includes("US Corn")) {
    url = "https://localhost:44372/GetCORNHistoryAll";
  } else if (location.state.includes("US Wheat")) {
    url = "https://localhost:44372/GetWheatHistoryAll";
  } else if (location.state.includes("XAG/USD")) {
    url = "https://localhost:44372/GetXHistoryAll";
  } else if (location.state.includes("Zink")) {
    url = "https://localhost:44372/GetZHistoryAll";
  } else {
    url = "";
  }

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
  const datePriceData = data.map(({ date, price }) => ({
    x: date,
    y: price,
  }));
  const dateOpenData = data.map(({ date, open }) => ({
    x: date,
    y: open,
  }));
  const dateHighData = data.map(({ date, high }) => ({
    x: date,
    y: high,
  }));
  const dateLowData = data.map(({ date, low }) => ({
    x: date,
    y: low,
  }));
  const dateChangePercentageData = data.map(({ date, changePercentage }) => ({
    x: date,
    y: changePercentage,
  }));

  //find x and y values to display in the graph

  const columns = useMemo(
    () => [
      { Header: "Date", accessor: "date" },
      { Header: "Price", accessor: "price" },
      { Header: "Open", accessor: "open" },
      { Header: "High", accessor: "high" },
      { Header: "Low", accessor: "low" },
      { Header: "Volume", accessor: "volume" },
      { Header: "Change Percentage", accessor: "changePercentage" },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 20 },
    },
    usePagination
  );
  if (localStorage.getItem("token") === null) {
    window.location.reload(true);
    return <Link replace to="/signin" />;
  }

  return (
    <div className="content-margin-overlap container">
      <div className="header" style={{ marginTop: "120px" }}>
        <ul className="list-unstyled">
          <Link to="/dashboard">
            <li className="p-2 text-left">Dashboard</li>
          </Link>
        </ul>
      </div>
      <h2>Historical Data of {location.state}</h2>
      <div className="container">
        <div className="mt-2">
          <div>
            <div>
              <h4>Change Percentage of {location.state}</h4>
              <Line data={[{ id: "line", data: dateChangePercentageData }]} />
              <h4>Price Change of {location.state}</h4>
              <Line data={[{ id: "line", data: datePriceData }]} />
              <h4>Opening Price of {location.state}</h4>
              <Line data={[{ id: "line", data: dateOpenData }]} />
              <h4>High Price of {location.state}</h4>
              <Line data={[{ id: "line", data: dateHighData }]} />
              <h4>Low Price of {location.state}</h4>
              <Line data={[{ id: "line", data: dateLowData }]} />
            </div>
            <h3>Data Table</h3>
            <table className="table table-striped" {...getTableProps()}>
              <thead>
                {headerGroups.map((headerGroup) => (
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column) => (
                      <th {...column.getHeaderProps()}>
                        {column.render("Header")}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody {...getTableBodyProps()}>
                {page.map((row) => {
                  prepareRow(row);
                  return (
                    <tr {...row.getRowProps()}>
                      {row.cells.map((cell) => {
                        return (
                          <td {...cell.getCellProps()}>
                            {cell.render("Cell")}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {/* Pagination */}
            <div className="pagination">
              <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                {"<<"}
              </button>{" "}
              <button
                onClick={() => previousPage()}
                disabled={!canPreviousPage}
              >
                {"<"}
              </button>{" "}
              {pageOptions.map((pageNumber) => (
                <button
                  key={pageNumber}
                  onClick={() => gotoPage(pageNumber)}
                  className={pageNumber === pageIndex ? "active" : ""}
                >
                  {pageNumber + 1}
                </button>
              ))}
              <button onClick={() => nextPage()} disabled={!canNextPage}>
                {">"}
              </button>{" "}
              <button
                onClick={() => gotoPage(pageCount - 1)}
                disabled={!canNextPage}
              >
                {">>"}
              </button>{" "}
              <span>
                Page{" "}
                <strong>
                  {pageIndex + 1} of {pageOptions.length}
                </strong>{" "}
              </span>
              <span>
                | Go to page:{" "}
                <input
                  type="number"
                  defaultValue={pageIndex + 1}
                  onChange={(e) => {
                    const pageNumber = e.target.value
                      ? Number(e.target.value) - 1
                      : 0;
                    gotoPage(pageNumber);
                  }}
                  style={{ width: "50px" }}
                />
              </span>{" "}
              <select
                value={pageSize}
                onChange={(e) => {
                  setPageSize(Number(e.target.value));
                }}
              >
                {[10, 20, 30, 40, 50].map((pageSize) => (
                  <option key={pageSize} value={pageSize}>
                    Show {pageSize}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default HandleClickHistory;
