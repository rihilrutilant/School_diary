import React, { useCallback, useEffect, useState } from 'react'
import "../Style/Id.css"
import Navbar from "../Pages/Navbar"
import Topbar from './Topbar';
import { ReactSession } from 'react-client-session';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

const Time = () => {

  const navigate = useNavigate();
  //--------Main Content--------//

  ReactSession.setStoreType("localStorage");
  const [navVisible, showNavbar] = useState(true);

  const onChange = (event) => {
    const value = event.target.value;
    ReactSession.set("username", value);
    navigate('/Timetabledata')
  };

  //-------Student Data--------/
  const [YourRestList, YoursetRestList] = useState();

  let Standard;

  const getYourRestaurant = useCallback(async () => {
    const response = await fetch("http://localhost:5050/api/classcode/get_all_classes", {
      method: "POST",
      body: JSON.stringify({
        Standard
      }),
      headers: {
        "Content-Type": "application/json",
        "authToken_admin": localStorage.getItem("AToken")
      },
    });

    const json = await response.json();
    YoursetRestList(json);
  }, [Standard]);

  useEffect(() => {
    getYourRestaurant();
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, [getYourRestaurant]);

  return (
    <>
      <div className="main-content">
        <Navbar visible={navVisible} show={showNavbar} />
        <div className="inner-main-content"  >
          <Topbar />
          <div className="container-fluid">
            <h4 className='main-name'>Time Table</h4>
            <div className='ganerate_id_part'>
              <div className='ganerateid_cnt'>
                <div className='ganerateid_cnt_inn'>
                  {YourRestList && YourRestList.map((a, b) => (

                    <select key={b} defaultValue={"DEFAULT"} className="student_class" onChange={onChange} >
                      <option value="DEFAULT" disabled>Standard {a.Standard}</option>{
                        a.ClassCode.map((d, i) => (
                          <option value={d} key={i}>
                            {d}
                          </option>
                        ))}
                    </select>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Time