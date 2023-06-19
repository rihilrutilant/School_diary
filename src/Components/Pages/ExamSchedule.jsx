import React, { useEffect, useState } from 'react'
import { ReactSession } from 'react-client-session';
import "../Style/ExamSchedule.css"
import Navbar from "../Pages/Navbar"
import Topbar from './Topbar';
import Remove from "../Images/remove.svg"

const ExamSchedule = () => {
    const [navVisible, showNavbar] = useState(true);

    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }, []);

    ReactSession.setStoreType("localStorage");
    const Data1 = ReactSession.get("field1");
    const Data3 = ReactSession.get("field3");

    const [numberOfTextBoxes, setNumberOfTextBoxes] = useState(0);

    const addTextBox = () => {
        setNumberOfTextBoxes(numberOfTextBoxes + 1);
    };

    const DeleteBox = () => {
        setNumberOfTextBoxes(numberOfTextBoxes - 1);
    };

    // Add Exam Time Table

    // Add Exam Time Table

    return (
        <>
            <div className="main-content">
                <Navbar visible={navVisible} show={showNavbar} />
                <div className="inner-main-content"  >
                    <Topbar />
                    <div className="container-fluid">
                        <h4 className='main-name'>Exam Schedule / <span>{Data1} / {Data3}</span></h4>
                        <button className='examschedule_add' onClick={addTextBox}>+ Add</button>
                        <div className='examschedule_t_data'>
                            <table className='examschedule_table'>
                                <thead>
                                    <tr>
                                        <th>Subject</th>
                                        <th>Marks</th>
                                        <th>Standard</th>
                                        <th>Date</th>
                                        <th>Start time</th>
                                        <th>End time</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            <select>
                                                <option value="" disabled>Select Subject</option>
                                                <option value="First term">Science</option>
                                                <option value="Second term">Maths</option>
                                                <option value="Final">English</option>
                                                <option value="Final">Hindi</option>
                                            </select>
                                        </td>
                                        <td>
                                            <select>
                                                <option value="" disabled>Select Marks</option>
                                                <option value="First term">100</option>
                                                <option value="Second term">50</option>
                                                <option value="Final">30</option>
                                            </select>
                                        </td>
                                        <td>
                                            <select>
                                                <option value="" disabled>Select standard</option>
                                                <option value="First term">1</option>
                                                <option value="Second term">2</option>
                                                <option value="Final">3</option>
                                                <option value="Final">4</option>
                                                <option value="First term">5</option>
                                                <option value="Second term">6</option>
                                                <option value="Final">7</option>
                                                <option value="Final">8</option>
                                                <option value="First term">9</option>
                                                <option value="Second term">10</option>
                                                <option value="Final">11</option>
                                                <option value="Final">12</option>
                                            </select>
                                        </td>
                                        <td>
                                            <input type="date" placeholder='Select Date' />
                                        </td>
                                        <td>
                                            <input type="time" placeholder='Select Date' />
                                        </td>
                                        <td>
                                            <input type="time" placeholder='Select Date' />
                                        </td>
                                        <td>
                                            <button className='examschedule_delete'><img src={Remove} alt="remove img" /></button>
                                        </td>
                                    </tr>
                                    {Array(numberOfTextBoxes).fill(0).map((_, index) => (
                                        <tr key={index}>
                                            <td>
                                                <select>
                                                    <option value="" disabled>Select Subject</option>
                                                    <option value="First term">Science</option>
                                                    <option value="Second term">Maths</option>
                                                    <option value="Final">English</option>
                                                    <option value="Final">Hindi</option>
                                                </select>
                                            </td>
                                            <td>
                                                <select>
                                                    <option value="" disabled>Select Marks</option>
                                                    <option value="First term">100</option>
                                                    <option value="Second term">50</option>
                                                    <option value="Final">30</option>
                                                </select>
                                            </td>
                                            <td>
                                                <select>
                                                    <option value="" disabled>Select standard</option>
                                                    <option value="First term">1</option>
                                                    <option value="Second term">2</option>
                                                    <option value="Final">3</option>
                                                    <option value="Final">4</option>
                                                    <option value="First term">5</option>
                                                    <option value="Second term">6</option>
                                                    <option value="Final">7</option>
                                                    <option value="Final">8</option>
                                                    <option value="First term">9</option>
                                                    <option value="Second term">10</option>
                                                    <option value="Final">11</option>
                                                    <option value="Final">12</option>
                                                </select>
                                            </td>
                                            <td>
                                                <input type="date" placeholder='Select Date' />
                                            </td>
                                            <td>
                                                <input type="time" placeholder='Select Date' />
                                            </td>
                                            <td>
                                                <input type="time" placeholder='Select Date' />
                                            </td>
                                            <td>
                                                <button onClick={DeleteBox} className='examschedule_delete'><img src={Remove} alt="remove img" /></button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <button className='examschedule_save'>SAVE</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ExamSchedule