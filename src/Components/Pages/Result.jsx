
import React, { useEffect, useState } from 'react'
import "../Style/Result.css"
import Navbar from "../Pages/Navbar"
import Topbar from './Topbar';
import { useNavigate } from 'react-router-dom';
import apiConst from "../Api_keys";
import { ReactSession } from 'react-client-session';

const Result = () => {
  const navigate = useNavigate();
  ReactSession.setStoreType("localStorage");

  const onChange = (event) => {
    const value = event.target.value;
    ReactSession.set("jenish", value);
    navigate('/ResultData')
  };

  const [navVisible, showNavbar] = useState(true);

  useEffect(() => {
    getclasses()
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  // -----------------------Fetch all Standards ---------------------
  const [classes, setclasses] = useState()
  const getclasses = async (e) => {
    const response = await fetch(apiConst.fetch_all_standards, {
      method: "POST",
      headers: {
        "authToken_admin": localStorage.getItem("AToken")
      },
    });
    const json = await response.json();
    setclasses(json)
    ReactSession.set("jenish", json);
  };
  // -----------------------Fetch all Standards ---------------------

  const [classVal] = useState('');

  //-----------------------Fetch all Classcode standard wise-------------------------
  const [classCode, setclassCode] = useState()
  const getclasscodes = async (e) => {
    const Standard = e.target.value
    const response = await fetch(apiConst.get_all_classes_std_wise, {
      method: "POST",
      body: JSON.stringify({ Standard }),
      headers: {
        "Content-Type": "application/json",
        "authToken_admin": localStorage.getItem("AToken")
      },
    });
    const json = await response.json();
    setclassCode(json)

    const value = e.target.value;
    ReactSession.set("jenish", value);
  };
  //-----------------------Fetch all Classcode standard wise-------------------------

  return (
    <>
      <div className="main-content">
        <Navbar visible={navVisible} show={showNavbar} />
        <div className="inner-main-content">
          <Topbar />
          <div className="container-fluid">
            <div className="add-btn">
              <h4 className='main-name'>Result</h4>
            </div>
            <div className="r-info">
              <div className="sel-sec">
                <select defaultValue={"DEFAULT"} className="form-select345" onChange={getclasscodes}>
                  <option value="DEFAULT" disabled>Select Class</option>
                  {
                    classes && classes.map((item, k) => {
                      return (
                        <option key={k} value={item.Standard}>Std {item.Standard}</option>
                      )
                    })
                  }
                </select>
                <div className="cls1">
                  <select className="form-select345" value={classVal} onChange={onChange}>
                    <option value="DEFAULT">Select Division</option>
                    {
                      classCode && classCode.map((item, k) => {
                        return (
                          <option key={k} value={item}>{item}</option>
                        )
                      })
                    }
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Result;
