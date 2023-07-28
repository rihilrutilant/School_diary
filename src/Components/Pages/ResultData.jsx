import React, { useCallback, useEffect, useState } from 'react'
import Navbar from './Navbar';
import Topbar from './Topbar';
import { ReactSession } from 'react-client-session';
import Api_keys from '../Api_keys'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import "../Style/Result.css"
import { AiFillDelete } from 'react-icons/ai';
import { MdOutlineOpenInFull } from 'react-icons/md'
import { Link } from 'react-router-dom';

const ResultData = ({ imageUrl }) => {
    ReactSession.setStoreType("localStorage");
    const Data = ReactSession.get("jenish");

    let DataStudent = '';
    if (typeof Data === 'string') {
        DataStudent = Data.substring(0, 2);
    }

    let DataStudClass = '';
    if (typeof Data === 'string') {
        DataStudClass = Data.substring(2);
    }
    const DataClass = DataStudent + '/' + DataStudClass;

    const [navVisible, showNavbar] = useState(true);

    //----------------- Fetch all students  ------------------------------

    const [studentClass, setStudentClass] = useState([]);
    const S_Class_code = Data

    const getAllStudent = useCallback(async () => {
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
            setStudentClass("Student Not Found")
        } else {
            setStudentClass(json);
        }
    }, [S_Class_code]);

    //----------------- Fetch Student ------------------------------


    //-----------------Fetch Results ----------------

    const [allReslt, setAllReslt] = useState([]);

    const getResult = async (studentId) => {
        const S_icard_Id = studentId;
        const response = await fetch(Api_keys.fetch_results_of_student, {
            method: "POST",
            body: JSON.stringify({ S_icard_Id }),
            headers: {
                "Content-Type": "application/json",
                "authToken_admin": localStorage.getItem("AToken")
            },
        });
        const json = await response.json();
        setAllReslt(json);
    };

    //-----------------Fetch Results ----------------

    //----------------------- Add Result --------------------

    const [resultData, setResultData] = useState({
        S_icard_Id: '',
        Result_Title: '',
        Term: '',
        result_photos: null,
    });

    const clearFields = () => {
        setResultData('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('S_icard_Id', resultData.S_icard_Id);
            formData.append('Result_Title', resultData.Result_Title);
            formData.append('Term', resultData.Term);
            formData.append('result_photos', resultData.result_photos);

            const response = await axios.post(Api_keys.upload_results, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "authToken_admin": localStorage.getItem("AToken"),
                }
            });
            if (response.data.success) {
                toast.success("Result generated successfully", { position: toast.POSITION.TOP_RIGHT });
                // getResult();
                clearFields();
            }
            else {
                toast.error(response.data.error, { position: toast.POSITION.TOP_RIGHT });
            }
        } catch (error) {
            toast.error(error.response.data.error[0].msg, { position: toast.POSITION.TOP_RIGHT });
        }
    }

    const onChange1 = (e) => {
        if (e.target.name === 'result_photos') {
            setResultData({ ...resultData, [e.target.name]: e.target.files[0] });
        } else {
            setResultData({ ...resultData, [e.target.name]: e.target.value });
        }
    }

    //----------------------- Add Result --------------------

    //---------------------- Delete Event --------------------

    const deleteRest = (id, studentId) => {
        const S_icard_Id = studentId;
        fetch(Api_keys.delete_results + id, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "authToken_admin": localStorage.getItem("AToken"),
            },
        }).then((result) => {
            result.json().then((resp) => {
                if (resp.success) {
                    toast.success("Result Deleted Successfully", { position: toast.POSITION.TOP_RIGHT });
                }
                else {
                    toast.error(resp.error, { position: toast.POSITION.TOP_RIGHT });
                }
            })
        })
    };

    //---------------------- Delete Event --------------------

    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        // getResult();
        getAllStudent();
    }, [getAllStudent]);

    return (
        <>
            <ToastContainer />
            <div className="main-content">
                <Navbar visible={navVisible} show={showNavbar} />
                <div className="inner-main-content"  >
                    <Topbar />
                    <div className="container-fluid">
                        <div className='studentid_cnt'>
                            <div className='breadcumb-part d-flex'>
                                <h3><Link style={{ textDecoration: "none", color: "#28A7E8" }} to='/Result'>Result / </Link></h3>
                                <h3 className='breadcumb-active'>Class - {DataClass}</h3>
                            </div>
                            <button className='studentid_create' data-bs-toggle="modal" data-bs-target="#staticBackdrop">+ Generate Result</button>
                        </div>
                        <div className='studentid_detail'>
                            {
                                studentClass.length === 0 ?
                                    <h2 style={{ color: "#E33535" }}>Students not found</h2>
                                    :
                                    studentClass && studentClass.map((d, i) => {
                                        return (
                                            <button className="studentid_btn" key={i}>
                                                <div className="t_name" onClick={() => getResult(d.S_icard_Id)} data-bs-toggle="modal" data-bs-target="#staticBackdrop123">
                                                    {d.S_name}
                                                </div>
                                            </button>
                                        )
                                    })
                            }
                        </div>
                    </div>
                    {/*  */}
                    {/* generate Result */}
                    <div className="modal fade sp_model_1" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content editid_modal">
                                <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                                <form onSubmit={handleSubmit} className="editid_form">
                                    <div className='input_part idcard_input'>
                                        <label>Student Name</label><br />
                                        <select className="any-options" onChange={onChange1} name='S_icard_Id' required id='S_icard_Id' defaultValue={"DEFAULT"}>
                                            <option value="DEFAULT" disabled>Select Student Name</option>
                                            {
                                                studentClass && studentClass.map((item, index) => (
                                                    <option value={item.S_icard_Id} key={index}>
                                                        {item.S_name}
                                                    </option>
                                                ))
                                            }
                                        </select>
                                        <input type="text" id="S_icard_Id" name="S_icard_Id" required value={resultData.S_icard_Id} onChange={onChange1} />
                                    </div>
                                    <div className='input_part name_input'>
                                        <label>Result Title</label> <br />
                                        <input type="text" id="Result_Title" name="Result_Title" required value={resultData.Result_Title} onChange={onChange1} />
                                    </div>
                                    <div className='input_part name_input'>
                                        <label>Select Term</label> <br />
                                        <select className="any-options" defaultValue={"DEFAULT"} name="Term" id="Term" required onChange={onChange1}>
                                            <option value="DEFAULT" disabled>Select Term</option>
                                            <option value="Weekly">Weekly</option>
                                            <option value="Monthly">Monthly</option>
                                            <option value="First Term">First Term</option>
                                            <option value="Second Term">Second Term</option>
                                        </select>
                                    </div>
                                    <div className='input_part standard_input'>
                                        <label>Upload Result</label> <br />
                                        <input type="file" accept="application/pdf" required name="result_photos" onChange={onChange1} /><br />
                                    </div>
                                    <div className="save_part">
                                        <button className="save_btn" data-bs-dismiss="modal" type="submit">SAVE</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    {/* generate Result */}

                    {/* Fetch Result */}
                    <div className="modal fade" id="staticBackdrop123" aria-labelledby="staticBackdropLabel" aria-hidden="true" tabIndex="-1">
                        <div className="modal-dialog">
                            <div className="modal-content editid_modal">
                                <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                                <div className="all-the-data">
                                    {allReslt === "No Result Found" ? <h2 style={{ color: "red" }}>Results Not Available</h2> :
                                        allReslt.length > 0 && allReslt.map((item, index) => (
                                            <div key={index}>
                                                <div className="main-div-flex">
                                                    <label className='label-title' htmlFor="">Id Card:</label>&nbsp;&nbsp;
                                                    <label className='label-des'>{item.S_icard_Id}</label>
                                                </div>
                                                <div className="main-div-flex">
                                                    <label htmlFor="" className='label-title'>Result Title:</label>&nbsp;&nbsp;
                                                    <label className='label-des'>{item.Result_Title}</label>
                                                </div>
                                                <div className="main-div-flex">
                                                    <label htmlFor="" className='label-title'>Term:</label>&nbsp;&nbsp;
                                                    <label className='label-des'>{item.Term}</label>
                                                </div>
                                                <div className="main-div-flex">
                                                    <label htmlFor="" className='label-title'>Document:</label>&nbsp;&nbsp;

                                                    {
                                                        item.Result_copy && (item.Result_copy.slice(-4).toLowerCase() === ".pdf" ? (
                                                            <iframe
                                                                src={`https://api.nutanpublic.naavhub.com/result_data/${item.Result_copy}`}
                                                                title={item.Result_copy}
                                                                className='height-and'
                                                            ></iframe>
                                                        ) : (
                                                            <img
                                                                src={`https://api.nutanpublic.naavhub.com/result_data/${item.Result_copy}`}
                                                                alt={item.Result_copy}
                                                                className='height-and'
                                                            />
                                                        ))
                                                    }
                                                </div>
                                                <div className='open-full'>
                                                    <Link target='_blank' to={`https://api.nutanpublic.naavhub.com/result_data/${item.Result_copy}`}>
                                                        <MdOutlineOpenInFull />
                                                    </Link>
                                                </div>
                                                <div className='delete-btn-r'>
                                                    <AiFillDelete style={{ cursor: "pointer", fontSize: "27px" }} onClick={() => deleteRest(item._id)} />
                                                </div>
                                            </div>
                                        ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Fetch Result */}
                </div>
            </div >
        </>
    )
}

export default ResultData