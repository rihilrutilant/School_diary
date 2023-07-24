
import React, { useEffect, useState } from 'react'
import Navbar from "../Pages/Navbar"
import Topbar from './Topbar';
import { useNavigate } from 'react-router-dom';
import apiConst from "../Api_keys";
import { ReactSession } from 'react-client-session';

const Exam = () => {
  const navigate = useNavigate();
  ReactSession.setStoreType("localStorage");

  const onChange = (event) => {
    const value = event.target.value;
    ReactSession.set("standardCode", value);
    navigate('/ExamData')
  };

  const [navVisible, showNavbar] = useState(true);

  // -----------------------Fetch all Standards ---------------------

  const [classes, setclasses] = useState()
  const getclasses = async () => {
    const response = await fetch(apiConst.fetch_all_standards, {
      method: "POST",
      headers: {
        "authToken_admin": localStorage.getItem("AToken")
      },
    });
    const json = await response.json();
    setclasses(json)
    // ReactSession.set("jenish123", json);
  };
  // -----------------------Fetch all Standards ---------------------

  useEffect(() => {
    getclasses();
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);
  return (
    <>
      <div className="main-content">
        <Navbar visible={navVisible} show={showNavbar} />
        <div className="inner-main-content">
          <Topbar />
          <div className="container-fluid">
            <div className="add-btn">
              <h4 className='main-name'>Exam</h4>
            </div>
            <div className="r-info">
              <div className="sel-sec">
                <select defaultValue={"DEFAULT"} className="form-select345" onChange={onChange}>
                  <option value="DEFAULT" disabled>Select Class</option>
                  {
                    classes && classes.map((item, k) => {
                      return (
                        <option key={k} value={item.Standard}>Std {item.Standard}</option>
                      )
                    })
                  }
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Exam