import brandLogo from "../src/assets/BrandLogo.svg";
import searchIcon from "../src/assets/SearchIcon.svg";


function App() {
  return (
    <div className="App">
      <div className="brand-logo-container">
         <img src={brandLogo} alt="brandLogo"/>
      </div>
      <div className="header">
            <div className="header-title">
                <h6 className="header-title-top">Cameras</h6>
                <h6 className="header-title-bottom">Manage your cameras here</h6>
            </div>
            <div className="search-box-container">
                <input className="search-box" placeholder="search"/>
                <img src={searchIcon} alt="searchIcon" className="search-icon"/>
            </div>
      </div>
    </div>
  );
}

export default App;
