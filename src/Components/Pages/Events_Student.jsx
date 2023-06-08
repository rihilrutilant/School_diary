import React, { useEffect, useState } from "react";
import "../Style/Events_student.css";
import Navbar from "./Navbar";
import Topbar from "./Topbar";
import { Link } from "react-router-dom";

const Events_Student = () => {
  const [navVisible, showNavbar] = useState(true);
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);
  return (
    <>
      <div className="main-content">
        <Navbar visible={navVisible} show={showNavbar} />
        <div className="inner-main-content">
          <Topbar />
          <div className="container-fluid">
            <section>
              <div className="eventTwo_top">
                <h4 className="main-name">
                  Events / <strong>Photos </strong>
                </h4>
                <div className="eventFor_two">
                  <h3>Event for</h3>
                  <div className="eventforTwo_option">
                    <Link to="/Events_teacher">
                      <input type="checkbox" className="holiday_cBox" />
                    </Link>
                    <label for=""> Teacher</label>

                    <input type="checkbox" />
                    <label for=""> Student</label>
                  </div>
                </div>
              </div>
            </section>

            {/* -----------------------------------      EVENT NAME     ----------------------------- */}

            <section>
              <div className="evntStudent_class">
                <div className="eTable_date evStudent_photo">
                  <div className="date_from">
                    <label htmlFor="">Event name</label>
                    <input type="text" />
                  </div>
                  <div className="date_from">
                    <label htmlFor="">Select Class</label>
                    <select className="dropdown_class evPhoto_dropdown">
                      <option selected disabled>
                        Select Class
                      </option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6</option>
                      <option value="7">7</option>
                      <option value="8">8</option>
                      <option value="9">9</option>
                      <option value="10">10</option>
                      <option value="11">11</option>
                      <option value="12">12</option>
                    </select>
                  </div>
                  <div className="date_to">
                    <label htmlFor="">Select Section</label>
                    <select className="dropdown_class">
                      <option selected disabled>
                        Select Class
                      </option>
                      <option value="1">A</option>
                      <option value="2">B</option>
                      <option value="4">C</option>
                      <option value="5">D</option>
                    </select>
                  </div>
                </div>
                <div className="evntStudentSubmit_btn">
                  <button>SUBMIT</button>
                </div>
              </div>
              <div className="evntStudent_funfair">
                <h3>Fun Fair 2023</h3>
              </div>
            </section>

            {/* -----------------------------------      PHOTOS     ----------------------------- */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Events_Student;
