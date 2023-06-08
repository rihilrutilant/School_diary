import React, { useEffect, useState } from "react";
import "../Style/Result.css"
import Navbar from "../Pages/Navbar";
import Topbar from "./Topbar";

const AddResult = () => {
    const [navVisible, showNavbar] = useState(true);
    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }, []);
    const [numberOfTextBoxes, setNumberOfTextBoxes] = useState(0);

    const addTextBox = () => {
        setNumberOfTextBoxes(numberOfTextBoxes + 1);
    };
    const [display, setdisplay] = useState("none")
    const show = () => {
        setdisplay(display === "none" ? "block" : "none")
    }
    return (
        <>
            <div className="main-content">
                <Navbar visible={navVisible} show={showNavbar} />
                <div className="inner-main-content">
                    <Topbar />
                    <div className="container-fluid">
                        <h4 className="main-name">Add a exam result</h4>

                        <div className="r-info">
                            <div className="sel-sec">
                                <div className="cls1">
                                    <select className="form-select" aria-label="Default select example">
                                        <option selected disabled>Select Class</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="2">5</option>
                                        <option value="3">6</option>
                                        <option value="1">7</option>
                                        <option value="2">8</option>
                                        <option value="3">9</option>
                                        <option value="1">10</option>
                                        <option value="3">11</option>
                                        <option value="1">12</option>
                                    </select>
                                </div>
                                <div className="cls1">
                                    <select className="form-select" aria-label="Default select example">
                                        <option selected disabled>Exam Type</option>
                                        <option value="1">A</option>
                                        <option value="2">B</option>
                                        <option value="3">C</option>
                                        <option value="3">D</option>
                                    </select>
                                </div>
                                <div className="cls1">
                                    <select className="form-select" aria-label="Default select example">
                                        <option selected disabled>Select Division</option>
                                        <option value="1">
                                            Kenneth Donna <span>Roll no.01</span>
                                        </option>
                                        <option value="1">
                                            <div className="roll-info">
                                                <h3>Lucas Peterson </h3>
                                                <p>Roll no.02</p>
                                            </div>
                                        </option>
                                        <option value="1">
                                            <div className="roll-info">
                                                <h3>Manish Singh  </h3>
                                                <p>Roll no.03</p>
                                            </div>
                                        </option>
                                    </select>
                                </div>
                                <div className="cls1">
                                    <select className="form-select" aria-label="Default select example">
                                        <option selected disabled>Exam Type</option>
                                        <option value="1">First term</option>
                                        <option value="2">Second term</option>
                                        <option value="3">Final</option>
                                    </select>
                                </div>
                            </div>
                            <div className="t-btn1">
                                <button className='t-submit' onClick={show}>SUBMIT</button>
                            </div>
                        </div>


                        <div className="r-tab" style={{ display }}>


                            <div className="sub-inner-sec1">

                                <button className='s-add-btn' onClick={addTextBox} >+Add</button>
                            </div>

                            <div className="r-inner-part">


                                <div className='classtable_data1' >


                                    <table className='sub-table' >
                                        <tr className='f-row'>
                                            <th className='s-th'>Subject</th>
                                            <th className='s-th'>Marks from</th>
                                            <th className='s-th'>Marks to</th>
                                        </tr>
                                        <tr>
                                            <td className='innerdata s-th'>
                                                <select className="form-select1" aria-label="Default select example">
                                                    <option selected disabled>Select Class</option>
                                                    <option value="1">10</option>
                                                    <option value="1">9</option>
                                                    <option value="1">8</option>
                                                </select>
                                            </td>
                                            <td className='innerdata s-th'>
                                                <select className="form-select1" aria-label="Default select example">
                                                    <option selected disabled>Select Divison</option>
                                                    <option value="1">A</option>
                                                    <option value="1">B</option>
                                                    <option value="1">C</option>
                                                </select>
                                            </td>
                                            <td className='innerdata s-th'>
                                                <select className="form-select1" aria-label="Default select example">
                                                    <option selected disabled>Subject</option>
                                                    <option value="1">English</option>
                                                    <option value="1">Hindi</option>
                                                    <option value="1">Gujrati</option>
                                                </select>
                                            </td>
                                        </tr>
                                        {Array(numberOfTextBoxes).fill(0).map((_, index) => (
                                            <tr>
                                                <td className='innerdata s-th'>
                                                    <select className="form-select1" aria-label="Default select example">
                                                        <option selected disabled>Select Subject</option>
                                                        <option value="1">10</option>
                                                        <option value="1">9</option>
                                                        <option value="1">8</option>
                                                    </select>
                                                </td>
                                                <td className='innerdata s-th'>
                                                    <select className="form-select1" aria-label="Default select example">
                                                        <option selected disabled>Select Marks</option>
                                                        <option value="1">A</option>
                                                        <option value="1">B</option>
                                                        <option value="1">C</option>
                                                    </select>
                                                </td>
                                                <td className='innerdata s-th'>
                                                    <select className="form-select1" aria-label="Default select example">
                                                        <option selected disabled>Select Marks</option>
                                                        <option value="1">English</option>
                                                        <option value="1">Hindi</option>
                                                        <option value="1">Gujrati</option>
                                                    </select>
                                                </td>
                                            </tr>
                                        ))}

                                    </table>



                                </div>

                                <div className="ref-inner-2nd">

                                    <tr>
                                        <td className='innerdata s-th'>
                                            <select className="form-select12f" aria-label="Default select example">
                                                <option selected disabled>Total</option>
                                                <option value="1">10</option>
                                                <option value="1">9</option>
                                                <option value="1">8</option>
                                            </select>
                                        </td>

                                    </tr>
                                    <tr>
                                        <td className='innerdata s-th'>
                                            <select className="form-select12" aria-label="Default select example">
                                                <option selected disabled>Obtain Marks</option>
                                                <option value="1">10</option>
                                                <option value="1">9</option>
                                                <option value="1">8</option>
                                            </select>
                                        </td>

                                    </tr>
                                    <tr>
                                        <td className='innerdata s-th'>
                                            <select className="form-select12" aria-label="Default select example">
                                                <option selected disabled>Percent</option>
                                                <option value="1">10</option>
                                                <option value="1">9</option>
                                                <option value="1">8</option>
                                            </select>
                                        </td>

                                    </tr>
                                    <tr>
                                        <td className='innerdata s-th'>
                                            <select className="form-select12" aria-label="Default select example">
                                                <option selected disabled>Rank</option>
                                                <option value="1">10</option>
                                                <option value="1">9</option>
                                                <option value="1">8</option>
                                            </select>
                                        </td>

                                    </tr>


                                </div>

                            </div>

                            <button className='upd'>UPDATE</button>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
};

export default AddResult;
