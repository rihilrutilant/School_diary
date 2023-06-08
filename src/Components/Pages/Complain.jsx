import React, { useEffect, useRef, useState } from "react";
import "../Style/Holiday.css";
import "../Style/Complain.css";
import Navbar from "../Pages/Navbar";
import Topbar from "./Topbar";
import { BiEditAlt } from 'react-icons/bi'
import { ToastContainer } from 'react-toastify';
import { FaRegTrashAlt } from "react-icons/fa";

const Complain = () => {
  const [navVisible, showNavbar] = useState(true);
  const refClose = useRef(null);
  const refClose2 = useRef(null);
  const ref = useRef(null);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    getTeachers();
    getYourRestaurant();
  }, []);

  //-------Teacher Data ----------//


  const [teachers, setTeachers] = useState();

  const getTeachers = async () => {
    const response = await fetch("http://localhost:5050/api/admin/fetch_all_teachers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "authToken_admin": localStorage.getItem("AToken")
      },
    });

    const json = await response.json();
    setTeachers(json);
  };

  //--------------- Teacher Data --------------------

  //-------Student Data--------/
  const [YourRestList, YoursetRestList] = useState();
  const [stdData, setStdData] = useState();
  const [getStudent, setgetStudent] = useState()

  const [stdVal, setStdVal] = useState('');
  const [classVal, setClassVal] = useState('');



  const getYourRestaurant = async () => {
    const response = await fetch("http://localhost:5050/api/classcode/get_all_classes",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "authToken_admin": localStorage.getItem("AToken")
        },
      });

    const json = await response.json();
    YoursetRestList(json);

  };

  //-------Student Data--------/

  //------------- Select Group ------------------------------

  const [teacher, setTeacher] = useState(false);
  const [student, setStudent] = useState(true);

  const handleTeacher = () => {
    setTeacher(!teacher);
    setStudent(false);
  };

  const handleStudent = () => {
    setTeacher(false);
    setStudent(!student);
  };

  const [secondDD, setsecondDD] = useState(false)
  const [ThirdDD, setThirdDD] = useState(false)

  const getStandard = async (e) => {
    const Standard = e.target.value
    if (Standard === "DEFAULT") {
      console.log("abcd");
    }
    else {
      setStdVal(e.target.value)

      const response = await fetch("http://localhost:5050/api/classcode/get_all_classes_std_wise", {
        method: 'POST',
        body: JSON.stringify({
          Standard
        }),
        headers: {
          'Content-Type': 'application/json',
          'authToken_admin': localStorage.getItem("AToken")
        }
      });
      const json = await response.json();
      setStdData(json);
      setsecondDD(true)
    }
  }

  const getClassCode = async (e) => {
    const S_Class_code = e.target.value
    setClassVal(e.target.value)

    if (S_Class_code === "DEFAULT") {
      console.log("This inkjabnkjm");
    } else {


      const response = await fetch("http://localhost:5050/api/admin/fetch_all_Students", {
        method: 'POST',
        body: JSON.stringify({
          S_Class_code
        }),
        headers: {
          'Content-Type': 'application/json',
          'authToken_admin': localStorage.getItem("AToken")
        }
      });

      const json = await response.json();
      setgetStudent(json);
      setThirdDD(true)
    }
  }

  const getStudentData = async (e) => {
    console.log(e.target.value);
  }
  return (
    <>
      <ToastContainer autoClose={2000} />
      <div className="main-content">
        <Navbar visible={navVisible} show={showNavbar} />
        <div className="inner-main-content">
          <Topbar />
          <div className="container-fluid">
            <div className="add_hPlan">
              <h4 className="main-name">Complains</h4>
              <button data-bs-toggle="modal" data-bs-target="#add_Holiday">+ Add Complain</button>
            </div>
            <div className="eventFor">
              <h3>Event Complain For</h3>
              <div className="eventfor_holiday">
                <input type="radio" checked={teacher} onChange={handleTeacher} />
                <label htmlFor="Teacher"> Teacher</label>
                <input type="radio" checked={student} onChange={handleStudent} />
                <label htmlFor="Student"> Student</label>
              </div>
            </div>

            <section>
              <table className="tab_holiday" style={{ marginBottom: "99px" }}>
                <>
                  <thead>
                    <tr className="tbl-tr">
                      <th>ID</th>
                      <th>Name</th>
                      <th>Title</th>
                      <th>Complain Description</th>
                      <th>Date</th>
                      <th></th>
                    </tr>
                  </thead>
                  {teacher && (
                    <tbody>
                      <tr>
                        <td>EFG456XY</td>
                        <td>Rihil Sanghani</td>
                        <td>This is for Testing perpose</td>
                        <td>Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur, magnam.</td>
                        <td>2021/01/01</td>
                        <td className="edit-delete">
                          <BiEditAlt style={{ cursor: "pointer" }} size={30} />
                          <FaRegTrashAlt className="FaRegTrashAlt" style={{ cursor: "pointer", marginLeft: "10px" }} size={20} />
                        </td>
                      </tr>
                    </tbody>
                  )}
                  {student && (
                    <tbody>
                      <tr>
                        <td>ABC123CD</td>
                        <td>Jenish Vekariya</td>
                        <td>This is for Testing perpose</td>
                        <td>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquid, officiis.</td>
                        <td>2023/06/07</td>
                        <td className="edit-delete">
                          <BiEditAlt style={{ cursor: "pointer" }} size={30} />
                          <FaRegTrashAlt className="FaRegTrashAlt" style={{ cursor: "pointer", marginLeft: "10px" }} size={20} />
                        </td>
                      </tr>
                    </tbody>
                  )}
                </>
              </table>

              {/* ------------------------ Update holiday MODAL     -----------------------------  */}
              <button type="button" ref={ref} style={{ display: "none" }} className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#holiday_one">
                Launch demo modal
              </button>
              {/* ------------------------ Update holiday MODAL     -----------------------------  */}

              <div
                className="modal fade"
                id="holiday_one"
                tabIndex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <div className="h_timetable">
                        <div className="hTable_title">
                          <label htmlFor="">Complain Title</label>
                          <input type="text" placeholder="Fees notification" name="Holiday_title" />
                        </div>

                        <div className="hTable_date">
                          <div className="date_from">
                            <label htmlFor="">Holiday from date</label>
                            <input id="date" type="date" name="Holiday_Start" />
                          </div>
                          <div className="date_to">
                            <label htmlFor="">Holiday to date</label>
                            <input id="date" type="date" name="Holiday_End" />
                          </div>
                        </div>

                        <div className="hTable_note">
                          <label>Note</label>
                          <input type="text" name="Holiday_description" />
                        </div>
                      </div>
                      <div className="second-part">
                        <p className='send'>Massage To</p>
                        <div className="rightside-section">
                          <div className='sright'>
                            <input className='chbtn' type="radio" id="1" required name="Groups" value="Students" />
                            <label className='chstudent' htmlFor="1" name='Group'>Student</label><br />
                          </div>
                          <div className='tright'>
                            <input className='chbtn' type="radio" id="2" required name="Groups" value="Teachers" />
                            <label className='chstudent' htmlFor="2" name='Group'>Teacher</label><br />
                          </div>
                        </div>
                      </div>

                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                        ref={refClose2}
                      ></button>
                    </div>
                    <div className="modal-footer">
                      <div className="hTable_btn">
                        <button className="save_btn"> SAVE</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>


              {/* --------------------------------Add Holiday-------------------------------------- */}
              <div
                className="modal fade"
                id="add_Holiday"
                tabIndex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <div className="h_timetable">

                        <h3>Event Complain For</h3>
                        <div className="eventfor_holiday">
                          <input type="radio" checked={teacher} onChange={handleTeacher} />
                          <label htmlFor="Teacher"> Teacher</label>
                          <input type="radio" checked={student} onChange={handleStudent} />
                          <label htmlFor="Student"> Student</label>
                        </div>

                        {/* Teacher ADD */}
                        {teacher && (
                          <>
                            <div className="hTable_name">
                              <label htmlFor="">Teacher Name</label>
                              <select className="any-options" name='T_name' required id='T_name' defaultValue={"DEFAULT"}>
                                <option value="DEFAULT" disabled>Select Teacher Name</option>
                                {teachers && teachers.map((item, index) => (
                                  <option value={item.T_name} key={index}>
                                    {item.T_name}
                                  </option>
                                ))}
                              </select>
                            </div>

                            <div className="hTable_title" style={{ paddingTop: "30px" }}>
                              <label htmlFor="">Complain Title</label>
                              <input type="text" placeholder="Complain title" name="Holiday_title" />
                            </div>

                            <div className="hTable_note">
                              <label>Complain</label>
                              <input type="text" name="Holiday_description" placeholder="Complain description" />
                            </div>
                          </>
                        )}
                        {/* Teacher ADD */}

                        {/* Student Add */}

                        {student && (
                          <>
                            <div className="hTable_name">
                              <label htmlFor="">Student Standard</label>
                              <select className="any-options" name='Standard' value={stdVal} onChange={getStandard} defaultValue={"DEFAULT"}>
                                <option value="DEFAULT" >Select Standard</option>
                                {YourRestList?.map((item, index) => (
                                  <option value={item?.Standard} key={index}>
                                    {item?.Standard}
                                  </option>
                                ))}
                              </select>
                            </div>

                            <div className="hTable_name">
                              <label htmlFor="">Student Class</label>
                              <select className="any-options" disabled={secondDD} name='SClass' id="sclass" value={classVal} onChange={getClassCode} defaultValue={"DEFAULT"}>
                                <option value="DEFAULT" >Select Class</option>
                                {stdData?.map((item, index) => (
                                  <option value={item} key={index}>
                                    {item}
                                  </option>
                                ))}
                              </select>
                            </div>

                            <div className="hTable_name">
                              <label htmlFor="">Student Class</label>
                              {
                                getStudent === "Student Not Found"
                                  ?
                                  <select className="any-options" disabled={ThirdDD} name='Standard' required id='Standard' onChange={getStudentData} defaultValue={"DEFAULT"}>
                                    <option value="DEFAULT" disabled>Data Not Found</option>
                                  </select>
                                  :
                                  <select className="any-options" name='Standard' disabled={ThirdDD} required id='Standard' onChange={getStudentData} defaultValue={"DEFAULT"}>
                                    <option value="DEFAULT" disabled>Select Class</option>
                                    {getStudent && getStudent.map((item, index) => (
                                      <option value={item.S_name} key={index}>
                                        {item.S_name}
                                      </option>
                                    ))}
                                  </select>
                              }
                            </div>
                          </>
                        )}

                        {/* Student Add */}
                        <button
                          type="button"
                          className="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                          ref={refClose}
                        ></button>
                      </div>
                      <div className="modal-footer">
                        <div className="hTable_btn">
                          <button className="save_btn"> SAVE</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* --------------------------------Add Holiday-------------------------------------- */}
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default Complain;
