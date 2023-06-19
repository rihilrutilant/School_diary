import React, { useEffect, useState } from 'react'
import "../Style/Exam.css"
import Navbar from "../Pages/Navbar"
import Topbar from './Topbar';
import { ReactSession } from 'react-client-session';
import apiConst from "../Api_keys";


const Exam = () => {
  const [navVisible, showNavbar] = useState(true);
  useEffect(() => {
    getclasses();
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, []);

  ReactSession.setStoreType("localStorage");

  const [error] = useState("");

  const [field1, setField1] = useState('');
  const [field3, setField3] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    if (field1) {
      window.location.href = "/ExamSchedule";
      ReactSession.set("field1", field1);
      ReactSession.set("field3", field3);
    }
  };


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
  };
  // -----------------------Fetch all Standards ---------------------

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
  };

  const getdatas = (e) => {
    setField3(e.target.value)
  }
  //-----------------------Fetch all Classcode standard wise-------------------------

  return (
    <>
      <div className="main-content">
        <Navbar visible={navVisible} show={showNavbar} />
        <div className="inner-main-content"  >
          <Topbar />
          <div className="container-fluid">
            <h4 className='main-name'>Exam</h4>
            <button className='examschedule_btn'>+ Add a exam schedule</button>
            <div className='exam_cnt'>
              <div className='exam_info'>
                <form onSubmit={handleSubmit}>
                  <div className='exam_info_select'>
                    <div className="custom-dropdown">
                      <select value={field1} onChange={(e) => setField1(e.target.value)}>
                        <option value="" disabled>Exam Type</option>
                        <option value="First term">First term</option>
                        <option value="Second term">Second term</option>
                        <option value="Weekly">Weekly</option>
                        <option value="Monthly">Monthly</option>
                        <option value="Mid term">Mid Term</option>
                      </select>
                    </div>
                    <div className="custom-dropdown">
                      <select onChange={getclasscodes}>
                        <option value="DEFAULT" disabled>Select Class</option>
                        {
                          classes && classes.map((item, k) => {
                            return (
                              <option key={k} value={item.Standard}>std {item.Standard}</option>
                            )
                          })
                        }
                      </select>
                    </div>
                    <div className="custom-dropdown">
                      <select value={field3} onChange={getdatas}>
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
                  <div className="submit_part">
                    <button className="submit_btn" type="submit">SUBMIT</button>
                  </div>
                </form>
                {error && <div className='login_error'>{error}</div>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Exam