import React, { useEffect, useRef, useState } from "react";
import "../Style/Holiday.css";
import Navbar from "../Pages/Navbar";
import Topbar from "./Topbar";
import { BiEditAlt } from 'react-icons/bi'
import { toast, ToastContainer } from 'react-toastify';
import { FaRegTrashAlt } from "react-icons/fa";
import Api_keys from '../Api_keys'

const Holiday = () => {
  const [navVisible, showNavbar] = useState(true);
  const refClose = useRef(null);
  const refClose2 = useRef(null);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    fetchData();
  }, []);

  //------------- Update Holidays ------------------------------

  const ref = useRef(null);

  const [updateHoliday, setUpdateHoliday] = useState({
    Holiday_title: "",
    Holiday_description: "",
    Holiday_Start: "",
    Holiday_End: "",
    Groups: ""
  })

  const updateRestHoliday = (currentHoliday) => {
    ref.current.click();
    setUpdateHoliday({
      id: currentHoliday._id,
      Holiday_title: currentHoliday.Holiday_title,
      Holiday_description: currentHoliday.Holiday_description,
      Holiday_Start: currentHoliday.Holiday_Start.split('T')[0],
      Holiday_End: currentHoliday.Holiday_End.split('T')[0],
      Groups: currentHoliday.Groups
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    RestUpdateHoliday(
      updateHoliday.id,
      updateHoliday.Holiday_title,
      updateHoliday.Holiday_description,
      updateHoliday.Holiday_Start,
      updateHoliday.Holiday_End,
      updateHoliday.Groups
    );
  }

  const RestUpdateHoliday = async (id, Holiday_title, Holiday_description, Holiday_Start, Holiday_End, Groups) => {
    const responseHoliday = await fetch(Api_keys.update_holidays + id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "authToken_admin": localStorage.getItem("AToken"),
      },
      body: JSON.stringify({ Holiday_title, Holiday_description, Holiday_Start, Holiday_End, Groups })
    });

    // console.log(responseHoliday);
    const json = await responseHoliday.json();

    // console.log(json);
    if (json.success === true) {
      refClose2.current.click();
      fetchData();
      toast.success("Holiday Update", { position: toast.POSITION.TOP_RIGHT });
    }
    else {
      if (!json.error[0].msg) {
        toast.error(json.error, { position: toast.POSITION.TOP_RIGHT });
      }
      else {
        toast.error(json.error[0].msg, { position: toast.POSITION.TOP_RIGHT });
      }
    }
  }

  const onChanges = (e) => {
    setUpdateHoliday({ ...updateHoliday, [e.target.name]: e.target.value });
  }

  //------------- Update Holidays ------------------------------

  //------------- Select Group ------------------------------

  const [teacher, setTeacher] = useState(false);
  const [student, setStudent] = useState(false);
  const [all, setAll] = useState(true);

  const handleTeacher = () => {
    setTeacher(!teacher);
    setStudent(false);
    setAll(false);
  };

  const handleStudent = () => {
    setTeacher(false);
    setStudent(!student);
    setAll(false);
  };

  const handleAll = () => {
    setTeacher(false);
    setStudent(false);
    setAll(!all);
  };


  const [datas, setDatas] = useState([]);

  //------------------------------- Fetch Holidays ------------------------------

  const fetchData = async () => {
    try {
      const response = await fetch(Api_keys.get_all_holidays, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "authToken_admin": localStorage.getItem("AToken")
        },
      });
      const jsonData = await response.json();
      setDatas(jsonData); // Update the state with the received data array
    } catch (error) {
      console.error(error);
    }
  };

  //------------------------------- Fetch Holidays ------------------------------

  const filteredStudent = datas.filter(item => item.Groups === 'Students');
  const filteredTeacher = datas.filter(item => item.Groups === 'Teachers');
  const filteredAll = datas.filter(item => item.Groups === 'All');

  //------------- Select Group ------------------------------


  //------------------------Add Holidays---------------------

  const [newHoliday, setNewHoliday] = useState({
    Holiday_title: "",
    Holiday_description: "",
    Holiday_Start: "",
    Holiday_End: "",
    Groups: ""
  })

  const AddHoliday = async (e) => {
    e.preventDefault();
    const {
      Holiday_title,
      Holiday_description,
      Holiday_Start,
      Holiday_End,
      Groups
    } = newHoliday;
    const response = await fetch(Api_keys.send_holidays, {
      method: 'POST',
      body: JSON.stringify({
        Holiday_title,
        Holiday_description,
        Holiday_Start,
        Holiday_End,
        Groups
      }),
      headers: {
        'Content-Type': 'application/json',
        'authToken_admin': localStorage.getItem("AToken")
      }
    });

    const json = await response.json();
    if (json.success) {
      refClose.current.click();
      fetchData();
      toast.success("Holiday added successfully", { position: toast.POSITION.TOP_RIGHT });
      const timer = setTimeout(() => {
      }, 1000);
      return () => clearTimeout(timer);
    }
    else {
      if (!json.error[0].msg) {
        toast.error(json.error, { position: toast.POSITION.TOP_RIGHT });
      }
      else {
        toast.error(json.error[0].msg, { position: toast.POSITION.TOP_RIGHT });
      }
    }
  }

  const onChangesholiday = (e) => {
    setNewHoliday({ ...newHoliday, [e.target.name]: e.target.value })
  }

  //------------------------Add Holidays---------------------

  //-----------------------Delete Holiday --------------------------------

  const deleteRest = (id) => {
    fetch(Api_keys.delete_holidays + id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "authToken_admin": localStorage.getItem("AToken"),
      },
    }).then((result) => {
      result.json().then((resp) => {
        if (resp.success) {
          toast.success("Holiday Deleted Successfully", { position: toast.POSITION.TOP_RIGHT });
          fetchData();
        }
        else {
          toast.error(resp.error, { position: toast.POSITION.TOP_RIGHT });
        }
        fetchData();
      })
    })
  }


  //----------------------------------------------------------------Delete Holiday --------------------------------

  return (
    <>
      <ToastContainer autoClose={2000} />
      <div className="main-content">
        <Navbar visible={navVisible} show={showNavbar} />
        <div className="inner-main-content">
          <Topbar />
          <div className="container-fluid">
            <div className="add_hPlan">
              <h4 className="main-name">Holidays</h4>
              {/* <Link to="/HolidayTwo"> */}
              <button data-bs-toggle="modal" data-bs-target="#add_Holiday">+ Add a Holidays Plan</button>
              {/* </Link> */}
            </div>
            <div className="eventFor">
              <h3>Event History For</h3>
              <div className="eventfor_holiday">
                <input type="radio" checked={teacher} onChange={handleTeacher} />
                <label htmlFor="Teacher"> Teacher</label>
                <input type="radio" checked={student} onChange={handleStudent} />
                <label htmlFor="Student"> Student</label>
                <input type="radio" checked={all} onChange={handleAll} />
                <label htmlFor="All"> All</label>
              </div>
            </div>

            <section>
              <table className="tab_holiday" style={{ marginBottom: "99px" }}>
                <>
                  <thead>
                    <tr className="tbl-tr">
                      <th>Time</th>
                      <th>Holiday from date</th>
                      <th>Holiday to date</th>
                      <th>Groups</th>
                      <th>Note</th>
                      <th></th>
                    </tr>
                  </thead>
                  {all && (
                    <tbody>
                      {filteredAll.map((a, i) => (
                        <tr key={i}>
                          <td>{a.Holiday_title}</td>
                          <td>{a.Holiday_Start.split('T')[0]}</td>
                          <td>{a.Holiday_End.split('T')[0]}</td>
                          <td>{a.Groups}</td>
                          <td>
                            <p className="des">
                              {a.Holiday_description}
                            </p>
                          </td>
                          <td className="edit-delete">
                            <BiEditAlt style={{ cursor: "pointer" }} size={30} onClick={() => updateRestHoliday(a)} />
                            <FaRegTrashAlt className="FaRegTrashAlt" style={{ cursor: "pointer", marginLeft: "10px" }} size={20} onClick={() => deleteRest(a._id)} />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  )}
                  {teacher && (
                    <tbody>
                      {filteredTeacher.map((a) => (
                        <tr key={a._id}>
                          <td>{a.Holiday_title}</td>
                          <td>{a.Holiday_Start.split('T')[0]}</td>
                          <td>{a.Holiday_End.split('T')[0]}</td>
                          <td>{a.Groups}</td>
                          <td>
                            <p className="des">
                              {a.Holiday_description}
                            </p>
                          </td>
                          <td className="edit-delete">
                            <BiEditAlt style={{ cursor: "pointer" }} size={30} onClick={() => updateRestHoliday(a)} />
                            <FaRegTrashAlt className="FaRegTrashAlt" style={{ cursor: "pointer", marginLeft: "10px" }} size={20} onClick={() => deleteRest(a._id)} />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  )}
                  {student && (
                    <tbody>
                      {filteredStudent.map((a) => (
                        <tr key={a._id}>
                          <td>{a.Holiday_title}</td>
                          <td>{a.Holiday_Start.split('T')[0]}</td>
                          <td>{a.Holiday_End.split('T')[0]}</td>
                          <td>{a.Groups}</td>
                          <td>
                            <p className="des">
                              {a.Holiday_description}
                            </p>
                          </td>
                          <td className="edit-delete">
                            <BiEditAlt style={{ cursor: "pointer" }} size={30} onClick={() => updateRestHoliday(a)} />
                            <FaRegTrashAlt className="FaRegTrashAlt" style={{ cursor: "pointer", marginLeft: "10px" }} size={20} onClick={() => deleteRest(a._id)} />
                          </td>
                        </tr>
                      ))}
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
                          <label htmlFor="">Holiday Title</label>
                          <input type="text" name="Holiday_title" onChange={onChanges} value={updateHoliday.Holiday_title} />
                        </div>

                        <div className="hTable_date">
                          <div className="date_from">
                            <label htmlFor="">Holiday from date</label>
                            <input id="date" type="date" name="Holiday_Start" onChange={onChanges} value={updateHoliday.Holiday_Start.split('T')[0]} />
                          </div>
                          <div className="date_to">
                            <label htmlFor="">Holiday to date</label>
                            <input id="date" type="date" name="Holiday_End" onChange={onChanges} value={updateHoliday.Holiday_End.split('T')[0]} />
                          </div>
                        </div>

                        <div className="hTable_note">
                          <label>Note</label>
                          <input type="text" onChange={onChanges} name="Holiday_description" value={updateHoliday.Holiday_description} />
                        </div>
                      </div>
                      <div className="second-part">
                        <p className='send'>Massage To</p>
                        <div className="rightside-section">
                          <div className='sright'>
                            <input className='chbtn' type="radio" id="1" required checked={updateHoliday.Groups === 'Students'} onChange={onChanges} name="Groups" value="Students" />
                            <label className='chstudent' htmlFor="1" name='Group'>Student</label><br />
                          </div>
                          <div className='tright'>
                            <input className='chbtn' type="radio" id="2" required checked={updateHoliday.Groups === 'Teachers'} onChange={onChanges} name="Groups" value="Teachers" />
                            <label className='chstudent' htmlFor="2" name='Group'>Teacher</label><br />
                          </div>
                          <div className='aright'>
                            <input className='chbtn' type="radio" id="3" required checked={updateHoliday.Groups === 'All'} onChange={onChanges} name="Groups" value="All" />
                            <label className='chstudent' htmlFor="3" name='Group'>All</label><br />
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
                        <button className="save_btn" onClick={handleSubmit} >SAVE</button>
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
                        <div className="hTable_note">
                          <label htmlFor="">Holiday Title</label>
                          <input type="text" name="Holiday_title" onChange={onChangesholiday} />
                        </div>

                        <div className="hTable_date">
                          <div className="date_from">
                            <label htmlFor="">Holiday from date</label>
                            <input id="date" type="date" name="Holiday_Start" onChange={onChangesholiday} />
                          </div>
                          <div className="date_to">
                            <label htmlFor="">Holiday to date</label>
                            <input id="date" type="date" name="Holiday_End" onChange={onChangesholiday} />
                          </div>
                        </div>

                        <div className="hTable_note">
                          <label>Note</label>
                          <input type="text" onChange={onChangesholiday} name="Holiday_description" />
                        </div>
                      </div>
                      <div className="second-part">
                        <p className='send'>Massage To</p>
                        <div className="rightside-section">
                          <div className='sright'>
                            <input className='chbtn' type="radio" id="1" required onChange={onChangesholiday} name="Groups" value="Students" />
                            <label className='chstudent' htmlFor="1" name='Group'>Student</label><br />
                          </div>
                          <div className='tright'>
                            <input className='chbtn' type="radio" id="2" required onChange={onChangesholiday} name="Groups" value="Teachers" />
                            <label className='chstudent' htmlFor="2" name='Group'>Teacher</label><br />
                          </div>
                          <div className='aright'>
                            <input className='chbtn' type="radio" id="3" required onChange={onChangesholiday} name="Groups" value="All" />
                            <label className='chstudent' htmlFor="3" name='Group'>All</label><br />
                          </div>
                        </div>
                      </div>

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
                        <button className="save_btn" onClick={AddHoliday}> SAVE</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* --------------------------------Add Holiday-------------------------------------- */}
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default Holiday;
