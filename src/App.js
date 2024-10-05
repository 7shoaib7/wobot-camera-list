import React, { useEffect, useState } from "react";
import brandLogo from "../src/assets/BrandLogo.svg";
import searchIcon from "../src/assets/SearchIcon.svg";
import locationIcon from "../src/assets/LocationIcon.svg";
import statusIcon from "../src/assets/StatusIcon.svg";
import warningIcon from "../src/assets/WarningIcon.svg";
import actionActiveIcon from "../src/assets/ActionActiveIcon.svg";
import arrowLeftIcon from "../src/assets/ArrowLeftIcon.svg";
import previousIcon from "../src/assets/PreviousIcon.svg";
import nextIcon from "../src/assets/NextIcon.svg";
import arrowRightIcon from "../src/assets/ArrowRightIcon.svg";
import actionInactiveIcon from "../src/assets/ActionInactiveIcon.svg"

import axios from "axios";



function App() {
  const [camerasList, setCamerasList] = useState([]);
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Filter states
  const [locationFilter, setLocationFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const token = "4ApVMIn5sTxeW7GQ5VWeWiy";


  // **Filter Logic**
  const filteredCameras = camerasList.filter((camera) => {
    const matchesLocation = locationFilter ? camera.location === locationFilter : true;
    const matchesStatus = statusFilter ? camera.status === statusFilter : true;
    const matchesSearchQuery = searchQuery
      ? camera.name.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    return matchesLocation && matchesStatus && matchesSearchQuery;
  });


  const totalPages = Math.ceil(filteredCameras.length / rowsPerPage);

  const startRow = (currentPage - 1) * rowsPerPage + 1;
  const endRow = Math.min(currentPage * rowsPerPage, filteredCameras.length);

  // Paginate after filtering
  const paginatedData = filteredCameras.slice(
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


  // Function to extract unique locations
  const extractLocations = (cameraList) => {
    const uniqueLocations = [...new Set(cameraList.map(camera => camera.location))];
    setLocations(uniqueLocations);
  };

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
      extractLocations(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchCameras();
  }, []);


  // Function to update camera status
  const updateCameraStatus = async (id, status) => {
    try {
      await axios.put('https://api-app-staging.wobot.ai/app/v1/update/camera/status', {
        id: id,
        status: status,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // Optionally, you can update the local state to reflect the change
      setCamerasList(prevCameras =>
        prevCameras.map(camera =>
          camera.id === id ? { ...camera, status } : camera
        )
      );
    } catch (err) {
      setError(err.message);
    }
  };



  // Handle delete
  const handleDelete = (id) => {
    const updatedCamerasList = camerasList.filter((camera) => camera._id !== id);
    setCamerasList(updatedCamerasList);
  };


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
          <input className="search-box" placeholder="search" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
          <img src={searchIcon} alt="searchIcon" className="search-icon" />
        </div>
      </div>

      {/* Filter Container */}
      <div className="filters">
        <div className="filter-location-container">
          <img src={locationIcon} alt="location-icon" className="location-icon" />
          <select className="filter-location"
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
          >
            <option value="" disabled selected hidden>Location</option>
            {locations.map((location, index) => (
              <option key={index} value={location}>
                {location}
              </option>
            ))}
          </select>
        </div>
        <div className="filter-status-container">
          <img src={statusIcon} alt="status-icon" className="status-icon" />
          <select className="filter-status"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="" disabled selected hidden>Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
      </div>

      {/** Table */}
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>
                <input type="checkbox" className="table-checkbox" />
              </th>
              <th>NAME</th>
              <th>HEALTH</th>
              <th>LOCATION</th>
              <th>RECORDER</th>
              <th>TASKS</th>
              <th>STATUS</th>
              <th>ACTIONS</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.length ? paginatedData.map((camera) => (
              <tr key={camera._id}>
                <td><input type="checkbox" className="table-checkbox" /></td>
                <td>
                  <div className="name">
                    <div className="name-top">
                      <div className="name-status" style={{ backgroundColor: camera.current_status === "Online" ? "#029262" : "#DC3545" }}></div>
                      <div className="name-text">{camera.name}</div>
                      {camera.hasWarning && <img src={warningIcon} alt="warning-icon" className="name-warning" />}
                    </div>
                  </div>
                  <div className="name-bottom">
                    <span>sherwinwilliams@wobot.ai</span>
                  </div>

                </td>
                <td>Healthy</td>
                <td>
                  <span className="location">{camera.location}</span>
                </td>
                <td>
                  <span className="recorder">{camera.recorder !== "" ? camera.recorder : 'N/A'}</span>
                </td>
                <td>
                  <span className="tasks">{camera.tasks} Tasks</span>
                </td>
                <td>
                  <div className="status" style={{ backgroundColor: camera.status === "Active" ? '#0292621A' : "#F0F0F0" }}>
                    <span className="status-text"
                      style={{
                        color: camera.status === "Active" ? '#029262' : "#545454"
                      }}>
                      {camera.status === 'Active' ? "Active" : "Inactive"}
                    </span>
                  </div>
                </td>
                <td>
                  <div className="action" onClick={() => updateCameraStatus(camera.id, camera.status === "Active" ? "Inactive" : "Active")}>
                    {camera.status === "Active" ? <img src={actionActiveIcon} alt="action-icon" />
                      : <img src={actionInactiveIcon} alt="action-icon" />}
                  </div>
                </td>
                <td>
                  <div className="delete-row" style={{ background: "#DC3545", cursor: "pointer" }} onClick={() => handleDelete(camera._id)}>
                    <span className="delete-row-text" style={{ color: "white" }}>Delete</span>
                  </div>
                </td>
              </tr>
            )) : null}
          </tbody>
        </table>
      </div>

      {/** Table pagination */}
      {paginatedData.length ? <div className="table-pagination">

        <div className="rows-per-page">
          <select value={rowsPerPage} onChange={handleRowsPerPageChange} className="rows-per-page-option">
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>30</option>
          </select>
        </div>

        <div className="row-range">
          <span className="row-range-text">
            {startRow}-{endRow} of {filteredCameras.length}
          </span>
        </div>

        <div className="pagination-controls">
          <img src={arrowLeftIcon} onClick={handleFirstPage} alt="arrow-left-icon" />
          <img src={previousIcon} onClick={handlePreviousPage} alt="previous-icon" />
          <img src={nextIcon} onClick={handleNextPage} alt="next-icon" />
          <img src={arrowRightIcon} onClick={handleLastPage} alt="arrow-right-icon" />
        </div>

      </div> : null}
    </div>
  );
}

export default App;

