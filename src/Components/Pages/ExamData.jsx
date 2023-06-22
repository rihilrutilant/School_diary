import React from 'react'
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
import { useRef } from 'react';

const ExamData = () => {

    ReactSession.setStoreType("localStorage");
    const Data = ReactSession.get("jenish123");

    let DataStudent = '';
    if (typeof Data === 'string') {
        DataStudent = Data.substring(0, 2);
    }

    const [navVisible, showNavbar] = useState(true);

    //----------------------------- Fetch Exam ------------------------

    const [allSubject, setAllSubject] = useState([]);
    const [notDataForm, setNotDataForm] = useState(false);

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

        if (json.length === 0) {
            setNotDataForm(true)
        }
        else {
            setAllSubject(json[0].Exam_Type)
            setAllSubject(json[0].Exam_TimeTable)
        }
    }, [DataStudent]);

    //----------------------------- Fetch Exam ------------------------

    //----------------------------- Create Exam -----------------------

    const [credentials, setCredentials] = useState({
        Standard: "",
        Exam_Type: "",
        Exam_TimeTable: [
            {
                Subject_code: "",
                Date: "",
                EndTime: "",
                StartTime: "",
                Marks: ""
            }],
    });

    const handleSubmit = async (e) => {

        e.preventDefault();
        const Standard = DataStudent;
        const {
            Exam_Type,
            Exam_TimeTable: [
                { Subject_code,
                    Date,
                    EndTime,
                    StartTime,
                    Marks }]
        } = credentials;
        const response = await fetch(apiConst.set_examtimetable, {
            method: 'POST',
            body: JSON.stringify({
                Standard,
                Exam_Type,
                Exam_TimeTable: [
                    {
                        Subject_code,
                        Date,
                        EndTime,
                        StartTime,
                        Marks
                    }]
            }),
            headers: {
                'Content-Type': 'application/json',
                'authToken_admin': localStorage.getItem("AToken")
            }
        });

        const json = await response.json();
        console.log(json);
        if (json.success) {
            toast.success("Student Created", { position: toast.POSITION.TOP_RIGHT });
        }
        else {
            toast.error(json.error, { position: toast.POSITION.TOP_RIGHT });
        }
    }

    const onChange = (e) => {
        if (e.target.name === 'Subject_code' || e.target.name === 'Date' ||
            e.target.name === 'EndTime' || e.target.name === 'StartTime' ||
            e.target.name === 'Marks') {
            const updatedExamTimeTable = credentials.Exam_TimeTable.map((item) => {
                return { ...item, [e.target.name]: e.target.value };
            });
            setCredentials({ ...credentials, Exam_TimeTable: updatedExamTimeTable });
        } else {
            setCredentials({ ...credentials, [e.target.name]: e.target.value });
        }
    }


    //----------------------------- Create Exam -----------------------

    // ---------------------------- Updadte Exam ----------------------

    const ref = useRef(null);

    const [updateExam, setUpdateExam] = useState({
        Subject_code: "",
        Marks: "",
        Date: "",
        StartTime: "",
        EndTime: ""
    })


    const updateRestExam = (currentExam) => {
        ref.current.click();
        setUpdateExam({
            id: currentExam._id,
            Subject_code: currentExam.Subject_code,
            Marks: currentExam.Marks,
            Date: currentExam.Date,
            StartTime: currentExam.StartTime.split('T')[0],
            EndTime: currentExam.EndTime.split('T')[0]
        })
    }

    const handleSubmitExam = (e) => {
        e.preventDefault();
        RestUpdateHoliday(
            updateExam.id,
            updateExam.Subject_code,
            updateExam.Marks,
            updateExam.Date,
            updateExam.StartTime,
            updateExam.EndTime
        );
    }

    const RestUpdateHoliday = async (id, Subject_code, Marks, Date, StartTime, EndTime) => {
        const responseHoliday = await fetch(apiConst.edit_examtimetable + id, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "authToken_admin": localStorage.getItem("AToken"),
            },
            body: JSON.stringify({ Subject_code, Marks, Date, StartTime, EndTime })
        });

        // console.log(responseHoliday);
        const json = await responseHoliday.json();

        // console.log(json);
        if (json.success === true) {
            ref.current.click();
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
        setUpdateExam({ ...updateExam, [e.target.name]: e.target.value });
    }
    // ---------------------------- Updadte Exam ----------------------

    useEffect(() => {
        getSubject();
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }, [getSubject]);

    return (
        <>
            <ToastContainer />
            <div className="main-content">
                <Navbar visible={navVisible} show={showNavbar} />
                <div className="inner-main-content"  >
                    <Topbar />
                    <div className="container-fluid">
                        <div className='studentid_cnt'>
                            <h3>Exam / <span>{DataStudent}</span></h3>
                            <button className='studentid_create' data-bs-toggle="modal" data-bs-target="#staticBackdrop">+ Generate Exam</button>
                        </div>
                        <table className='subject-table'>
                            <tbody>
                                {
                                    notDataForm === false
                                        ?
                                        <>
                                            <tr>
                                                <th>Subject code</th>
                                                <th>Marks</th>
                                                <th>Date</th>
                                                <th>Start Time</th>
                                                <th>End Time</th>
                                                <th></th>
                                            </tr>
                                            {allSubject.map((subject, index) => (
                                                <tr key={index}>
                                                    <td>{subject.Subject_code}</td>
                                                    <td>{subject.Marks}</td>
                                                    <td>{subject.Date}</td>
                                                    <td>{subject.StartTime}</td>
                                                    <td>{subject.EndTime}</td>
                                                    <td><BiEditAlt style={{ cursor: "pointer" }} size={30} onClick={() => updateRestExam(subject)} />
                                                    </td>
                                                </tr>
                                            ))}
                                        </>
                                        :
                                        <h1>Not Available</h1>
                                }
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
                                        <label>Subject Code</label> <br />
                                        <input type="text" value={credentials.Exam_TimeTable[0].Subject_code} name="Subject_code" onChange={onChange} />
                                    </div>
                                    <div className='input_part idcard_input'>
                                        <label>Exam_Type</label> <br />
                                        <input type="text" id="Exam_Type" name="Exam_Type" required onChange={onChange} />
                                    </div>
                                    <div className='input_part idcard_input'>
                                        <label>Mark</label> <br />
                                        <input type="text" value={credentials.Exam_TimeTable[0].Marks} name="Marks" required onChange={onChange} />
                                    </div>
                                    <div className='input_part idcard_input'>
                                        <label>Date</label> <br />
                                        <input type="date" value={credentials.Exam_TimeTable[0].Date} name="Date" required onChange={onChange} />
                                    </div>
                                    <div className='input_part idcard_input'>
                                        <label>Start Time</label> <br />
                                        <input type="text" value={credentials.Exam_TimeTable[0].StartTime} name="StartTime" required onChange={onChange} />
                                    </div>
                                    <div className='input_part idcard_input'>
                                        <label>End Time</label> <br />
                                        <input type="text" value={credentials.Exam_TimeTable[0].EndTime} name="EndTime" required onChange={onChange} />
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

                    <button type="button" ref={ref} style={{ display: "none" }} className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exam_one">
                        Launch demo modal
                    </button>

                    <div className="modal fade sp_model_1" id="exam_one" data-bs-backdrop="static" data-bs-keyboard="false" aria-labelledby="staticBackdropLabel" aria-hidden="true" tabIndex='-1'>
                        <div className="modal-dialog">
                            <div className="modal-content editid_modal">
                                <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                                <form id="editid_form" className="editid_form" onSubmit={handleSubmitExam}>
                                    <div className='input_part idcard_input'>
                                        <label>Subject Code</label> <br />
                                        <input type="text" id="Subject_code" name="Subject_code" value={updateExam.Subject_code} required onChange={onChanges} />
                                    </div>
                                    <div className='input_part idcard_input'>
                                        <label>Marks</label> <br />
                                        <input type="text" id="Marks" name="Marks" required value={updateExam.Marks} onChange={onChanges} />
                                    </div>
                                    <div className='input_part idcard_input'>
                                        <label>Date</label> <br />
                                        <input type="text" id="Date" name="Date" value={updateExam.Date} required onChange={onChanges} />
                                    </div>
                                    <div className='input_part idcard_input'>
                                        <label>Start Time</label> <br />
                                        <input type="text" id="StartTime" name="StartTime" value={updateExam.StartTime} required onChange={onChanges} />
                                    </div>
                                    <div className='input_part idcard_input'>
                                        <label>End Time</label> <br />
                                        <input type="text" id="EndTime" name="EndTime" value={updateExam.EndTime} required onChange={onChanges} />
                                    </div>
                                    <div className="save_part">
                                        <button className="save_btn" type="submit">SAVE</button>
                                    </div>
                                </form>
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