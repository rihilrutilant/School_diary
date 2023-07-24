import React, { useRef } from 'react'
import "../Style/Exam.css"
import { ReactSession } from 'react-client-session';
import Topbar from './Topbar';
import Navbar from './Navbar';
import { useState } from 'react';
import apiConst from "../Api_keys"
import { useCallback } from 'react';
import { useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BiEditAlt } from 'react-icons/bi';
import axios from 'axios';
import { AiFillEye } from 'react-icons/ai';
import { Link } from 'react-router-dom';

let DataStudent = '';
const ExamData = () => {
    ReactSession.setStoreType("localStorage");
    const Data = ReactSession.get("standardCode");

    if (typeof Data === 'string') {
        DataStudent = Data.substring(0, 2);
    }
    const [navVisible, showNavbar] = useState(true);

    //----------------------------- Fetch Exam ------------------------

    const [allSubject, setAllSubject] = useState([]);
    const getSubject = useCallback(async () => {
        const Standard = DataStudent;
        const response = await fetch(apiConst.fetch_all_examtimetable, {
            method: "POST",
            body: JSON.stringify({ Standard }),
            headers: {
                "Content-Type": "application/json",
                "authToken_admin": localStorage.getItem("AToken")
            },
        });
        const json = await response.json();
        setAllSubject(json)
    }, [DataStudent]);

    //----------------------------- Fetch Exam ------------------------

    //--------------------------- Create Exam --------------------

    const [examData, setExamData] = useState({
        Standard: DataStudent,
        Exam_Type: '',
        exam_tt_img: null,
    });

    const clearFields = () => {
        setExamData('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('Standard', examData.Standard);
            formData.append('Exam_Type', examData.Exam_Type);
            formData.append('exam_tt_img', examData.exam_tt_img);

            const response = await axios.post(apiConst.set_examtimetable, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "authToken_admin": localStorage.getItem("AToken"),
                }
            });

            if (response.data.success) {
                toast.success("Exam Time Table generated successfully", { position: toast.POSITION.TOP_RIGHT });
                getSubject();
                clearFields();
            }
            else {
                toast.error(response.data.error, { position: toast.POSITION.TOP_RIGHT });
            }
        } catch (error) {
            toast.error(error.response.data.error[0].msg, { position: toast.POSITION.TOP_RIGHT });
        }
    }

    const onChange = (e) => {
        if (e.target.name === 'exam_tt_img') {
            setExamData({ ...examData, [e.target.name]: e.target.files[0] });
        } else {
            setExamData({ ...examData, [e.target.name]: e.target.value });
        }
    }

    //--------------------------- Create Exam --------------------

    //--------------------------- Update Exam --------------------

    const ref = useRef(null);

    const [updateNotice, setUpdateNotice] = useState({
        exam_tt_img: null,
    })

    const updateRestNotice = (currentNotice) => {
        ref.current.click();
        setUpdateNotice({
            id: currentNotice._id,
            exam_tt_img: currentNotice.exam_tt_img
        })
    }

    const handleSubmit1 = (e) => {
        e.preventDefault();
        RestUpdateNotice(
            updateNotice.id,
            updateNotice.exam_tt_img
        );
    }

    const RestUpdateNotice = async (id, exam_tt_img) => {
        try {
            const updateformData = new FormData();
            updateformData.append('exam_tt_img', exam_tt_img);

            const response = await axios.patch(apiConst.edit_examtimetable + id, updateformData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "authToken_admin": localStorage.getItem("AToken"),
                }
            });

            if (response.data.success) {
                toast.success("Exam Updated Successfully", { position: toast.POSITION.TOP_RIGHT });
                getSubject();
            }
            else {
                toast.error(response.data.error, { position: toast.POSITION.TOP_RIGHT });
            }
        } catch (error) {
            toast.error(error.response.data.error[0].msg, { position: toast.POSITION.TOP_RIGHT });
        }
    }

    const onChanges = (e) => {
        if (e.target.name === 'exam_tt_img') {
            setUpdateNotice({ ...updateNotice, [e.target.name]: e.target.files[0] });
        } else {
            setUpdateNotice({ ...updateNotice, [e.target.name]: e.target.value });
        }
    }

    // ----------------------------------------------------------------Update Notices --------------------------------

    useEffect(() => {
        getSubject();
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }, [getSubject]);

    return (
        <>
            <ToastContainer />
            <div className="main-content exam-section">
                <Navbar visible={navVisible} show={showNavbar} />
                <div className="inner-main-content">
                    <Topbar />
                    <div className="container-fluid">
                        <div className='studentid_cnt'>
                            <div className='breadcumb-part d-flex'>
                                <h3><Link style={{ textDecoration: "none", color: "#28A7E8" }} to='/Exam'>Exam / </Link></h3>
                                <h3 className='breadcumb-active'>Class-{DataStudent}</h3>
                            </div>
                            <button className='studentid_create' data-bs-toggle="modal" data-bs-target="#staticBackdrop">+ Generate Exam</button>
                        </div>
                        <table className='subject-table'>
                            <thead>
                                <tr>
                                    <th className='text-center'>Standard</th>
                                    <th className='text-center'>Exam Type</th>
                                    <th className='text-center'>Document</th>
                                    <th colSpan={2} className="text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {allSubject.length === 0 ? (
                                    <tr>
                                        <td colSpan={4} className="text-center"><h1>Exams not found</h1></td>
                                    </tr>
                                )
                                    :
                                    allSubject && allSubject.map((item, index) => (
                                        <tr key={index}>
                                            <td>{item.Standard}</td>
                                            <td>{item.Exam_Type}</td>
                                            <td>{item.Exam_TimeTable && (item.Exam_TimeTable.slice(-4).toLowerCase() === ".pdf" ? (
                                                <iframe
                                                    src={`http://localhost:5050/exam_time_table/${item.Exam_TimeTable}`}
                                                    title={item.Exam_TimeTable}
                                                    className='height-and'
                                                ></iframe>
                                            ) : (
                                                <img
                                                    src={`http://localhost:5050/exam_time_table/${item.Exam_TimeTable}`}
                                                    alt={item.Exam_TimeTable}
                                                    className='height-and'
                                                />
                                            ))
                                            }
                                            </td>
                                            <td>
                                                <div className='delete-btn-r text-center'>
                                                    <BiEditAlt style={{ cursor: "pointer", fontSize: "25px" }} onClick={() => updateRestNotice(item)} />
                                                </div>
                                            </td>
                                            <td>
                                                <div className='open-full text-center'>
                                                    <Link target='_blank' to={`http://localhost:5050/exam_time_table/${item.Exam_TimeTable}`}>
                                                        <AiFillEye style={{ cursor: "pointer", fontSize: "25px" }} />
                                                    </Link>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>

                    {/* generate Exam */}
                    <div className="modal fade sp_model_1" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" aria-labelledby="staticBackdropLabel" aria-hidden="true" tabIndex='-1'>
                        <div className="modal-dialog">
                            <div className="modal-content editid_modal">
                                <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                                <form id="editid_form" className="editid_form" onSubmit={handleSubmit}>
                                    <div className='input_part idcard_input'>
                                        <label>Standard Code</label> <br />
                                        <input type="text" value={examData.Standard} name="Standard" readOnly />
                                    </div>
                                    <div className='input_part idcard_input'>
                                        <label>Exam Type</label> <br />
                                        <select className="any-options" defaultValue={"DEFAULT"} name="Exam_Type" id="Exam_Type" required onChange={onChange}>
                                            <option value="DEFAULT" disabled>Select Term</option>
                                            <option value="Weekly">Weekly</option>
                                            <option value="Monthly">Monthly</option>
                                            <option value="First Term">First Term</option>
                                            <option value="Second Term">Second Term</option>
                                        </select>
                                    </div>
                                    <div className='input_part idcard_input'>
                                        <label>Document</label> <br />
                                        <input type="file" accept="application/pdf" required name="exam_tt_img" onChange={onChange} /><br />
                                    </div>
                                    <div className="save_part">
                                        <button className="save_btn" data-bs-dismiss="modal" type="submit">SAVE</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    {/* generate Exam */}

                    {/* Update Exam */}
                    <button type="button" ref={ref} style={{ display: "none" }} className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#edit3">
                        Launch demo modal
                    </button>

                    <div className="modal fade" id="edit3" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <div className="update-part">
                                        <div className="first-part-update">
                                            <p className='send'>Send Notification</p>
                                            <div className="tb1-update ">
                                                <label className='amt' name='exam_tt_img'>Document</label>
                                                <input type="file" accept="image/*, application/pdf" onChange={onChanges} name='exam_tt_img' /><br />
                                                <p className='only-accepts'>(Only Accepts Images and PDF)</p><br />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn-upd" onClick={handleSubmit1} data-bs-dismiss="modal" aria-label="Close">UPDATE</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Update Exam */}

                </div>
            </div>
        </>
    )
}

export default ExamData