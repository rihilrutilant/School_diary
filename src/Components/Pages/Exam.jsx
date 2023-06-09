import React, { useEffect, useState } from 'react'
import "../Style/Exam.css"
import Navbar from "../Pages/Navbar"
import Topbar from './Topbar';
import { ReactSession } from 'react-client-session';

const Exam = () => {
  const [navVisible, showNavbar] = useState(true);
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, []);

  ReactSession.setStoreType("localStorage");

  const [error, setError] = useState("");

  const [field1, setField1] = useState('');
  const [field2, setField2] = useState('');
  const [field3, setField3] = useState('');
  const [field4, setField4] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (field1 && field2 && field3 && field4) {
      window.location.href = "/ExamSchedule";
      ReactSession.set("field1", field1);
      ReactSession.set("field2", field2);
      ReactSession.set("field3", field3);
    }
    else {
      setError("Please fill all fields");
    }
  };

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
                        <option value="" selected disabled>Exam Type</option>
                        <option value="First term">First term</option>
                        <option value="Second term">Second term</option>
                      </select>
                    </div>
                    <div className="custom-dropdown">
                      <select value={field2} onChange={(e) => setField2(e.target.value)}>
                        <option value="" selected disabled>Select Class</option>
                        <option value="10">10</option>
                        <option value="9">9</option>
                        <option value="8">8</option>
                      </select>
                    </div>
                    <div className="custom-dropdown">
                      <select value={field3} onChange={(e) => setField3(e.target.value)}>
                        <option value="" selected disabled>Select Division</option>
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="C">C</option>
                      </select>
                    </div>
                    <div className="custom-dropdown">
                      <select value={field4} onChange={(e) => setField4(e.target.value)}>
                        <option value="" selected disabled>Marks From</option>
                        <option value="100">100</option>
                        <option value="50">50</option>
                        <option value="30">30</option>
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