import React, { useState, useEffect } from 'react'

import './App.css';
import SpaceShipComponant from './SpaceShipComponant';

function App() {

  const [isLaunch, setIsLaunch] = useState(null);
  const [islanded, setIsLanded] = useState(null);
  const [whichYear, setWhichYear] = useState(null);
  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState([]);
  //get default data
  useEffect(() => {
    //info from API
    setIsLoading(true);
    getSpaceShips();
  }, [isLaunch, islanded, whichYear]);

  const getSpaceShips = async () => {
    let URL = "";
    if (isLaunch === null && islanded === null && whichYear === null) {
      URL = `https://api.spacexdata.com/v3/launches?limit=100`;
    } else {

      let year = (whichYear === null) ?
        "" : `&launch_year=${whichYear.toString()}`;

      let launch = (isLaunch === null) ? 
        "" : isLaunch ?
          "&launch_success=true" : "&launch_success=false";

      let land = (islanded === null) ? 
        "" : islanded?
          "&land_success=true" : "&land_success=false";


      const BaseURL = `https://api.spacexdata.com/v3/launches?limit=100`;
      URL = `${BaseURL}${year}${launch}${land}`;

    }

    console.log(URL);

    let response = await fetch(URL);

    if (response) { 
      // get the response body 
      let json = await response.json();

      if (json.length > 0) {
        console.log(json);
        setData(json);
        setIsLoading(false);
      } else {
        console.log("empty");
      }
    } else {
      setIsLoading(true);
      console.log("error");
    }
  }
  //list of years from 2006 to 2020.
  const yearList = [];
  for (let index = 2006; index < 2021; index++) {
    yearList.push(index);
  }
  // clear all button background
  function clearBackground() {
    yearList.forEach(year => {
      document.getElementById(year.toString()).style.backgroundColor = "rgba(28, 223, 67, 0.387)";
      document.getElementById(year.toString()).style.color = "green";
    })
  }

  const setYearhandler = (year) => {
    // same year btn clicked twice
    if (whichYear === year) {
      setWhichYear(null);
      document.getElementById(year.toString()).style.backgroundColor = "rgba(28, 223, 67, 0.387)";
      document.getElementById(year.toString()).style.color = "green";
    } else {
      setWhichYear(year);
      clearBackground();
      document.getElementById(year.toString()).style.backgroundColor = "rgb(11, 174, 84)"
      document.getElementById(year.toString()).style.color = "white";
    }
  }

  return (
    <div className="container">
      <h4>SpaceX Launch Programs</h4>
      {/* conatainer holding filter and SpaceX ships */}
      <div className="main-container">
        {/* filter will conatain all filter btns */}
        <article className="filter">
          <h4>Filter</h4>
          {/* year filter */}
          <div className="year-filter">
            <h5>Launch year</h5>
            <div className="divider"></div>
            <div className="years-container">
              {
                yearList.map((year) => {
                  return (
                    <button
                      id={year}
                      key={year}
                      onClick={
                        () => {
                          setYearhandler(year);
                        }
                      }>{year}
                    </button>
                  );
                })
              }
            </div>
          </div>
          {/* launch fiter */}
          <div className="launch-filter">
            <h5>Successful Launch</h5>
            <div className="divider"></div>
            <div className="launch-container">
              <button
                className={
                  isLaunch === null ?
                    null : isLaunch === true ?
                      'active' : null
                }
                onClick={
                  () => {
                    if (isLaunch === true) {
                      setIsLaunch(null);
                    } else {
                      setIsLaunch(true);
                    }
                  }
                }>True
              </button>
              <button
                className={
                  isLaunch === null ?
                    null : isLaunch !== true ?
                      'active' : null
                }
                onClick={
                  () => {
                    if (isLaunch === false) {
                      setIsLaunch(null);
                    } else {
                      setIsLaunch(false);
                    }
                  }}>False
              </button>
            </div>
          </div>
          {/* landing filter */}
          <div className="Land-filter">
            <h5>Successful Landing</h5>
            <div className="divider"></div>
            <div className="Land-container">
              <button
                className={
                  islanded === null ?
                    null : islanded === true ?
                      'active' : null
                }
                onClick={
                  () => {
                    if (islanded === true) {
                      setIsLanded(null);
                    } else {
                      setIsLanded(true);
                    }
                  }
                }>
                True
              </button>
              <button
                className={
                  islanded === null ?
                    null : islanded !== true ?
                      'active' : null
                }
                onClick={
                  () => {
                    if (islanded === false) {
                      setIsLanded(null);
                    } else {
                      setIsLanded(false);
                    }
                  }
                }>
                False
              </button>
            </div>
          </div>
        </article>
        {/* space-ship-data */}
        <article className="space-ship-container">
          {
            isLoading ?
              <div className="loading"></div> :
              <div className='space-ships'>
                {
                  data.map((dataObj) => {
                    return (
                      <SpaceShipComponant
                        key={dataObj.flight_number}
                        details={dataObj}
                      >
                      </SpaceShipComponant>
                    );
                  })
                }
              </div>
          }
        </article>

      </div>
      <h4 style={
        {
          textAlign:"center"
        }
      }>Developed by: [ Prasanna kale ]</h4>
    </div>
  );
}

export default App;
