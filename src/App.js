import React, { useEffect, useState } from "react";
import brandLogo from "../src/assets/BrandLogo.svg";
import searchIcon from "../src/assets/SearchIcon.svg";
import locationIcon from "../src/assets/LocationIcon.svg";
import statusIcon from "../src/assets/StatusIcon.svg";
import warningIcon from "../src/assets/WarningIcon.svg";
import actionIcon from "../src/assets/ActionIcon.svg";
import arrowLeftIcon from "../src/assets/ArrowLeftIcon.svg";
import previousIcon from "../src/assets/PreviousIcon.svg";
import nextIcon from "../src/assets/NextIcon.svg";
import arrowRightIcon from "../src/assets/ArrowRightIcon.svg"

import axios from "axios";



function App() {
  const [camerasList, setCamerasList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const token = "4ApVMIn5sTxeW7GQ5VWeWiy";


  const totalPages = Math.ceil(camerasList.length / rowsPerPage);

  const startRow = (currentPage - 1) * rowsPerPage + 1;
  const endRow = Math.min(currentPage * rowsPerPage, camerasList.length);

  const paginatedData = camerasList.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handleRowsPerPageChange = (e) => {
    setRowsPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to first page when rows per page changes
  };

  // Handle pagination controls
  const handleFirstPage = () => setCurrentPage(1);
  const handlePreviousPage = () => currentPage > 1 && setCurrentPage(currentPage - 1);
  const handleNextPage = () => currentPage < totalPages && setCurrentPage(currentPage + 1);
  const handleLastPage = () => setCurrentPage(totalPages);


  const fetchCameras = async () => {
    try {
      const response = await axios.get(
        "https://api-app-staging.wobot.ai/app/v1/fetch/cameras",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const result = response.data.data
      console.log("cameras", result);
      setCamerasList(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchCameras();
  }, []);

  return (
    <div className="App">
      {/* Logo Container */}
      <div className="brand-logo-container">
        <img src={brandLogo} alt="brandLogo" />
      </div>

      {/* Header Container */}
      <div className="header">
        <div className="header-title">
          <h6 className="header-title-top">Cameras</h6>
          <h6 className="header-title-bottom">Manage your cameras here.</h6>
        </div>
        <div className="search-box-container">
          <input className="search-box" placeholder="search" />
          <img src={searchIcon} alt="searchIcon" className="search-icon" />
        </div>
      </div>

      {/* Filter Container */}
      <div className="filters">
        <div className="filter-location-container">
          <img src={locationIcon} alt="location-icon" className="location-icon" />
          <select className="filter-location">
            <option value="" disabled selected hidden>Location</option>
            <option value="new-york">New York</option>
            <option value="london">London</option>
          </select>
        </div>
        <div className="filter-status-container">
          <img src={statusIcon} alt="status-icon" className="status-icon" />
          <select className="filter-status">
            <option value="" disabled selected hidden>Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      {/** Table */}
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>
                <input type="checkbox" />
              </th>
              <th>NAME</th>
              <th>HEALTH</th>
              <th>LOCATION</th>
              <th>RECORDER</th>
              <th>TASKS</th>
              <th>STATUS</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.length ? paginatedData.map((rowData) => (
              <tr key={rowData._id}>
                <td><input type="checkbox" /></td>
                <td>
                  <div className="name">
                    <div className="name-top">
                      <div className="name-status" style={{ backgroundColor: rowData.current_status === "Online" ? "#029262" : "#DC3545" }}></div>
                      <div className="name-text">{rowData.name}</div>
                      {rowData.hasWarning && <img src={warningIcon} alt="warning-icon" className="name-warning" />}
                    </div>
                  </div>
                  <div className="name-bottom">
                    <span>sherwinwilliams@wobot.ai</span>
                  </div>

                </td>
                <td>Healthy</td>
                <td>
                  <span className="location">{rowData.location}</span>
                </td>
                <td>
                  <span className="recorder">{rowData.recorder !== "" ? rowData.recorder : 'N/A'}</span>
                </td>
                <td>
                  <span className="tasks">{rowData.tasks} Tasks</span>
                </td>
                <td>
                  <div className="status" style={{ backgroundColor: rowData.status === "Active" ? '#0292621A' : "#F0F0F0" }}>
                    <span className="status-text"
                      style={{
                        color: rowData.status === "Active" ? '#029262' : "#545454"
                      }}>
                      {rowData.status === 'Active' ? "Active" : "Inactive"}
                    </span>
                  </div>
                </td>
                <td>
                  <div className="action">
                    <img src={actionIcon} alt="action-icon" />
                  </div>
                </td>
              </tr>
            )) : null}
          </tbody>
        </table>
      </div>

      {/** Table pagination */}
      <div className="table-pagination">

        <div className="rows-per-page">
          <select value={rowsPerPage} onChange={handleRowsPerPageChange} className="rows-per-page-option">
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </div>

        <div className="row-range">
          <span className="row-range-text">
            {startRow}-{endRow} of {camerasList.length}
          </span>
        </div>

        <div className="pagination-controls">
          <img src={arrowLeftIcon} onClick={handleFirstPage} />
          <img src={previousIcon} onClick={handlePreviousPage} />
          <img src={nextIcon} onClick={handleNextPage} />
          <img src={arrowRightIcon} onClick={handleLastPage} />
        </div>

      </div>
    </div>
  );
}

export default App;

