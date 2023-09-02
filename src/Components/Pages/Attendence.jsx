import React from 'react'
import Topbar from './Topbar'
import Navbar from './Navbar'
import { useState } from 'react';
import apiConst from '../Api_keys';
import { useRef } from 'react';
import { useEffect } from 'react';

function Attendence() {
    const [navVisible, showNavbar] = useState(true);
    const [sheetData, setSheetData] = useState('')
    const [uploadDate, setUploadDate] = useState('')
    const [attendanceData, setAttendanceData] = useState([])
    const refClose = useRef(null)

    const uploadSheet = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append("sheet", sheetData)
        formData.append("uploadDate", uploadDate)
        console.log(uploadDate);
        try {
            const response = await fetch(apiConst.demo_attendance, {
                method: "POST",
                body: formData,
            });
            const jsonData = await response.json();
            console.log("🚀 ~ file: Attendence.jsx:28 ~ uploadSheet ~ jsonData:", jsonData)
            setSheetData("")
            setUploadDate("")
            refClose.current.click()
            getAllStudentData()
        } catch (error) {
            console.error(error);
        }
    }
    const getAllStudentData = async () => {
        try {
            const response = await fetch(apiConst.demo_attendance_fetch, {
                method: "GET",
            });
            const jsonData = await response.json();
            setAttendanceData(jsonData.data)
        } catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        getAllStudentData()
    }, [])
    return (
        <>
            <div className="main-content">
                <Navbar visible={navVisible} show={showNavbar} />
                <div className="inner-main-content">
                    <Topbar />
                    <div className="container-fluid">
                        <div className="add_hPlan">
                            <h4 className="main-name">Attendence</h4>
                            <button data-bs-target="#edit_complain" data-bs-toggle="modal">+ Add Sheet</button>
                        </div>
                        <section>
                            <table className="tab_holiday" style={{ marginBottom: "99px" }}>
                                <thead>
                                    <tr className="tbl-tr">
                                        <th>Code</th>
                                        <th>Name</th>
                                        <th>Device Code</th>
                                        <th>Gender</th>
                                        <th>Department</th>
                                        {/* <th>DOJ</th> */}
                                        {/* <th>DOC</th> */}
                                        <th>Status</th>
                                        {/* <th>DOR</th> */}
                                        <th>Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        attendanceData.map(items => (
                                            <tr>
                                                <td> {items.EmployeeCode} </td>
                                                <td> {items.EmployeeName} </td>
                                                <td> {items.DeviceCode} </td>
                                                <td> {items.Gender} </td>
                                                <td> {items.Department} </td>
                                                {/* <td> {items.DOJ} </td> */}
                                                {/* <td> {items.DOC} </td> */}
                                                <td> {items.Status} </td>
                                                {/* <td> {items.DOR} </td> */}
                                                <td> {items.uploadDate.split("T")[0]} </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </section>
                    </div>
                </div>
            </div>
            <div
                className="modal fade"
                id="edit_complain"
                tabIndex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <form encType='multipart/form-data' method="post" onSubmit={uploadSheet}>
                            <div className="modal-header1">
                                <div className="h_timetable">
                                    <div className="hTable_note ">
                                        <label htmlFor="Upload Sheet">Upload Sheet Date</label>
                                        <input type="date" name="uploadDate" onChange={(e) => setUploadDate(e.target.value)} />
                                        <label htmlFor="Upload Sheet">Upload Sheet</label>
                                        <input type="file" accept='.csv' name="sheet" onChange={(e) => setSheetData(e.target.files[0])} />
                                    </div>
                                </div>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" ref={refClose}></button>
                            </div>
                            <div className="modal-footer">
                                <div className="hTable_btn">
                                    <button className="save_btn" type='submit'> SAVE</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Attendence