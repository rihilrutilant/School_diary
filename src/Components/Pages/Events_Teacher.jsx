import React, { useEffect, useState } from "react";
import "../Style/Events_teacher.css";
import Navbar from "./Navbar";
import Topbar from "./Topbar";
import { Link } from "react-router-dom";

const Events_Teacher = () => {
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
                    <input type="checkbox" className="holiday_cBox" />
                    <label for=""> Teacher</label>
                    <Link to="/Events_student">
                      <input type="checkbox" />
                    </Link>
                    <label for=""> Student</label>
                  </div>
                </div>
              </div>
            </section>

            {/* -----------------------------------      EVENT NAME     ----------------------------- */}

            <section>
              <div className="evntTeacher_class">
                <div className="date_from">
                  <label htmlFor="">Event name</label>
                  <br />
                  <input type="text" />
                </div>
                <div className="evntTeacherSubmit_btn">
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

export default Events_Teacher;
