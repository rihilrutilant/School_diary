import React, { useCallback } from 'react'
import "../Style/Subject.css"
import { useState } from 'react';
import { ReactSession } from 'react-client-session';
import Api_keys from '../Api_keys'
import Navbar from './Navbar';
import Topbar from './Topbar';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import { useRef } from 'react';
import { AiFillDelete } from 'react-icons/ai';

const SubjectData = () => {
    ReactSession.setStoreType("localStorage");
    const Data = ReactSession.get("jenish");

    let DataStudent = '';
    if (typeof Data === 'string') {
        DataStudent = Data.substring(0, 2);
    }

    const [navVisible, showNavbar] = useState(true);

    //-----------------Fetch Subjects ----------------

    const [allSubject, setAllSubject] = useState([]);
    const getSubject = useCallback(async () => {
        const Standard = DataStudent;
        const response = await fetch(Api_keys.get_all_subjects_class_wise, {
            method: "POST",
            body: JSON.stringify({ Standard }),
            headers: {
                "Content-Type": "application/json",
                "authToken_admin": localStorage.getItem("AToken")
            },
        });
        const json = await response.json();
        setAllSubject(json);
    }, [DataStudent]);

    //-----------------Fetch Subjects ----------------

    //-----------------Add Subject -------------------

    const refClose = useRef(null)

    const [newSubjects, setNewSubjects] = useState({
        Standard: "",
        Subject_Name: "",
        Subject_Code: "",
    })

    console.log(newSubjects.Subject_Code);
    const addSubject = async (e) => {
        e.preventDefault();
        const Standard = DataStudent;
        const {
            Subject_Name,
            Subject_Code
        } = newSubjects;
        const response = await fetch(Api_keys.create_subject, {
            method: 'POST',
            body: JSON.stringify({
                Standard,
                Subject_Name,
                Subject_Code
            }),
            headers: {
                'Content-Type': 'application/json',
                'authToken_admin': localStorage.getItem("AToken")
            }
        });

        const json = await response.json();
        console.log(json);
        if (json.success) {
            refClose.current.click();
            toast.success("Subject added successfully", { position: toast.POSITION.TOP_RIGHT });
            getSubject();
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

    const onChangesSubject = (e) => {
        setNewSubjects({ ...newSubjects, [e.target.name]: e.target.value })
    }
    // const [dynamicValue, setDynamicValue] = useState('');
    // const onChangesSubject = (e) => {
    //     if (e.target.name === 'Subject_Code') {
    //         const inputValue = e.target.value;
    //         setDynamicValue(inputValue.slice(2))
    //         setNewSubjects({ dynamicValue, [e.target.name]: e.target.value })
    //     } else {
    //         setNewSubjects({ ...newSubjects, [e.target.name]: e.target.value })
    //     }
    // }

    //-----------------Add Subject -------------------

    //---------------------- Delete Subject --------------------

    const deleteRest = (id) => {
        fetch(Api_keys.delete_subject + id, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "authToken_admin": localStorage.getItem("AToken"),
            },
        }).then((result) => {
            result.json().then((resp) => {
                if (resp.success) {
                    toast.success("Subject Deleted Successfully", { position: toast.POSITION.TOP_RIGHT });
                    getSubject();
                }
                else {
                    toast.error(resp.error, { position: toast.POSITION.TOP_RIGHT });
                }
            })
        })
    };

    //---------------------- Delete Subject --------------------

    useEffect(() => {
        getSubject();
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
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
                            <h3>Subjects / <span>{DataStudent}</span></h3>
                            <button className='studentid_create' data-bs-toggle="modal" data-bs-target="#event_one">+ Generate Subject</button>
                        </div>
                        <table className='subject-table'>
                            <tbody>
                                <tr>
                                    <th>Subject Code</th>
                                    <th>Subject Name</th>
                                    <th></th>
                                </tr>
                                {
                                    allSubject === "Subject Not Found" ?
                                        <h2 style={{ color: "#E33535" }}>Results not found</h2>
                                        :
                                        allSubject && allSubject.map((d, i) => {
                                            return (
                                                <tr key={i}>
                                                    <td>{d.Subject_Code}</td>
                                                    <td>{d.Subject_Name}</td>
                                                    <td>
                                                        <div className='delete-btn-r'>
                                                            <AiFillDelete style={{ cursor: "pointer", fontSize: "21px" }} onClick={() => deleteRest(d._id)} />
                                                        </div>
                                                    </td>
                                                </tr>

                                            )
                                        })
                                }
                            </tbody>
                        </table>
                    </div>

                    {/* ------------------------Add Subject-------------------------- */}

                    <div className="modal fade" id="event_one" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header1">
                                    <div className="addEvent_modal">
                                        <div className="eventModal_table">
                                            <div className="sTable_title">
                                                <label>Standard</label><br />
                                                <input type="text" id='Standard' value={DataStudent} readOnly name="Standard" onChange={onChangesSubject} />
                                            </div>
                                            <div className="sTable_title">
                                                <label>Subject Code</label><br />
                                                <input type="text" name="Subject_Code" onChange={onChangesSubject} id='Subject_Code' maxLength={5} />
                                                {/* value={`${DataStudent}${dynamicValue}`} */}
                                            </div>
                                            <div className="sTable_title">
                                                <label>Subject Name</label><br />
                                                <input type="text" name="Subject_Name" onChange={onChangesSubject} id='Subject_Name' />
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
                                        <button className="save_btn" onClick={addSubject}> SAVE</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ------------------------Add Subject-------------------------- */}
                </div>
            </div>
        </>
    )
}

export default SubjectData