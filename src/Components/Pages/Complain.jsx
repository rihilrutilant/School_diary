import React, { useEffect, useRef, useState } from "react";
import "../Style/Holiday.css";
import "../Style/Complain.css";
import Navbar from "../Pages/Navbar";
import Topbar from "./Topbar";
import { BiEditAlt } from 'react-icons/bi'
import { toast, ToastContainer } from 'react-toastify';
import { FaRegTrashAlt } from "react-icons/fa";
import apiConst from "../Api_keys"

const Complain = () => {
  const [navVisible, showNavbar] = useState(true);
  const refClose = useRef(null);
  const refClose2 = useRef(null);


  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    getTeachers();
    getYourRestaurant();
    fetchData();
    fetchDataS();
  }, []);

  //-------Teacher Data ----------//


  const [teachers, setTeachers] = useState();

  const getTeachers = async () => {
    const response = await fetch(apiConst.fetch_all_teachers, {
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





  const getYourRestaurant = async () => {
    const response = await fetch(apiConst.fetch_all_standards,
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

  const [teacher, setTeacher] = useState(true);
  const [student, setStudent] = useState(false);

  const handleTeacher = () => {
    setTeacher(!teacher);
    setStudent(false);
  };

  const handleStudent = () => {
    setTeacher(false);
    setStudent(!student);
  };

  const [classVal, setClassVal] = useState('');

  const getStandard = async (e) => {
    const Standard = e.target.value
    if (Standard === "DEFAULT") {
      toast.error("Choose Correct Data", { position: toast.POSITION.TOP_RIGHT });
    }
    else {
      const response = await fetch(apiConst.get_all_classes_std_wise, {
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
    }
  }

  const getClassCode = async (e) => {
    const S_Class_code = e.target.value
    setClassVal(e.target.value)

    if (S_Class_code === "DEFAULT") {
      toast.error("Choose Correct Data", { position: toast.POSITION.TOP_RIGHT });
    } else {


      const response = await fetch(apiConst.fetch_all_students, {
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
    }
  }

  //------------------------Add Complain for Teacher---------------------

  const [newComplain, setNewComplain] = useState({
    Complain_title: "",
    Complain_description: "",
    user: ""
  })

  const AddComplainTeacher = async (e) => {
    e.preventDefault();
    const {
      Complain_title,
      Complain_description,
      user
    } = newComplain;

    const User_Id = user.split('/')[1];
    const User_name = user.split('/')[0];
    const Groups = "Teacher"

    const response = await fetch(apiConst.send_complains_to_the_t_S, {
      method: 'POST',
      body: JSON.stringify({
        Complain_title,
        Complain_description,
        User_Id,
        User_name,
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
      toast.success("Complain added successfully", { position: toast.POSITION.TOP_RIGHT });
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

  const onChnageComplain = (e) => {
    console.log(e.target.value);
    setNewComplain({ ...newComplain, [e.target.name]: e.target.value })
  }

  //------------------------Add Complain for Teacher---------------------

  //------------------------Add Complain for Student---------------------

  const [newComplainS, setNewComplainS] = useState({
    Complain_title: "",
    Complain_description: "",
    sUser: ""
  })

  const AddComplainStudent = async (e) => {
    e.preventDefault();
    const {
      Complain_title,
      Complain_description,
      sUser
    } = newComplainS;

    const User_Id = sUser.split('/')[1];
    const User_name = sUser.split('/')[0];
    const Groups = "Student"

    const response = await fetch(apiConst.send_complains_to_the_t_S, {
      method: 'POST',
      body: JSON.stringify({
        Complain_title,
        Complain_description,
        User_Id,
        User_name,
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
      fetchDataS();
      toast.success("Complain added successfully", { position: toast.POSITION.TOP_RIGHT });
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

  const onChnageComplainS = (e) => {
    setNewComplainS({ ...newComplainS, [e.target.name]: e.target.value })
  }

  //------------------------Add Complain Student---------------------

  //------------------------------- Fetch Complain Teacher------------------------------
  const [complainsT, setComplainsT] = useState([]);

  const fetchData = async () => {
    const Groups = "Teacher"
    try {
      const response = await fetch(apiConst.fetch_all_complains_of_admin, {
        method: "POST",
        body: JSON.stringify({ Groups }),
        headers: {
          "Content-Type": "application/json",
          "authToken_admin": localStorage.getItem("AToken")
        },
      });
      const jsonData = await response.json();
      setComplainsT(jsonData); // Update the state with the received data array
    } catch (error) {
      console.error(error);
    }
  };

  //------------------------------- Fetch Complain Teacher------------------------------

  //------------------------------- Fetch Complain STUDENT------------------------------
  const [complainsS, setComplainsS] = useState([]);

  const fetchDataS = async () => {
    const Groups = "Student"
    try {
      const response = await fetch(apiConst.fetch_all_complains_of_admin, {
        method: "POST",
        body: JSON.stringify({ Groups }),
        headers: {
          "Content-Type": "application/json",
          "authToken_admin": localStorage.getItem("AToken")
        },
      });
      const jsonData = await response.json();
      setComplainsS(jsonData); // Update the state with the received data array
    } catch (error) {
      console.error(error);
    }
  };

  //------------------------------- Fetch Complain STUDENT------------------------------

  //-----------------------Delete Complain --------------------------------

  const deleteRest = (id) => {
    fetch(apiConst.delete_complains + id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "authToken_admin": localStorage.getItem("AToken"),
      },
    }).then((result) => {
      result.json().then((resp) => {
        if (resp.success) {
          toast.success("Event Deleted Successfully", { position: toast.POSITION.TOP_RIGHT });
          fetchData();
          fetchDataS();
        }
        else {
          toast.error(resp.error, { position: toast.POSITION.TOP_RIGHT });
        }
      })
    })
  }

  //--------------------Delete Complain --------------------------------

  //--------------------Edit Complain --------------------------------
  const ref2 = useRef(null);

  const [updateEvents, setUpdateEvents] = useState({
    Complain_title: "",
    Complain_description: "",
  })

  const updateRestEvents = (currentEvents) => {
    ref2.current.click();
    setUpdateEvents({
      id: currentEvents._id,
      Complain_title: currentEvents.Complain_title,
      Complain_description: currentEvents.Complain_description,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    RestUpdateEvents(
      updateEvents.id,
      updateEvents.Complain_title,
      updateEvents.Complain_description,
    );
  }

  const RestUpdateEvents = async (id, Complain_title, Complain_description) => {

    const responseHoliday = await fetch(apiConst.edit_complains + id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "authToken_admin": localStorage.getItem("AToken"),
      },
      body: JSON.stringify({ Complain_title, Complain_description })
    });

    // console.log(responseHoliday);
    const json = await responseHoliday.json();

    // console.log(json);
    if (json.success === true) {
      refClose2.current.click();
      fetchDataS();
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
    setUpdateEvents({ ...updateEvents, [e.target.name]: e.target.value });
  }

  //--------------------Edit Complain --------------------------------

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
              <h3>Complain For</h3>
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
                      {complainsT && complainsT.map((a, i) => (
                        <tr key={i}>
                          <td>{a.User_Id}</td>
                          <td>{a.User_name}</td>
                          <td>{a.Complain_title}</td>
                          <td>{a.Complain_description}</td>
                          <td>{a.Date.split('T')[0]}</td>
                          <td className="edit-delete">
                            <BiEditAlt style={{ cursor: "pointer" }} size={30} onClick={() => updateRestEvents(a)} />
                            <FaRegTrashAlt className="FaRegTrashAlt" style={{ cursor: "pointer", marginLeft: "10px" }} size={20} onClick={() => deleteRest(a._id)} />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  )}
                  {student && (
                    <tbody>
                      {complainsS && complainsS.map((a, i) => (
                        <tr key={i}>
                          <td>{a.User_Id}</td>
                          <td>{a.User_name}</td>
                          <td>{a.Complain_title}</td>
                          <td>{a.Complain_description}</td>
                          <td>{a.Date.split('T')[0]}</td>
                          <td className="edit-delete">
                            <BiEditAlt style={{ cursor: "pointer" }} size={30} onClick={() => updateRestEvents(a)} />
                            <FaRegTrashAlt className="FaRegTrashAlt" style={{ cursor: "pointer", marginLeft: "10px" }} size={20} onClick={() => deleteRest(a._id)} />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  )}
                </>
              </table>

              {/* ------------------------ Update Complain MODAL     -----------------------------  */}
              <button type="button" ref={ref2} style={{ display: "none" }} className="btn btn-primary" data-bs-target="#edit_complain" data-bs-toggle="modal">
                Launch demo modal
              </button>
              {/* ------------------------ Update Complain MODAL     -----------------------------  */}

              <div
                className="modal fade"
                id="edit_complain"
                tabIndex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header1">
                      <div className="h_timetable">
                        <div className="hTable_title">
                          <label htmlFor="">Complain Title</label>
                          <input type="text" placeholder="Fees notification" name="Complain_title" value={updateEvents.Complain_title} onChange={onChanges} />
                        </div>

                        <div className="hTable_note">
                          <label>Note</label>
                          <input type="text" name="Complain_description" value={updateEvents.Complain_description} onChange={onChanges} />
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
                        <button className="save_btn" onClick={handleSubmit}> SAVE</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>


              {/* --------------------------------Add Complain-------------------------------------- */}
              <div
                className="modal fade"
                id="add_Holiday"
                tabIndex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header1">
                      <div className="h_timetable">

                        <h3>Complain For</h3>
                        <div className="eventfor_holiday">
                          <input type="radio" checked={teacher} onChange={handleTeacher} name="Group" value="Teacher" />
                          <label htmlFor="Teacher"> Teacher</label>
                          <input type="radio" checked={student} onChange={handleStudent} name="Group" value="Student" />
                          <label htmlFor="Student"> Student</label>
                        </div>

                        {/* Teacher ADD */}
                        {teacher && (
                          <>
                            <div className="hTable_name">
                              <label htmlFor="">Teacher Name</label>
                              <select className="any-options" name='user' required id='User_name' defaultValue={"DEFAULT"} onChange={onChnageComplain}>
                                <option value="DEFAULT" disabled>Select Teacher Name</option>
                                {teachers && teachers.map((item, index) => (
                                  <option value={item.T_name + "/" + item.T_icard_Id} key={index}>
                                    {item.T_name}
                                  </option>
                                ))}
                              </select>
                            </div>

                            <div className="hTable_title" style={{ paddingTop: "30px" }}>
                              <label htmlFor="">Complain Title</label>
                              <input type="text" placeholder="Complain title" name="Complain_title" onChange={onChnageComplain} />
                            </div>

                            <div className="hTable_note">
                              <label>Complain</label>
                              <input type="text" name="Complain_description" placeholder="Complain description" onChange={onChnageComplain} />
                            </div>

                            <button
                              type="button"
                              className="btn-close"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                              ref={refClose}
                            ></button>

                            <div className="modal-footer">
                              <div className="hTable_btn">
                                <button className="save_btn" onClick={AddComplainTeacher}> SAVE</button>
                              </div>
                            </div>
                          </>
                        )}
                        {/* Teacher ADD */}

                        {/* Student Add */}

                        {student && (
                          <>
                            <div className="hTable_name">
                              <label htmlFor="">Student Standard</label>
                              <select className="any-options" name='Standard' onChange={getStandard}>
                                <option value="DEFAULT" >Select Standard</option>
                                {YourRestList && YourRestList.map((item, index) => (
                                  <option value={item?.Standard} key={index}>
                                    {item.Standard}
                                  </option>
                                ))}
                              </select>
                            </div>

                            <div className="hTable_name">
                              <label htmlFor="">Student Class</label>
                              <select className="any-options" name='SClass' id="sclass" value={classVal} onChange={getClassCode}>
                                <option value="DEFAULT" >Select Class</option>
                                {stdData && stdData.map((item, index) => (
                                  <option value={item} key={index}>
                                    {item}
                                  </option>
                                ))}
                              </select>
                            </div>

                            <div className="hTable_name">
                              <label htmlFor="">Student Name</label>
                              {
                                getStudent === "Student Not Found"
                                  ?
                                  <select className="any-options" name='name' required id='name' defaultValue={"DEFAULT"}>
                                    <option value="DEFAULT" disabled>Data Not Found</option>
                                  </select>
                                  :
                                  <select className="any-options" name='sUser' required id='Standard' onChange={onChnageComplainS} defaultValue={"DEFAULT"}>
                                    <option value="DEFAULT" disabled>Select Student</option>
                                    {getStudent && getStudent.map((item, index) => (
                                      <option value={item.S_name + "/" + item.S_icard_Id} key={index}>
                                        {item.S_name}
                                      </option>
                                    ))}
                                  </select>
                              }
                            </div>

                            <div className="hTable_title" style={{ paddingTop: "30px" }}>
                              <label htmlFor="">Complain Title</label>
                              <input type="text" placeholder="Complain title" name="Complain_title" onChange={onChnageComplainS} />
                            </div>

                            <div className="hTable_note">
                              <label>Complain</label>
                              <input type="text" name="Complain_description" placeholder="Complain description" onChange={onChnageComplainS} />
                            </div>

                            <button
                              type="button"
                              className="btn-close"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                              ref={refClose}
                            ></button>

                            <div className="modal-footer">
                              <div className="hTable_btn">
                                <button className="save_btn" onClick={AddComplainStudent}> SAVE</button>
                              </div>
                            </div>
                          </>
                        )}

                        {/* Student Add */}
                      </div>
                    </div>
                  </div>
                </div>
                {/* --------------------------------Add Complain-------------------------------------- */}
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default Complain;
