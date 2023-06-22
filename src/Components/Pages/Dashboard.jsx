import React, { useEffect, useState } from 'react'
import "../Style/Dashboard.css"
import Navbar from "../Pages/Navbar"
import Topbar from "../Pages/Topbar"
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Link } from 'react-router-dom'
import { FaAngleRight } from "react-icons/fa"
// import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import n1 from "../Images/n1.svg"
import n2 from "../Images/n2.svg"
import n3 from "../Images/n3.svg"
import n4 from "../Images/n4.svg"
import Graph from './Graph';
import 'react-toastify/dist/ReactToastify.css';
import apiConst from "../Api_keys"

const Dashboard = () => {
    // const [value, onChange] = useState(new Date());
    const [navVisible, showNavbar] = useState(true);

    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        getStudentCount();
        getTeachersCount();
        getclassesCount();
        getLatestNotices();
        getclasses();
        getEvents();
    }, []);

    const [percentage, setpercentage] = useState()
    const [percentage1, setpercentage1] = useState()
    const [percentage2, setpercentage2] = useState(50)

    function Example(props) {
        return (
            <div>
                <div className='example'>{props.children}</div>
            </div>
        );
    }


    // ----------- Fetch the count of the students --------------
    const getStudentCount = async () => {
        const response = await fetch(apiConst.count_students, {
            method: "POST",
            headers: {
                "authToken_admin": localStorage.getItem("AToken")
            },
        });
        const json = await response.json();
        setpercentage(json.count)
    };
    // ----------- Fetch the count of the students --------------


    // ----------- Fetch the count of the teachers --------------
    const getTeachersCount = async () => {
        const response = await fetch(apiConst.count_teachers, {
            method: "POST",
            headers: {
                "authToken_admin": localStorage.getItem("AToken")
            },
        });
        const json = await response.json();
        setpercentage1(json.count)
    };
    // ----------- Fetch the count of the teachers --------------


    // ----------- Fetch the count of the classes --------------
    const getclassesCount = async () => {
        const response = await fetch(apiConst.count_classes, {
            method: "POST",
            headers: {
                "authToken_admin": localStorage.getItem("AToken")
            },
        });
        const json = await response.json();
        setpercentage2(json.count)
    };
    // ----------- Fetch the count of the classes --------------


    // ----------- latest 2 notices----------------------

    const [latestNotices, setlatestNotices] = useState()
    const getLatestNotices = async () => {
        const response = await fetch(apiConst.get_two_notices, {
            method: "POST",
            headers: {
                "authToken_admin": localStorage.getItem("AToken")
            },
        });
        const json = await response.json();
        setlatestNotices(json)
    };

    const truncateString = (str, num) => {
        if (str?.length > num) {
            return str.slice(0, num) + '...';
        } else {
            return str;
        }
    }

    // ----------- latest 2 notices----------------------


    // ---------------fetch all standards-------------------
    const [classes, setclasses] = useState()
    const getclasses = async () => {
        const response = await fetch(apiConst.fetch_all_standards, {
            method: "POST",
            headers: {
                "authToken_admin": localStorage.getItem("AToken")
            },
        });
        const json = await response.json();
        setclasses(json)
    };
    // ---------------fetch all standards-------------------

    //------------------------- Fetch Events --------------------
    const [events, setEvents] = useState();
    console.log(events);
    const getEvents = async () => {
        const response = await fetch(apiConst.get_two_event, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "authToken_admin": localStorage.getItem("AToken")
            },
        });
        const json = await response.json();
        setEvents(json);
    };
    //------------------------- Fetch Events --------------------


    return (
        <>
            <div className="main-content">
                <Navbar visible={navVisible} show={showNavbar} />
                <div className="inner-main-content"  >
                    <Topbar />
                    <div className="container-fluid">
                        <h4 className='main-name'>Dashboard</h4>
                        {/* 1st Part */}
                        <div className="main-upper-dashboard">
                            <div className="first-student">
                                <div className="first-left-side">
                                    <img src={require("../Images/student.png")} alt="" />
                                    <div className="bvf">
                                        <p>Total Students</p>
                                        <span>{percentage} Students</span>
                                    </div>
                                </div>
                                <div className="first-right-side">
                                    <div className="first">
                                        <Example>
                                            <CircularProgressbar value={percentage} maxValue={1000} text={`${percentage}`} />
                                        </Example>
                                    </div>
                                </div>
                            </div>
                            <div className="second-student">
                                <div className="second-left-side">
                                    <img src={require("../Images/teacher.png")} alt="" />
                                    <div className="bvf">
                                        <p>Total Teacher</p>
                                        <span>{percentage1} Teacher</span>
                                    </div>
                                </div>
                                <div className="second-right-side">
                                    <div className="first">
                                        <Example>
                                            <CircularProgressbar value={percentage1} maxValue={100} text={`${percentage1}`} />
                                        </Example>
                                    </div>
                                </div>
                            </div>
                            <div className="second-student">
                                <div className="second-left-side">
                                    <img src={require("../Images/classroom.png")} alt="" />
                                    <div className="bvf">
                                        <p>Total Classroom</p>
                                        <span>{percentage2} Classroom</span>
                                    </div>
                                </div>
                                <div className="second-right-side">
                                    <div className="first">
                                        <Example>
                                            <CircularProgressbar value={percentage2} maxValue={100} text={`${percentage2}`} />
                                        </Example>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* 2nd Part */}
                        <div className="aandn">
                            <Graph />
                            <div className="noticeboard">
                                <div className="note-inner">
                                    <p className='ntc'>Noticeboard</p>
                                    <Link to={"/Notice"}><button> +Add</button></Link>
                                </div>
                                {
                                    latestNotices === "Data Not Found"
                                        ?
                                        <h3 style={{ color: "#E33535", textAlign: "center", marginBottom: "200px" }}>Data Not Found</h3>
                                        :
                                        latestNotices && latestNotices.map((item, index) => {
                                            return (
                                                <div className={index === 0 ? "sports-inner" : "sports-inner2"} key={index}>
                                                    <p className={index === 0 ? "spt" : "spt2"}>{item.Notice_title}</p>
                                                    <p className={index === 0 ? "spt-info" : 'spt-info2'}>{truncateString(item.Notice_description, 200)}</p>
                                                    <div className="de-class">
                                                        <p className={index === 0 ? "scls cl" : 'scls clr cl'}>{item.Group}</p>
                                                        <p className={index === 0 ? "scls" : 'scls clr'}>{item.Date.split('T')[0]}</p>
                                                    </div>
                                                </div>
                                            )
                                        })
                                }
                                <div className="v-all">
                                    <Link to={"/Notice"}>
                                        <button>View All<FaAngleRight /></button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        {/* 3rd Part */}
                        <div className="event-fees-part">
                            <div className="fees-part-inner">
                                <p className='u-event'>Upcoming events</p>
                                <div className="event-inner-sec">
                                    <div className="das-calender">
                                        {/* <div className="das-events_calender">
                                            <Calendar value={value} onChange={onChange}/>
                                        </div> */}
                                    </div>
                                    <div className="event-cel">
                                        {events === "Data Not Found"
                                            ?
                                            <h3 style={{ color: "#E33535", textAlign: "center", marginBottom: "200px" }}>Data Not Found</h3>
                                            :
                                            events && events.map((a, i) => (
                                                <div className="e1" key={i}>
                                                    <p className='spt-p' >{a.Event_title}</p>
                                                    <div className="s-date">
                                                        <p className='st'>{a.Groups}</p>
                                                        <p style={{ margin: "0px" }}>Date: {a.Event_Start.split('T')[0]}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        <div className="v-all">
                                            <Link to={"/Events"}>
                                                <button style={{ color: "white" }}>View All<FaAngleRight /></button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                                {/* <div className="lst-info">
                                    <div className="hday">
                                        <p style={{ margin: "0px" }}>Ram Navami</p>
                                    </div>
                                    <div className="v-all1">
                                        <Link to={"/Events"}>
                                            <button>View All<FaAngleRight /></button>
                                        </Link>
                                    </div>
                                </div> */}
                            </div>
                            <div className="fees-inner-sec">
                                <div className="pendding-fees-part">
                                    <p className='u-event'>Pending fees</p>
                                    <div className="sec-inner">
                                        <select defaultValue={"DEFAULT"} className='drop'>
                                            <option value="DEFAULT" disabled>Select Option</option>
                                            {
                                                classes && classes.map((item, k) => {
                                                    return (
                                                        <option key={k} value={item.Standard}>Class {item.Standard}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                    </div>
                                </div>
                                <div className="fees-info">
                                    <div className="fi1">
                                        <div className="flinner">
                                            <img src={n1} alt="" />
                                            <p className='r-ven'>Ramanuj venkata</p>
                                        </div>
                                        <Link to={"/"}>  <button className='notification-btn'>Send Notification</button></Link>
                                    </div>
                                    <div className="fi2">
                                        <div className="flinner">
                                            <img src={n2} alt="" />
                                            <p className='r-ven'>Brooklyn simmons</p>
                                        </div>
                                        <Link to={"/"}>  <button className='notification-btn'>Send Notification</button></Link>
                                    </div>
                                    <div className="fi3">
                                        <div className="flinner">
                                            <img src={n3} alt="" />
                                            <p className='r-ven'>Wade warren</p>
                                        </div>
                                        <Link to={"/"}>  <button className='notification-btn'>Send Notification</button></Link>
                                    </div>
                                    <div className="fi4">
                                        <div className="flinner">
                                            <img src={n4} alt="" />
                                            <p className='r-ven'>Theresa wabb</p>
                                        </div>
                                        <Link to={"/"}>  <button className='notification-btn'>Send Notification</button></Link>
                                    </div>
                                </div>
                                <div className="v-all12">
                                    <Link to={"/Fees"}>
                                        <button>View All<FaAngleRight /></button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}

export default Dashboard