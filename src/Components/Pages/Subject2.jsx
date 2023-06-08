import React, { useEffect, useState } from 'react'
import "../Style/Subject.css"
import Navbar from "./Navbar"
import Topbar from "./Topbar"

const Subject2 = () => {
    const [navVisible, showNavbar] = useState(true);
    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }, []);
    const [display, setDisplay] = useState('none')

    const data = () => {
        setDisplay(display === "block" ? "none" : "block")
    }
    const [numberOfTextBoxes, setNumberOfTextBoxes] = useState(0);
    const addTextBox = () => {
        setNumberOfTextBoxes(numberOfTextBoxes + 1);
    };

    return (
        <>
            <div className="main-content">
                <Navbar visible={navVisible} show={showNavbar} />
                <div className="inner-main-content"  >
                    <Topbar />
                    <div className="container-fluid">
                        {/* inner-header-sec */}
                        <div className="add-btn">
                            <h4 className='main-name'>Class Subject</h4>
                        </div>
                        <div className="cl-div-inner">
                            <div className="class-division">
                                <div className="cls">
                                    <select className="form-select" aria-label="Default select example">
                                        <option selected disabled>Select Class</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                        <option value="6">6</option>
                                        <option value="7">7</option>
                                        <option value="8">8</option>
                                        <option value="9">9</option>
                                        <option value="10">10</option>
                                        <option value="11">11</option>
                                        <option value="12">12</option>
                                    </select>
                                </div>
                                <div className="division">
                                    <select className="form-select" aria-label="Default select example">
                                        <option selected disabled>Select Division</option>
                                        <option value="1">A</option>
                                        <option value="2">B</option>
                                        <option value="3">C</option>
                                        <option value="4">D</option>
                                        <option value="2">E</option>
                                    </select>
                                </div>
                            </div>
                            <div className="sub-btn">
                                <button className='sub' onClick={data}>SUBMIT</button>
                            </div>
                        </div>
                        {/* --------------------------------------- */}
                        <div style={{ display }} >
                            <div className="sub-inner-sec">
                                <h3>Subject</h3>
                                <button className='s-add-btn' onClick={addTextBox}>+Add</button>
                            </div>
                            <div className='classtable_data'>
                                <table className='sub-table' >
                                    <tr className='f-row'>
                                        <th className='s-th'>Class</th>
                                        <th className='s-th'>Division</th>
                                        <th className='s-th'>Subject</th>
                                    </tr>

                                    {Array(numberOfTextBoxes).fill(0).map((_, index) => (
                                        <tr  >
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
                                    ))}
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
                                </table>
                                <div className="t-btn">
                                    <button className='t-submit'>SUBMIT</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Subject2