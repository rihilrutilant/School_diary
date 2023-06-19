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

const ResultData = () => {
    ReactSession.setStoreType("localStorage");
    const Data = ReactSession.get("jenish");

    const DataStudent = Data.substring(0, 2);
    const DataStudClass = Data.substring(2);
    const DataClass = DataStudent + '/' + DataStudClass;

    const [navVisible, showNavbar] = useState(true);

    //----------------- Fetch all students  ------------------------------

    const [studentClass, setStudentClass] = useState();
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

    useEffect(() => {
        getAllStudent();
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }, [getAllStudent]);

    //----------------- Fetch Student ------------------------------

    //----------------------- Add Result --------------------

    const [resultData, setResultData] = useState({
        S_icard_Id: '',
        Result_Title: '',
        Term: '',
        result_photos: null,
    });

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
                toast.success("Reuslt generated successfully", { position: toast.POSITION.TOP_RIGHT });
                setResultData({
                    S_icard_Id: '',
                    Result_Title: '',
                    Term: '',
                    result_photos: null,
                });
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

    //-----------------Fetch Notices ----------------

    const [allReslt, setAllReslt] = useState([]);

    const getResult = async (studentId) => {
        let S_icard_Id = studentId;
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

    //-----------------Fetch Notices ----------------

    //---------------------- Delete Event --------------------

    const deleteRest = (id) => {
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
                    getResult();
                }
                else {
                    toast.error(resp.error, { position: toast.POSITION.TOP_RIGHT });
                }
                getResult()
            })
        })
    }

    //---------------------- Delete Event --------------------

    useEffect(() => {
        getResult();
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }, []);

    return (
        <>
            <ToastContainer />
            <div className="main-content">
                <Navbar visible={navVisible} show={showNavbar} />
                <div className="inner-main-content"  >
                    <Topbar />
                    <div className="container-fluid">
                        <div className='studentid_cnt'>
                            <h3>Students / <span>{DataClass}</span></h3>
                            <button className='studentid_create' data-bs-toggle="modal" data-bs-target="#staticBackdrop">+ Generate Result</button>
                        </div>
                        <div className='studentid_detail'>
                            {
                                studentClass === "Student Not Found" ?
                                    <h2 style={{ color: "#E33535" }}>Results not found</h2>
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
                                        <label>ID Card</label> <br />
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
                    <div className="modal fade" id="staticBackdrop123" aria-labelledby="staticBackdropLabel" aria-hidden="true" tabindex="-1">
                        <div className="modal-dialog">
                            <div className="modal-content editid_modal">
                                <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                                <div className="all-the-data">
                                    {allReslt === "No Result Found" ? <h2 style={{ color: "red" }}>Data Results Available</h2> :
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
                                                                src={`http://localhost:5050/result_data/${item.Result_copy}`}
                                                                title={item.Result_copy}
                                                                className='height-and'
                                                            ></iframe>
                                                        ) : (
                                                            <img
                                                                src={`http://localhost:5050/result_data/${item.Result_copy}`}
                                                                alt={item.Result_copy}
                                                                className='height-and'
                                                            />
                                                        ))
                                                    }
                                                </div>
                                                <AiFillDelete style={{ cursor: "pointer" }} onClick={() => deleteRest(item._id)} />
                                            </div>
                                        ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Fetch Result */}

                </div>
            </div>
        </>
    )
}

export default ResultData