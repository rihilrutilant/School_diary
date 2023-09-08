import React, { useEffect, useState, useRef, useCallback } from 'react'
import Navbar from "../Pages/Navbar"
import Topbar from './Topbar';
import { ReactSession } from 'react-client-session';
import "../Style/StudentData.css";
import Edit from "../Images/edit.svg"
import Delete from "../Images/delete.svg"
import { Link } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Api_keys from '../Api_keys'
import teacher from '../Images/teacher.png';

const StudentData = () => {

    ReactSession.setStoreType("localStorage");
    const Data = ReactSession.get("username");


    const DataStudent = Data.substring(0, 2);
    const DataStudClass = Data.substring(2);
    const DataClass = DataStudent + '/' + DataStudClass


    const [navVisible, showNavbar] = useState(true);



    //----------------- Create a new Student ------------------------------
    const [credentials, setCredentials] = useState({
        S_icard_Id: "",
        S_name: "",
        S_mobile_no: "",
        S_address: "",
        S_Password: ""
    });

    const handleSubmit = async (e) => {

        e.preventDefault();
        const S_standard = DataStudent
        const S_Class_code = Data
        const { S_icard_Id,
            S_name,
            S_mobile_no,
            S_address,
            S_Password
        } = credentials;
        const response = await fetch(Api_keys.create_students, {
            method: 'POST',
            body: JSON.stringify({
                S_icard_Id,
                S_name,
                S_mobile_no,
                S_address,
                S_standard,
                S_Class_code,
                S_Password
            }),
            headers: {
                'Content-Type': 'application/json',
                'authToken_admin': localStorage.getItem("AToken")
            }
        });

        const json = await response.json();
        if (json.success) {
            toast.success("Student Created", { position: toast.POSITION.TOP_RIGHT });
            const timer = setTimeout(() => {
                getYourRestaurant();
            }, 1000);
            return () => clearTimeout(timer);
        }
        else {
            toast.error(json.error, { position: toast.POSITION.TOP_RIGHT });
        }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    }

    //----------------- Fetch all students  ------------------------------

    const [YourRestList, YoursetRestList] = useState();
    const S_Class_code = Data

    const getYourRestaurant = useCallback(async () => {
        const response = await fetch(Api_keys.fetch_all_students, {
            method: "POST",
            body: JSON.stringify({
                S_Class_code
            }),
            headers: {
                "Content-Type": "application/json",
                "authToken_admin": localStorage.getItem("AToken")
            },
        });

        const json = await response.json();
        if (json.success === false) {
            YoursetRestList("Student Not Found")
        } else {
            YoursetRestList(json);
        }
    }, [S_Class_code]);

    //----------------- Edit a new Student ------------------------------

    const ref = useRef(null);

    const [UpDatestudent, setUpDatestudent] = useState({
        S_icard_Id: "",
        S_name: "",
        S_mobile_no: "",
        S_address: "",
        S_Password: ""
    });


    const updatestudent = (currentstd) => {
        ref.current.click();
        setUpDatestudent({
            id: currentstd._id,
            S_icard_Id: currentstd.S_icard_Id,
            S_name: currentstd.S_name,
            S_mobile_no: currentstd.S_mobile_no,
            S_address: currentstd.S_address,
            S_Password: currentstd.S_Password
        })
    }

    const studentUpdate = (e) => {
        e.preventDefault()
        updateStds(
            UpDatestudent.id,
            UpDatestudent.S_icard_Id,
            UpDatestudent.S_name,
            UpDatestudent.S_mobile_no,
            UpDatestudent.S_address,
            UpDatestudent.S_Password
        )

    }

    const updateStds = async (id, S_icard_Id, S_name, S_mobile_no, S_address, S_Password) => {
        const S_standard = DataStudent
        const S_Class_code = Data
        const response = await fetch(Api_keys.update_student_details + id, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "authToken_admin": localStorage.getItem("AToken")
            },
            body: JSON.stringify({ S_icard_Id, S_name, S_mobile_no, S_address, S_standard, S_Class_code, S_Password }),
        });
        const json = await response.json();
        if (json.success === true) {
            getYourRestaurant();
            toast.success("Student update succssfully", { position: toast.POSITION.TOP_RIGHT });
        }
        else {
            if (!json.error) {
                toast.error("Please enter valid fields", { position: toast.POSITION.TOP_RIGHT });
            }
            else {
                toast.error(json.error, { position: toast.POSITION.TOP_RIGHT });
            }
        }
    }

    const onChanges = (e) => {
        setUpDatestudent({ ...UpDatestudent, [e.target.name]: e.target.value });
    }


    //----------------- Delete a new Student ------------------------------

    const deleteStudent = async (id) => {
        const response = await fetch(Api_keys.delete_students_info + id, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "authToken_admin": localStorage.getItem("AToken")
            },
        });
        const json = await response.json();
        if (json.success === true) {
            getYourRestaurant();
            toast.success("Student delete succssfully", { position: toast.POSITION.TOP_RIGHT });
        }
        else {
            toast.error(json.error, { position: toast.POSITION.TOP_RIGHT });
        }
    }

    // -------------------Show all details of the teachers----------------------
    const ref3 = useRef(null);

    const [S_Details, setS_Details] = useState({
        S_icard_Id: "",
        S_name: "",
        S_mobile_no: "",
        S_address: "",
        S_photo: "",
        S_standard: "",
        S_Class_code: "",
        S_img: "",
        S_father_img: "",
        S_mother_img: ""
    })
    const teacherDetails = (S_data) => {
        ref3.current.click();
        setS_Details({
            S_icard_Id: S_data.S_icard_Id,
            S_name: S_data.S_name,
            S_mobile_no: S_data.S_mobile_no,
            S_address: S_data.S_address,
            S_photo: S_data.S_photo,
            S_standard: S_data.S_standard,
            S_Class_code: S_data.S_Class_code,
            S_img: S_data.S_img,
            S_father_img: S_data.S_father_img,
            S_mother_img: S_data.S_mother_img
        });
    }
    // -------------------Show all details of the teachers----------------------

    useEffect(() => {
        getYourRestaurant();
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }, [getYourRestaurant]);


    return (
        <>
            <ToastContainer />
            <div className="main-content">
                <Navbar visible={navVisible} show={showNavbar} />
                <div className="inner-main-content"  >
                    <Topbar />
                    <div className="container-fluid">
                        <div className='studentid_cnt'>
                            <h3>Generate ID / <span>{DataClass}</span></h3>
                            <button className='studentid_create' data-bs-toggle="modal" data-bs-target="#staticBackdrop">+ Generate Student ID</button>
                        </div>
                        <div className='studentid_detail'>
                            {
                                YourRestList === "Student Not Found" ?
                                    <h2 style={{ color: "#E33535" }}>Student not found</h2>
                                    :
                                    YourRestList && YourRestList.map((d, i) => (
                                        <button className='studentid_btn' key={i}>
                                            <div className="t_name" onClick={() => teacherDetails(d)}>
                                                {d.S_name}
                                            </div>
                                            <Link className="edit_btn" to="#" onClick={() => updatestudent(d)}>
                                                <img src={Edit} alt="edit" />
                                            </Link>
                                            <Link className='delete_btn' to="#" onClick={() => deleteStudent(d._id)}>
                                                <img src={Delete} alt="delete" />
                                            </Link></button>
                                    ))
                            }
                        </div>

                        {/* generate student */}
                        <div className="modal fade sp_model_1" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                            <div className="modal-dialog">
                                <div className="modal-content editid_modal">
                                    <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                                    <form id="editid_form" className="editid_form" onSubmit={handleSubmit}>
                                        <div className='input_part idcard_input'>
                                            <label>ID Card</label> <br />
                                            <input type="text" id="idcard" name="S_icard_Id" required onChange={onChange} />
                                        </div>
                                        <div className='input_part name_input'>
                                            <label>Name</label> <br />
                                            <input type="text" id="name" name="S_name" required onChange={onChange} />
                                        </div>
                                        <div className='input_part standard_input'>
                                            <label>Standard</label> <br />
                                            <input type="text" id="standard" value={DataStudent} name="S_standard" onChange={onChange} />
                                        </div>
                                        <div className='input_part classcode_input'>
                                            <label>Class Code</label> <br />
                                            <input type="text" id="classcode" value={Data} name="S_Class_code" onChange={onChange} />
                                        </div>
                                        <div className='input_part mobile_input'>
                                            <label>Mobile</label> <br />
                                            <input type="text" id="mobile" name="S_mobile_no" required onChange={onChange} />
                                        </div>
                                        <div className='input_part address_input'>
                                            <label>Address</label> <br />
                                            <input type="text" id="address" name="S_address" required onChange={onChange} />
                                        </div>
                                        <div className='input_part password_input'>
                                            <label>Password</label> <br />
                                            <input type="password" id="password" name="S_Password" required onChange={onChange} />
                                        </div>
                                        <div className="save_part">
                                            <button className="save_btn" data-bs-dismiss="modal" type="submit">SAVE</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        {/* generate student */}



                        {/* edit students  */}
                        <button type="button" ref={ref} style={{ display: "none" }} className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#editModal">
                            Launch demo modal
                        </button>
                        <div className="modal" id="editModal">
                            <div className="modal-dialog">
                                <div className="modal-content generateid_modal">
                                    <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                                    <form id="generateid_form" className="generateid_form">
                                        <div className='input_part idcard_input'>
                                            <label>ID Card</label> <br />
                                            <input type="text" id="idcard1" value={UpDatestudent.S_icard_Id} onChange={onChanges} name="S_icard_Id" required />
                                        </div>
                                        <div className='input_part name_input'>
                                            <label>Name</label> <br />
                                            <input type="text" id="name1" value={UpDatestudent.S_name} onChange={onChanges} name="S_name" required />
                                        </div>
                                        <div className='input_part standard_input'>
                                            <label>Standard</label> <br />
                                            <input type="text" id="standard1" value={DataStudent} readOnly name="S_standard" required />
                                        </div>
                                        <div className='input_part classcode_input'>
                                            <label>Class Code</label> <br />
                                            <input type="text" id="classcode1" value={Data} readOnly name="S_Class_code" required />
                                        </div>
                                        <div className='input_part mobile_input'>
                                            <label>Mobile</label> <br />
                                            <input type="number" id="mobile1" value={UpDatestudent.S_mobile_no} onChange={onChanges} name="S_mobile_no" required />
                                        </div>
                                        <div className='input_part address_input'>
                                            <label>Address</label> <br />
                                            <input type="text" id="address1" value={UpDatestudent.S_address} onChange={onChanges} name="S_address" required />
                                        </div>
                                        <div className='input_part password_input'>
                                            <label>Password</label> <br />
                                            <input type="password" id="password1" value={UpDatestudent.S_Password} onChange={onChanges} name="S_Password" required />
                                        </div>
                                        <div className="save_part">
                                            <button className="save_btn" onClick={studentUpdate} data-bs-dismiss="modal" type="submit">SAVE</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                        {/* edit students  */}

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
                                                {!S_Details.S_img
                                                    ?
                                                    <img src={teacher} alt=" " />
                                                    :
                                                    <img src={`https://api.nutanpublic.naavhub.com/student_img/${S_Details.S_img}`} alt=" " />
                                                }
                                                <p>Student Photo</p>
                                            </div>
                                            <div className="first-photo">
                                                {!S_Details.S_father_img
                                                    ?
                                                    <img src={teacher} alt=" " />
                                                    :
                                                    <img src={`https://api.nutanpublic.naavhub.com/student_img/${S_Details.S_father_img}`} alt=" " />
                                                }
                                                <p>Father Photo</p>
                                            </div>
                                            <div className="first-photo">
                                                {!S_Details.S_mother_img
                                                    ?
                                                    <img src={teacher} alt=" " />
                                                    :
                                                    <img src={`https://api.nutanpublic.naavhub.com/student_img/${S_Details.S_mother_img}`} alt=" " />
                                                }
                                                <p>Mother Photo</p>
                                            </div>
                                        </div>
                                        <div className="lower-section-onlydata">
                                            <div className="dust-div">
                                                <span className='title-onlydata'>Id card  id : </span>
                                                <span className='data-onlydata'>{S_Details.S_icard_Id}</span>
                                            </div>
                                            <div className="dust-div">
                                                <span className='title-onlydata'>Name : </span>
                                                <span className='data-onlydata'>{S_Details.S_name}</span>
                                            </div>
                                            <div className="dust-div">
                                                <span className='title-onlydata'>Standard : </span>
                                                <span className='data-onlydata'>{S_Details.S_standard}</span>
                                            </div>
                                            <div className="dust-div">
                                                <span className='title-onlydata'>Class code : </span>
                                                <span className='data-onlydata'>{S_Details.S_Class_code}</span>
                                            </div>
                                            <div className="dust-div">
                                                <span className='title-onlydata'>Mobile No. : </span>
                                                <span className='data-onlydata'>{S_Details.S_mobile_no}</span>
                                            </div>
                                            <div className="dust-div">
                                                <span className='title-onlydata'>Address : </span>
                                                <span className='data-onlydata'>{S_Details.S_address}</span>
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
        </>
    )
}

export default StudentData;