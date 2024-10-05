import React, { useEffect, useState } from "react";
import brandLogo from "../src/assets/BrandLogo.svg";
import searchIcon from "../src/assets/SearchIcon.svg";
import locationIcon from "../src/assets/LocationIcon.svg";
import statusIcon from "../src/assets/StatusIcon.svg";
import warningIcon from "../src/assets/WarningIcon.svg";
import actionIcon from "../src/assets/ActionIcon.svg";

import axios from "axios";



function App() {
  // let rowData =
  // {
  //   "name": "Camera 1",
  //   "location": "Denver, CO",
  //   "recorder": "Denver Recorder",
  //   "tasks": "4",
  //   "status": "Active",
  //   "_id": "66d1b0684bd38a998b414a93",
  //   "id": 1,
  //   "current_status": "Online",
  //   "health": {
  //     "cloud": "A",
  //     "device": "A",
  //     "_id": "6700117fe7f0220e065420fa",
  //     "id": "6700117fe7f0220e065420fa"
  //   },
  //   "hasWarning": true
  // }


  const [camerasList, setCamerasList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = "4ApVMIn5sTxeW7GQ5VWeWiy";

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
            {camerasList.length ? camerasList.map((rowData) => (
              <tr>
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
                  <span className="recorder">{rowData.recorder !== "" ?rowData.recorder : 'N/A' }</span>
                </td>
                <td>
                  <span className="tasks">{rowData.tasks} Tasks</span>
                </td>
                <td>
                  <div className="status" style={{ backgroundColor: rowData.status === "Active" ? '0292621A' : "#F0F0F0" }}>
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

    </div>
  );
}

export default App;

