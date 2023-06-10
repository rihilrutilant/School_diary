import React, { useCallback, useEffect, useRef, useState } from 'react'
import "../Style/Id.css"
import Navbar from "../Pages/Navbar"
import Topbar from './Topbar';
import { ReactSession } from 'react-client-session';
import { Link, useNavigate } from 'react-router-dom';
import Edit from "../Images/edit.svg"
import Delete from "../Images/delete.svg"
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Api_keys from '../Api_keys'
import teacher from '../Images/teacher.png';

const Id = () => {

  const refClose = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  const refClose2 = useRef(null);
  const navigate = useNavigate();
  //--------Main Content--------//

  ReactSession.setStoreType("localStorage");
  const [navVisible, showNavbar] = useState(true);

  const [checkbox1Checked, setCheckbox1Checked] = useState(true);
  const [checkbox2Checked, setCheckbox2Checked] = useState(false);
  const handleCheckbox1Change = () => {
    setCheckbox1Checked(!checkbox1Checked);
    setCheckbox2Checked(false);
  };

  const handleCheckbox2Change = () => {
    setCheckbox2Checked(!checkbox2Checked);
    setCheckbox1Checked(false);
  };

  const onChange = (event) => {
    const value = event.target.value;
    ReactSession.set("username", value);
    navigate('/StudentData')
    // window.location.href = `/StudentData`;
  };

  //-------Student Data--------/
  const [YourRestList, YoursetRestList] = useState();


  const getYourRestaurant = useCallback(async () => {
    const response = await fetch(Api_keys.fetch_all_standards,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "authToken_admin": localStorage.getItem("AToken")
        },
      });

    const json = await response.json();
    YoursetRestList(json);
  }, []);

  //-------Teacher Data ----------//

  const [teachers, setTeachers] = useState();

  const getTeachers = useCallback(async () => {
    const response = await fetch(Api_keys.fetch_all_teachers, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "authToken_admin": localStorage.getItem("AToken")
      },
    });

    const json = await response.json();
    setTeachers(json);
    // console.log(json);
  }, []);

  //-------Create Teacher ---------//


  const [credentials, setCredentials] = useState({
    T_icard_Id: "",
    T_name: "",
    T_mobile_no: "",
    T_address: "",
    Subject_code: "",
    T_Class_code: "",
    T_Password: ""
  });

  const handleSubmit = async (e) => {

    e.preventDefault();
    const {
      T_icard_Id,
      T_name,
      T_mobile_no,
      T_address,
      Subject_code,
      T_Class_code,
      T_Password
    } = credentials;
    const response = await fetch(Api_keys.create_teacher, {
      method: 'POST',
      body: JSON.stringify({
        T_icard_Id,
        T_name,
        T_mobile_no,
        T_address,
        Subject_code,
        T_Class_code,
        T_Password
      }),
      headers: {
        'Content-Type': 'application/json',
        'authToken_admin': localStorage.getItem("AToken")
      }
    });

    const json = await response.json();
    if (json.success) {
      getTeachers();
      refClose.current.click();
      toast.success("Teacher Created", { position: toast.POSITION.TOP_RIGHT });
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

  const onChange1 = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  }


  //---------Delete Teacher-------//
  function deleteRest(id) {
    fetch(Api_keys.delete_teachers_info + id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "authToken_admin": localStorage.getItem("AToken"),
      },
    }).then((result) => {
      result.json().then((resp) => {
        getTeachers();
      })
    })
  }

  //----------Update Teacher Data -----------//
  const [updateTeacher, setUpdateTeacher] = useState({
    T_icard_Id: "",
    T_name: "",
    T_mobile_no: "",
    T_address: "",
    Subject_code: "",
    T_Class_code: "",
    T_Password: ""
  })

  const updateRestTeacher = (currentTeacher) => {
    ref2.current.click();
    setUpdateTeacher({
      id: currentTeacher._id,
      T_icard_Id: currentTeacher.T_icard_Id,
      T_name: currentTeacher.T_name,
      T_mobile_no: currentTeacher.T_mobile_no,
      T_address: currentTeacher.T_address,
      Subject_code: currentTeacher.Subject_code,
      T_Class_code: currentTeacher.T_Class_code,
      T_Password: currentTeacher.T_Password
    })
  }

  const handleSubmit1 = (e) => {
    e.preventDefault();
    RestUpdateTeacher(
      updateTeacher.id,
      updateTeacher.T_Class_code,
      updateTeacher.T_Password,
      updateTeacher.T_address,
      updateTeacher.T_icard_Id,
      updateTeacher.T_mobile_no,
      updateTeacher.T_name,
      updateTeacher.Subject_code,
    );
  }

  const RestUpdateTeacher = async (id, T_Class_code, T_Password, T_address, T_icard_Id, T_mobile_no, T_name, Subject_code) => {
    const responseTeacher = await fetch(Api_keys.update_teacher_details + id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "authToken_admin": localStorage.getItem("AToken"),
      },
      body: JSON.stringify({ T_Class_code, T_Password, T_address, T_icard_Id, T_mobile_no, T_name, Subject_code })
    });

    const json = await responseTeacher.json();
    if (json.success) {
      refClose2.current.click();
      getTeachers();
      toast.success("Teacher Update", { position: toast.POSITION.TOP_RIGHT });
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
    setUpdateTeacher({ ...updateTeacher, [e.target.name]: e.target.value });
  }

  // -------------------Show all details of the teachers----------------------

  const [T_Details, setT_Details] = useState({
    T_icard_Id: "",
    T_name: "",
    T_mobile_no: "",
    T_address: "",
    Subject_code: "",
    T_Class_code: "",
    T_Password: ""
  })
  const teacherDetails = (T_data) => {
    ref3.current.click();
    setT_Details({
      T_icard_Id: T_data.T_icard_Id,
      T_name: T_data.T_name,
      T_mobile_no: T_data.T_mobile_no,
      T_address: T_data.T_address,
      Subject_code: T_data.Subject_code,
      T_Class_code: T_data.T_Class_code
    });
    teacherphotos(T_data.T_icard_Id);
  }
  // -------------------Show all details of the teachers----------------------

  // -------------------Show all photo of the teachers----------------------

  const [T_photos, setT_photos] = useState({
    T_icard_Id: "",
    T_img: ""
  });

  const teacherphotos = async (T_icard_Id) => {
    console.log(T_icard_Id);
    const response = await fetch(Api_keys.fetch_img_of_teacher, {
      method: "POST",
      body: JSON.stringify({
        T_icard_Id
      }),
      headers: {
        "Content-Type": "application/json",
        "authToken_admin": localStorage.getItem("AToken")
      },
    });

    const json = await response.json();
    setT_photos(json);
  }

  // -------------------Show all details of the teachers----------------------

  useEffect(() => {
    getYourRestaurant();
    getTeachers();
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, [getYourRestaurant, getTeachers]);


  return (
    <>
      <ToastContainer autoClose={2000} />
      <div className="main-content">
        <Navbar visible={navVisible} show={showNavbar} />
        <div className="inner-main-content"  >
          <Topbar />
          <div className="container-fluid">
            <h4 className='main-name'>Generate ID</h4>
            <div className='ganerate_id_part'>
              <div className='ganerate_id_check'>
                <h3>Generate ID for</h3>
                <label className='ganerateid_opt'>
                  <input type="radio" checked={checkbox1Checked} onChange={handleCheckbox1Change} />
                  Teacher
                </label>
                <label>
                  <input type="radio" checked={checkbox2Checked} onChange={handleCheckbox2Change} />
                  Students
                </label>
              </div>
              <div className='ganerateid_cnt'>
                <div className='ganerateid_cnt_inn'>

                  {checkbox1Checked && (
                    <div className='teacherid_check'>
                      <button className='teacherid_create' data-bs-toggle="modal" data-bs-target="#staticBackdrop">+ Generate ID</button>
                      <div className='teacherid_detail'>{
                        teachers && teachers.map((d, i) => (
                          <button className='studentid_btn' key={i}>
                            <div className="t_name" onClick={() => teacherDetails(d)}>
                              {d.T_name}
                            </div>
                            <Link className="edit_btn" onClick={() => updateRestTeacher(d)}>
                              <img src={Edit} alt="edit" />
                            </Link>
                            <Link className='delete_btn' onClick={() => deleteRest(d._id)}>
                              <img src={Delete} alt="delete" />
                            </Link>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {checkbox2Checked && (
                    <>
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
                    </>
                  )}

                  <button type="button" ref={ref2} style={{ display: "none" }} className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#editTeacherModal">
                    Launch demo modal
                  </button>
                  <div className="modal" id="editTeacherModal">
                    <div className="modal-dialog">
                      <div className="modal-content editid_modal">
                        <button type="button" className="btn-close" data-bs-dismiss="modal" ref={refClose2}></button>
                        <form id="editid_form1" className="editid_form">
                          <div className='input_part idcard_input'>
                            <label>ID Card</label> <br />
                            <input type="text" id="idcard1" name="T_icard_Id" required onChange={onChanges} value={updateTeacher.T_icard_Id} />
                          </div>
                          <div className='input_part name_input'>
                            <label>Name</label> <br />
                            <input type="text" id="name1" name="T_name" required onChange={onChanges} value={updateTeacher.T_name} />
                          </div>
                          <div className='input_part standard_input'>
                            <label>Subject code</label> <br />
                            <input type="text" id="standard1" name="Subject_code" required onChange={onChanges} value={updateTeacher.Subject_code} />
                          </div>
                          <div className='input_part classcode_input'>
                            <label>Class Code</label> <br />
                            <input type="text" id="classcode1" name="T_Class_code" required onChange={onChanges} value={updateTeacher.T_Class_code} />
                          </div>
                          <div className='input_part mobile_input'>
                            <label>Mobile</label> <br />
                            <input type="number" id="mobile1" name="T_mobile_no" required onChange={onChanges} value={updateTeacher.T_mobile_no} />
                          </div>
                          <div className='input_part address_input'>
                            <label>Address</label> <br />
                            <input type="text" id="address1" name="T_address" required onChange={onChanges} value={updateTeacher.T_address} />
                          </div>
                          <div className='input_part password_input'>
                            <label>Password</label> <br />
                            <input type="password" id="password1" name="T_Password" required onChange={onChanges} value={updateTeacher.T_Password} />
                          </div>
                          <div className="save_part">
                            <button className="save_btn" type="submit" onClick={handleSubmit1}>SAVE</button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>

                  <div className="modal fade sp_model_1" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div className="modal-dialog">
                      <div className="modal-content editid_modal">
                        <button type="button" className="btn-close" ref={refClose} data-bs-dismiss="modal"></button>
                        <form id="editid_form" className="editid_form" onSubmit={handleSubmit}>
                          <div className='input_part idcard_input'>
                            <label>ID Card</label> <br />
                            <input type="text" id="idcard" name="T_icard_Id" required onChange={onChange1} />
                          </div>
                          <div className='input_part name_input'>
                            <label>Name</label> <br />
                            <input type="text" id="name" name="T_name" required onChange={onChange1} />
                          </div>
                          <div className='input_part standard_input'>
                            <label>Subject code</label> <br />
                            <input type="text" id="standard" name="Subject_code" required onChange={onChange1} />
                          </div>
                          <div className='input_part classcode_input'>
                            <label>Class Code</label> <br />
                            <input type="text" id="classcode" name="T_Class_code" required onChange={onChange1} />
                          </div>
                          <div className='input_part mobile_input'>
                            <label>Mobile</label> <br />
                            <input type="number" id="mobile" name="T_mobile_no" required onChange={onChange1} />
                          </div>
                          <div className='input_part address_input'>
                            <label>Address</label> <br />
                            <input type="text" id="address" name="T_address" required onChange={onChange1} />
                          </div>
                          <div className='input_part password_input'>
                            <label>Password</label> <br />
                            <input type="password" id="password" name="T_Password" required onChange={onChange1} />
                          </div>
                          <div className="save_part">
                            <button className="save_btn" type="submit">SAVE</button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>


                  <button type="button" ref={ref3} style={{ display: "none" }} className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#onlyData">
                    Launch demo modal
                  </button>
                  <div className="modal fade sp_model_1" id="onlyData" data-bs-backdrop="static" data-bs-keyboard="false" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div className="modal-dialog">
                      <div className="modal-content nanu-model">
                        <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                        <form id="editid_form2" className="editid_form">
                          <div className="upper-section-onlydata">
                            <div className="first-photo">
                              {T_photos === null
                                ?
                                <img src={teacher} alt=" " />
                                :
                                <img src={`http://localhost:5050/teacher_img/${T_photos.T_img}`} alt=" " />
                              }
                              <p> Teacher Photo</p>
                            </div>
                          </div>
                          <div className="lower-section-onlydata">
                            <div className="dust-div">
                              <span className='title-onlydata'>Id card  id : </span>
                              <span className='data-onlydata'>{T_Details.T_icard_Id}</span>
                            </div>
                            <div className="dust-div">
                              <span className='title-onlydata'>Name : </span>
                              <span className='data-onlydata'>{T_Details.T_name}</span>
                            </div>
                            <div className="dust-div">
                              <span className='title-onlydata'>Subject Code : </span>
                              <span className='data-onlydata'>{T_Details.Subject_code}</span>
                            </div>
                            <div className="dust-div">
                              <span className='title-onlydata'>Class code : </span>
                              <span className='data-onlydata'>{T_Details.T_Class_code}</span>
                            </div>
                            <div className="dust-div">
                              <span className='title-onlydata'>Mobile No. : </span>
                              <span className='data-onlydata'>{T_Details.T_mobile_no}</span>
                            </div>
                            <div className="dust-div">
                              <span className='title-onlydata'>Address : </span>
                              <span className='data-onlydata'>{T_Details.T_address}</span>
                            </div>
                          </div>
                          {/* <p>{}</p> */}
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div >
    </>
  )
}

export default Id