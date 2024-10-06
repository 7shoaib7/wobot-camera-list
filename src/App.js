import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";

//assets
import brandLogo from "../src/assets/BrandLogo.svg";
import searchIcon from "../src/assets/SearchIcon.svg";
import locationIcon from "../src/assets/LocationIcon.svg";
import statusIcon from "../src/assets/StatusIcon.svg";

//components
import Filter from "./components/Filter";
import Table from "./components/Table";
import Pagination from "./components/Pagination";



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
  const filteredCameras = useMemo(() => {
    return camerasList.filter((camera) => {
      const matchesLocation = locationFilter ? camera.location === locationFilter : true;
      const matchesStatus = statusFilter ? camera.status === statusFilter : true;
      const matchesSearchQuery = searchQuery
        ? camera.name.toLowerCase().includes(searchQuery.toLowerCase())
        : true;
      return matchesLocation && matchesStatus && matchesSearchQuery;
    });
  }, [camerasList, locationFilter, statusFilter, searchQuery]);


  const totalPages = Math.ceil(filteredCameras.length / rowsPerPage);

  const startRow = (currentPage - 1) * rowsPerPage + 1;
  const endRow = Math.min(currentPage * rowsPerPage, filteredCameras.length);

  // Paginate after filtering
  const paginatedData = useMemo(() => {
    return filteredCameras.slice(
      (currentPage - 1) * rowsPerPage,
      currentPage * rowsPerPage
    );
  }, [filteredCameras, currentPage, rowsPerPage]);

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
        <Filter
          icon={locationIcon}
          value={locationFilter}
          options={locations}
          onChange={(e) => setLocationFilter(e.target.value)}
          placeholder="Location"
        />
        <Filter
          icon={statusIcon}
          value={statusFilter}
          options={["Active", "Inactive"]}
          onChange={(e) => setStatusFilter(e.target.value)}
          placeholder="Status"
        />
      </div>

      {/** Table */}
      <div className="table-container">
        <Table
          data={paginatedData}
          onDelete={handleDelete}
          onStatusChange={updateCameraStatus}
        />
      </div>

      {/** Table pagination */}
      {paginatedData.length ? <div className="table-pagination">

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          startRow={startRow}
          endRow={endRow}
          totalItems={filteredCameras.length}
          rowsPerPage={rowsPerPage}
          handleFirstPage={handleFirstPage}
          handlePreviousPage={handlePreviousPage}
          handleNextPage={handleNextPage}
          handleLastPage={handleLastPage}
          handleRowsPerPageChange={handleRowsPerPageChange}
        />

      </div> : null}
    </div>
  );
}

export default App;

