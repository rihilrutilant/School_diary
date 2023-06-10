import React, { useCallback, useEffect, useState } from 'react'
import Navbar from './Navbar';
import Topbar from './Topbar';
import { ReactSession } from 'react-client-session';
import "../Style/Time.css"
import apiConst from "../Api_keys"


const TimeTableData = () => {

  const [navVisible, showNavbar] = useState(true);

  ReactSession.setStoreType("localStorage");
  const Data = ReactSession.get("username");


  const DataStudent = Data.substring(0, 2);
  const DataStudClass = Data.substring(2);
  const DataClass = DataStudent + '/' + DataStudClass

  const [day1, setDay1] = useState(true);
  const [day2, setDay2] = useState(false);
  const [day3, setDay3] = useState(false);
  const [day4, setDay4] = useState(false);
  const [day5, setDay5] = useState(false);
  const [day6, setDay6] = useState(false);

  const handleDay1 = () => {
    if (day1 === false) {
      setDay1(true)
      setDay2(false)
      setDay3(false)
      setDay4(false)
      setDay5(false)
      setDay6(false)
    }
  }
  const handleDay2 = () => {
    if (day2 === false) {
      setDay1(false)
      setDay2(true)
      setDay3(false)
      setDay4(false)
      setDay5(false)
      setDay6(false)
    }
  }
  const handleDay3 = () => {
    if (day3 === false) {
      setDay1(false)
      setDay2(false)
      setDay3(true)
      setDay4(false)
      setDay5(false)
      setDay6(false)
    }
  }
  const handleDay4 = () => {
    if (day4 === false) {
      setDay1(false)
      setDay2(false)
      setDay3(false)
      setDay4(true)
      setDay5(false)
      setDay6(false)
    }
  }
  const handleDay5 = () => {
    if (day5 === false) {
      setDay1(false)
      setDay2(false)
      setDay3(false)
      setDay4(false)
      setDay5(true)
      setDay6(false)
    }
  }
  const handleDay6 = () => {
    if (day6 === false) {
      setDay1(false)
      setDay2(false)
      setDay3(false)
      setDay4(false)
      setDay5(false)
      setDay6(true)
    }
  }

  //-------Teacher Data ----------//

  const [teachers, setTeachers] = useState();

  const getTeachers = useCallback(async () => {
    const response = await fetch(apiConst.fetch_all_teachers, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "authToken_admin": localStorage.getItem("AToken")
      },
    });

    const json = await response.json();
    setTeachers(json);
  }, []);

  //--------------- Teacher Data --------------------

  //-------Subject Data ----------//

  const [subject, setSubject] = useState();

  const getSubject = useCallback(async () => {
    const Standard = DataStudent
    const response = await fetch(apiConst.get_all_subjects, {
      method: "POST",
      body: JSON.stringify({
        Standard
      }),
      headers: {
        "Content-Type": "application/json",
        "authToken_admin": localStorage.getItem("AToken")
      },
    });

    const json = await response.json();
    setSubject(json);
  }, []);

  //--------------- Subject Data --------------------

  //---------------- Timtable Data --------------------

  const [timetableData, setTimetableData] = useState({
    Class_code: "",
  });

  const getTimetable = useCallback(async () => {
    const Class_code = Data

    const response = await fetch(apiConst.fetch_all_timetable_by_classes,
      {
        method: "POST",
        body: JSON.stringify({
          Class_code
        }),
        headers: {
          "Content-Type": "application/json",
          "authToken_admin": localStorage.getItem("AToken")
        },
      });

    const json = await response.json();
    setTimetableData(json);
  }, []);

  console.log(timetableData.Daily_TimeTable[0]);

  const [Monday, setMonday] = useState({
    1: {
      T_icard_Id: "",
      Subject_Code: "",
      Time_From: "",
      TIme_TO: ""
    },
    2: {
      T_icard_Id: "",
      Subject_Code: "",
      Time_From: "",
      TIme_TO: ""
    },
    3: {
      T_icard_Id: "",
      Subject_Code: "",
      Time_From: "",
      TIme_TO: ""
    },
    4: {
      T_icard_Id: "",
      Subject_Code: "",
      Time_From: "",
      TIme_TO: ""
    },
    5: {
      T_icard_Id: "",
      Subject_Code: "",
      Time_From: "",
      TIme_TO: ""
    },
    6: {
      T_icard_Id: "",
      Subject_Code: "",
      Time_From: "",
      TIme_TO: ""
    }
  })

  const [Tuesday, setTuesday] = useState({
    1: {
      T_icard_Id: "",
      Subject_Code: "",
      Time_From: "",
      TIme_TO: ""
    },
    2: {
      T_icard_Id: "",
      Subject_Code: "",
      Time_From: "",
      TIme_TO: ""
    },
    3: {
      T_icard_Id: "",
      Subject_Code: "",
      Time_From: "",
      TIme_TO: ""
    },
    4: {
      T_icard_Id: "",
      Subject_Code: "",
      Time_From: "",
      TIme_TO: ""
    },
    5: {
      T_icard_Id: "",
      Subject_Code: "",
      Time_From: "",
      TIme_TO: ""
    },
    6: {
      T_icard_Id: "",
      Subject_Code: "",
      Time_From: "",
      TIme_TO: ""
    }
  })

  const [Wednesday, setWednesday] = useState({
    1: {
      T_icard_Id: "",
      Subject_Code: "",
      Time_From: "",
      TIme_TO: ""
    },
    2: {
      T_icard_Id: "",
      Subject_Code: "",
      Time_From: "",
      TIme_TO: ""
    },
    3: {
      T_icard_Id: "",
      Subject_Code: "",
      Time_From: "",
      TIme_TO: ""
    },
    4: {
      T_icard_Id: "",
      Subject_Code: "",
      Time_From: "",
      TIme_TO: ""
    },
    5: {
      T_icard_Id: "",
      Subject_Code: "",
      Time_From: "",
      TIme_TO: ""
    },
    6: {
      T_icard_Id: "",
      Subject_Code: "",
      Time_From: "",
      TIme_TO: ""
    }
  })

  const [Thursday, setThursday] = useState({
    1: {
      T_icard_Id: "",
      Subject_Code: "",
      Time_From: "",
      TIme_TO: ""
    },
    2: {
      T_icard_Id: "",
      Subject_Code: "",
      Time_From: "",
      TIme_TO: ""
    },
    3: {
      T_icard_Id: "",
      Subject_Code: "",
      Time_From: "",
      TIme_TO: ""
    },
    4: {
      T_icard_Id: "",
      Subject_Code: "",
      Time_From: "",
      TIme_TO: ""
    },
    5: {
      T_icard_Id: "",
      Subject_Code: "",
      Time_From: "",
      TIme_TO: ""
    },
    6: {
      T_icard_Id: "",
      Subject_Code: "",
      Time_From: "",
      TIme_TO: ""
    }
  })

  const [Friday, setFriday] = useState({
    1: {
      T_icard_Id: "",
      Subject_Code: "",
      Time_From: "",
      TIme_TO: ""
    },
    2: {
      T_icard_Id: "",
      Subject_Code: "",
      Time_From: "",
      TIme_TO: ""
    },
    3: {
      T_icard_Id: "",
      Subject_Code: "",
      Time_From: "",
      TIme_TO: ""
    },
    4: {
      T_icard_Id: "",
      Subject_Code: "",
      Time_From: "",
      TIme_TO: ""
    },
    5: {
      T_icard_Id: "",
      Subject_Code: "",
      Time_From: "",
      TIme_TO: ""
    },
    6: {
      T_icard_Id: "",
      Subject_Code: "",
      Time_From: "",
      TIme_TO: ""
    }
  })

  const [Saturday, setSaturday] = useState({
    1: {
      T_icard_Id: "",
      Subject_Code: "",
      Time_From: "",
      TIme_TO: ""
    },
    2: {
      T_icard_Id: "",
      Subject_Code: "",
      Time_From: "",
      TIme_TO: ""
    },
    3: {
      T_icard_Id: "",
      Subject_Code: "",
      Time_From: "",
      TIme_TO: ""
    },
    4: {
      T_icard_Id: "",
      Subject_Code: "",
      Time_From: "",
      TIme_TO: ""
    },
    5: {
      T_icard_Id: "",
      Subject_Code: "",
      Time_From: "",
      TIme_TO: ""
    },
    6: {
      T_icard_Id: "",
      Subject_Code: "",
      Time_From: "",
      TIme_TO: ""
    }
  })

  // const mondayTimeTable = timetableData.Daily_TimeTable && timetableData.Daily_TimeTable.length > 0 ? timetableData.Daily_TimeTable[0].Monday : {};
  // const mondaySubjectCodes = Object.values(mondayTimeTable).map(item => item.Subject_Code);
  // const firstSubjectCode = mondaySubjectCodes[0];
  // console.log(firstSubjectCode);

  // const fridayTimeTable = timetableData.Daily_TimeTable && timetableData.Daily_TimeTable.length > 0 ? timetableData.Daily_TimeTable[0].Friday : {};
  // const fridaySubjectCodes = Object.values(fridayTimeTable).map(item => item.Subject_Code);

  useEffect(() => {
    getTimetable();
  }, [getTimetable])

  //---------------- Timtable Data --------------------

  useEffect(() => {
    getTeachers();
    getSubject();
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, [getTeachers, getSubject]);

  return (
    <div className="main-content">
      <Navbar visible={navVisible} show={showNavbar} />
      <div className="inner-main-content"  >
        <Topbar />
        <div className="container-fluid">
          <div className="dust-div">
            <h4 className='main-name'>Time Table  <span>{DataClass}</span></h4>
            <button className="edit" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Edit</button>
          </div>
          <div className='ganerate_id_part'>
            <div className='ganerateid_cnt'>
              <div className="weekdays">
                <div className={day1 ? 'active123' : ''} onClick={handleDay1}>Monday</div>
                <div className={day2 ? 'active123' : ''} onClick={handleDay2}>Tuesday</div>
                <div className={day3 ? 'active123' : ''} onClick={handleDay3}>Wednesday</div>
                <div className={day4 ? 'active123' : ''} onClick={handleDay4}>Thursday</div>
                <div className={day5 ? 'active123' : ''} onClick={handleDay5}>Friday</div>
                <div className={day6 ? 'active123' : ''} onClick={handleDay6}>Saturday</div>
              </div>
              {/* <form>
                {day1 && (
                  <table className='tab-time'>
                    <thead>
                      <tr className='tr-heading'>
                        <td>Subject</td>
                        <td>Teacher</td>
                        <td>Time From</td>
                        <td>Time To</td>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <select className="select-any-options" name='user' required id='User_name' defaultValue={"DEFAULT"}>
                            <option value="DEFAULT" disabled>Select Subject Name</option>
                            {mondaySubjectCodes.map((subjectCode, index) => (
                              <option key={index}>{subjectCode}</option>
                            ))}
                          </select>
                        </td>
                        <td>
                          <select className="select-any-options" name='user' required id='User_name' defaultValue={"DEFAULT"}>
                            <option value="DEFAULT" disabled>Select Teacher Name</option>
                            {teachers && teachers.map((item, index) => (
                              <option value={item.T_name + "/" + item.T_icard_Id} key={index}>
                                {item.T_name}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td>
                          <input type="time" placeholder='Select Date' className='time-table-time' />
                        </td>
                        <td>
                          <input type="time" placeholder='Select Date' className='time-table-time' />
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <select className="select-any-options" name='subject' required id='subject' defaultValue={"DEFAULT"}>
                            <option value="DEFAULT" disabled>Select Subject</option>
                            {subject && subject.map((item, index) => (
                              <option value={item.Subject_Name + "/" + item.Standard} key={index}>
                                {item.Subject_Name}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td>
                          <select className="select-any-options" name='user' required id='User_name' defaultValue={"DEFAULT"}>
                            <option value="DEFAULT" disabled>Select Teacher Name</option>
                            {teachers && teachers.map((item, index) => (
                              <option value={item.T_name + "/" + item.T_icard_Id} key={index}>
                                {item.T_name}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td>
                          <input type="time" placeholder='Select Date' className='time-table-time' />
                        </td>
                        <td>
                          <input type="time" placeholder='Select Date' className='time-table-time' />
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <select className="select-any-options" name='subject' required id='subject' defaultValue={"DEFAULT"}>
                            <option value="DEFAULT" disabled>Select Subject</option>
                            {subject && subject.map((item, index) => (
                              <option value={item.Subject_Name + "/" + item.Standard} key={index}>
                                {item.Subject_Name}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td>
                          <select className="select-any-options" name='user' required id='User_name' defaultValue={"DEFAULT"}>
                            <option value="DEFAULT" disabled>Select Teacher Name</option>
                            {teachers && teachers.map((item, index) => (
                              <option value={item.T_name + "/" + item.T_icard_Id} key={index}>
                                {item.T_name}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td>
                          <input type="time" placeholder='Select Date' className='time-table-time' />
                        </td>
                        <td>
                          <input type="time" placeholder='Select Date' className='time-table-time' />
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <select className="select-any-options" name='subject' required id='subject' defaultValue={"DEFAULT"}>
                            <option value="DEFAULT" disabled>Select Subject</option>
                            {subject && subject.map((item, index) => (
                              <option value={item.Subject_Name + "/" + item.Standard} key={index}>
                                {item.Subject_Name}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td>
                          <select className="select-any-options" name='user' required id='User_name' defaultValue={"DEFAULT"}>
                            <option value="DEFAULT" disabled>Select Teacher Name</option>
                            {teachers && teachers.map((item, index) => (
                              <option value={item.T_name + "/" + item.T_icard_Id} key={index}>
                                {item.T_name}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td>
                          <input type="time" placeholder='Select Date' className='time-table-time' />
                        </td>
                        <td>
                          <input type="time" placeholder='Select Date' className='time-table-time' />
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <select className="select-any-options" name='subject' required id='subject' defaultValue={"DEFAULT"}>
                            <option value="DEFAULT" disabled>Select Subject</option>
                            {subject && subject.map((item, index) => (
                              <option value={item.Subject_Name + "/" + item.Standard} key={index}>
                                {item.Subject_Name}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td>
                          <select className="select-any-options" name='user' required id='User_name' defaultValue={"DEFAULT"}>
                            <option value="DEFAULT" disabled>Select Teacher Name</option>
                            {teachers && teachers.map((item, index) => (
                              <option value={item.T_name + "/" + item.T_icard_Id} key={index}>
                                {item.T_name}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td>
                          <input type="time" placeholder='Select Date' className='time-table-time' />
                        </td>
                        <td>
                          <input type="time" placeholder='Select Date' className='time-table-time' />
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <select className="select-any-options" name='subject' required id='subject' defaultValue={"DEFAULT"}>
                            <option value="DEFAULT" disabled>Select Subject</option>
                            {subject && subject.map((item, index) => (
                              <option value={item.Subject_Name + "/" + item.Standard} key={index}>
                                {item.Subject_Name}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td>
                          <select className="select-any-options" name='user' required id='User_name' defaultValue={"DEFAULT"}>
                            <option value="DEFAULT" disabled>Select Teacher Name</option>
                            {teachers && teachers.map((item, index) => (
                              <option value={item.T_name + "/" + item.T_icard_Id} key={index}>
                                {item.T_name}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td>
                          <input type="time" placeholder='Select Date' className='time-table-time' />
                        </td>
                        <td>
                          <input type="time" placeholder='Select Date' className='time-table-time' />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                )}

                {day2 && (
                  <table className='tab-time'>
                    <thead>
                      <tr className='tr-heading'>
                        <td>Subject</td>
                        <td>Teacher</td>
                        <td>Time From</td>
                        <td>Time To</td>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <select className="select-any-options" name='subject' required id='subject' defaultValue={"DEFAULT"}>
                            <option value="DEFAULT" disabled>Select Subject</option>
                            {subject && subject.map((item, index) => (
                              <option value={item.Subject_Name + "/" + item.Standard} key={index}>
                                {item.Subject_Name}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td>
                          <select className="select-any-options" name='user' required id='User_name' defaultValue={"DEFAULT"}>
                            <option value="DEFAULT" disabled>Select Teacher Name</option>
                            {teachers && teachers.map((item, index) => (
                              <option value={item.T_name + "/" + item.T_icard_Id} key={index}>
                                {item.T_name}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td>
                          <input type="time" placeholder='Select Date' className='time-table-time' />
                        </td>
                        <td>
                          <input type="time" placeholder='Select Date' className='time-table-time' />
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <select className="select-any-options" name='subject' required id='subject' defaultValue={"DEFAULT"}>
                            <option value="DEFAULT" disabled>Select Subject</option>
                            {subject && subject.map((item, index) => (
                              <option value={item.Subject_Name + "/" + item.Standard} key={index}>
                                {item.Subject_Name}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td>
                          <select className="select-any-options" name='user' required id='User_name' defaultValue={"DEFAULT"}>
                            <option value="DEFAULT" disabled>Select Teacher Name</option>
                            {teachers && teachers.map((item, index) => (
                              <option value={item.T_name + "/" + item.T_icard_Id} key={index}>
                                {item.T_name}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td>
                          <input type="time" placeholder='Select Date' className='time-table-time' />
                        </td>
                        <td>
                          <input type="time" placeholder='Select Date' className='time-table-time' />
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <select className="select-any-options" name='subject' required id='subject' defaultValue={"DEFAULT"}>
                            <option value="DEFAULT" disabled>Select Subject</option>
                            {subject && subject.map((item, index) => (
                              <option value={item.Subject_Name + "/" + item.Standard} key={index}>
                                {item.Subject_Name}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td>
                          <select className="select-any-options" name='user' required id='User_name' defaultValue={"DEFAULT"}>
                            <option value="DEFAULT" disabled>Select Teacher Name</option>
                            {teachers && teachers.map((item, index) => (
                              <option value={item.T_name + "/" + item.T_icard_Id} key={index}>
                                {item.T_name}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td>
                          <input type="time" placeholder='Select Date' className='time-table-time' />
                        </td>
                        <td>
                          <input type="time" placeholder='Select Date' className='time-table-time' />
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <select className="select-any-options" name='subject' required id='subject' defaultValue={"DEFAULT"}>
                            <option value="DEFAULT" disabled>Select Subject</option>
                            {subject && subject.map((item, index) => (
                              <option value={item.Subject_Name + "/" + item.Standard} key={index}>
                                {item.Subject_Name}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td>
                          <select className="select-any-options" name='user' required id='User_name' defaultValue={"DEFAULT"}>
                            <option value="DEFAULT" disabled>Select Teacher Name</option>
                            {teachers && teachers.map((item, index) => (
                              <option value={item.T_name + "/" + item.T_icard_Id} key={index}>
                                {item.T_name}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td>
                          <input type="time" placeholder='Select Date' className='time-table-time' />
                        </td>
                        <td>
                          <input type="time" placeholder='Select Date' className='time-table-time' />
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <select className="select-any-options" name='subject' required id='subject' defaultValue={"DEFAULT"}>
                            <option value="DEFAULT" disabled>Select Subject</option>
                            {subject && subject.map((item, index) => (
                              <option value={item.Subject_Name + "/" + item.Standard} key={index}>
                                {item.Subject_Name}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td>
                          <select className="select-any-options" name='user' required id='User_name' defaultValue={"DEFAULT"}>
                            <option value="DEFAULT" disabled>Select Teacher Name</option>
                            {teachers && teachers.map((item, index) => (
                              <option value={item.T_name + "/" + item.T_icard_Id} key={index}>
                                {item.T_name}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td>
                          <input type="time" placeholder='Select Date' className='time-table-time' />
                        </td>
                        <td>
                          <input type="time" placeholder='Select Date' className='time-table-time' />
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <select className="select-any-options" name='subject' required id='subject' defaultValue={"DEFAULT"}>
                            <option value="DEFAULT" disabled>Select Subject</option>
                            {subject && subject.map((item, index) => (
                              <option value={item.Subject_Name + "/" + item.Standard} key={index}>
                                {item.Subject_Name}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td>
                          <select className="select-any-options" name='user' required id='User_name' defaultValue={"DEFAULT"}>
                            <option value="DEFAULT" disabled>Select Teacher Name</option>
                            {teachers && teachers.map((item, index) => (
                              <option value={item.T_name + "/" + item.T_icard_Id} key={index}>
                                {item.T_name}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td>
                          <input type="time" placeholder='Select Date' className='time-table-time' />
                        </td>
                        <td>
                          <input type="time" placeholder='Select Date' className='time-table-time' />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                )}

                {day3 && (
                  <table className='tab-time'>
                    <thead>
                      <tr className='tr-heading'>
                        <td>Subject</td>
                        <td>Teacher</td>
                        <td>Time From</td>
                        <td>Time To</td>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <select className="select-any-options" name='subject' required id='subject' defaultValue={"DEFAULT"}>
                            <option value="DEFAULT" disabled>Select Subject</option>
                            {subject && subject.map((item, index) => (
                              <option value={item.Subject_Name + "/" + item.Standard} key={index}>
                                {item.Subject_Name}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td>
                          <select className="select-any-options" name='user' required id='User_name' defaultValue={"DEFAULT"}>
                            <option value="DEFAULT" disabled>Select Teacher Name</option>
                            {teachers && teachers.map((item, index) => (
                              <option value={item.T_name + "/" + item.T_icard_Id} key={index}>
                                {item.T_name}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td>
                          <input type="time" placeholder='Select Date' className='time-table-time' />
                        </td>
                        <td>
                          <input type="time" placeholder='Select Date' className='time-table-time' />
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <select className="select-any-options" name='subject' required id='subject' defaultValue={"DEFAULT"}>
                            <option value="DEFAULT" disabled>Select Subject</option>
                            {subject && subject.map((item, index) => (
                              <option value={item.Subject_Name + "/" + item.Standard} key={index}>
                                {item.Subject_Name}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td>
                          <select className="select-any-options" name='user' required id='User_name' defaultValue={"DEFAULT"}>
                            <option value="DEFAULT" disabled>Select Teacher Name</option>
                            {teachers && teachers.map((item, index) => (
                              <option value={item.T_name + "/" + item.T_icard_Id} key={index}>
                                {item.T_name}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td>
                          <input type="time" placeholder='Select Date' className='time-table-time' />
                        </td>
                        <td>
                          <input type="time" placeholder='Select Date' className='time-table-time' />
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <select className="select-any-options" name='subject' required id='subject' defaultValue={"DEFAULT"}>
                            <option value="DEFAULT" disabled>Select Subject</option>
                            {subject && subject.map((item, index) => (
                              <option value={item.Subject_Name + "/" + item.Standard} key={index}>
                                {item.Subject_Name}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td>
                          <select className="select-any-options" name='user' required id='User_name' defaultValue={"DEFAULT"}>
                            <option value="DEFAULT" disabled>Select Teacher Name</option>
                            {teachers && teachers.map((item, index) => (
                              <option value={item.T_name + "/" + item.T_icard_Id} key={index}>
                                {item.T_name}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td>
                          <input type="time" placeholder='Select Date' className='time-table-time' />
                        </td>
                        <td>
                          <input type="time" placeholder='Select Date' className='time-table-time' />
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <select className="select-any-options" name='subject' required id='subject' defaultValue={"DEFAULT"}>
                            <option value="DEFAULT" disabled>Select Subject</option>
                            {subject && subject.map((item, index) => (
                              <option value={item.Subject_Name + "/" + item.Standard} key={index}>
                                {item.Subject_Name}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td>
                          <select className="select-any-options" name='user' required id='User_name' defaultValue={"DEFAULT"}>
                            <option value="DEFAULT" disabled>Select Teacher Name</option>
                            {teachers && teachers.map((item, index) => (
                              <option value={item.T_name + "/" + item.T_icard_Id} key={index}>
                                {item.T_name}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td>
                          <input type="time" placeholder='Select Date' className='time-table-time' />
                        </td>
                        <td>
                          <input type="time" placeholder='Select Date' className='time-table-time' />
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <select className="select-any-options" name='subject' required id='subject' defaultValue={"DEFAULT"}>
                            <option value="DEFAULT" disabled>Select Subject</option>
                            {subject && subject.map((item, index) => (
                              <option value={item.Subject_Name + "/" + item.Standard} key={index}>
                                {item.Subject_Name}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td>
                          <select className="select-any-options" name='user' required id='User_name' defaultValue={"DEFAULT"}>
                            <option value="DEFAULT" disabled>Select Teacher Name</option>
                            {teachers && teachers.map((item, index) => (
                              <option value={item.T_name + "/" + item.T_icard_Id} key={index}>
                                {item.T_name}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td>
                          <input type="time" placeholder='Select Date' className='time-table-time' />
                        </td>
                        <td>
                          <input type="time" placeholder='Select Date' className='time-table-time' />
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <select className="select-any-options" name='subject' required id='subject' defaultValue={"DEFAULT"}>
                            <option value="DEFAULT" disabled>Select Subject</option>
                            {subject && subject.map((item, index) => (
                              <option value={item.Subject_Name + "/" + item.Standard} key={index}>
                                {item.Subject_Name}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td>
                          <select className="select-any-options" name='user' required id='User_name' defaultValue={"DEFAULT"}>
                            <option value="DEFAULT" disabled>Select Teacher Name</option>
                            {teachers && teachers.map((item, index) => (
                              <option value={item.T_name + "/" + item.T_icard_Id} key={index}>
                                {item.T_name}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td>
                          <input type="time" placeholder='Select Date' className='time-table-time' />
                        </td>
                        <td>
                          <input type="time" placeholder='Select Date' className='time-table-time' />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                )}

                {day4 && (
                  <table className='tab-time'>
                    <thead>
                      <tr className='tr-heading'>
                        <td>Subject</td>
                        <td>Teacher</td>
                        <td>Time From</td>
                        <td>Time To</td>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <select className="select-any-options" name='subject' required id='subject' defaultValue={"DEFAULT"}>
                            <option value="DEFAULT" disabled>Select Subject</option>
                            {subject && subject.map((item, index) => (
                              <option value={item.Subject_Name + "/" + item.Standard} key={index}>
                                {item.Subject_Name}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td>
                          <select className="select-any-options" name='user' required id='User_name' defaultValue={"DEFAULT"}>
                            <option value="DEFAULT" disabled>Select Teacher Name</option>
                            {teachers && teachers.map((item, index) => (
                              <option value={item.T_name + "/" + item.T_icard_Id} key={index}>
                                {item.T_name}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td>
                          <input type="time" placeholder='Select Date' className='time-table-time' />
                        </td>
                        <td>
                          <input type="time" placeholder='Select Date' className='time-table-time' />
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <select className="select-any-options" name='subject' required id='subject' defaultValue={"DEFAULT"}>
                            <option value="DEFAULT" disabled>Select Subject</option>
                            {subject && subject.map((item, index) => (
                              <option value={item.Subject_Name + "/" + item.Standard} key={index}>
                                {item.Subject_Name}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td>
                          <select className="select-any-options" name='user' required id='User_name' defaultValue={"DEFAULT"}>
                            <option value="DEFAULT" disabled>Select Teacher Name</option>
                            {teachers && teachers.map((item, index) => (
                              <option value={item.T_name + "/" + item.T_icard_Id} key={index}>
                                {item.T_name}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td>
                          <input type="time" placeholder='Select Date' className='time-table-time' />
                        </td>
                        <td>
                          <input type="time" placeholder='Select Date' className='time-table-time' />
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <select className="select-any-options" name='subject' required id='subject' defaultValue={"DEFAULT"}>
                            <option value="DEFAULT" disabled>Select Subject</option>
                            {subject && subject.map((item, index) => (
                              <option value={item.Subject_Name + "/" + item.Standard} key={index}>
                                {item.Subject_Name}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td>
                          <select className="select-any-options" name='user' required id='User_name' defaultValue={"DEFAULT"}>
                            <option value="DEFAULT" disabled>Select Teacher Name</option>
                            {teachers && teachers.map((item, index) => (
                              <option value={item.T_name + "/" + item.T_icard_Id} key={index}>
                                {item.T_name}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td>
                          <input type="time" placeholder='Select Date' className='time-table-time' />
                        </td>
                        <td>
                          <input type="time" placeholder='Select Date' className='time-table-time' />
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <select className="select-any-options" name='subject' required id='subject' defaultValue={"DEFAULT"}>
                            <option value="DEFAULT" disabled>Select Subject</option>
                            {subject && subject.map((item, index) => (
                              <option value={item.Subject_Name + "/" + item.Standard} key={index}>
                                {item.Subject_Name}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td>
                          <select className="select-any-options" name='user' required id='User_name' defaultValue={"DEFAULT"}>
                            <option value="DEFAULT" disabled>Select Teacher Name</option>
                            {teachers && teachers.map((item, index) => (
                              <option value={item.T_name + "/" + item.T_icard_Id} key={index}>
                                {item.T_name}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td>
                          <input type="time" placeholder='Select Date' className='time-table-time' />
                        </td>
                        <td>
                          <input type="time" placeholder='Select Date' className='time-table-time' />
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <select className="select-any-options" name='subject' required id='subject' defaultValue={"DEFAULT"}>
                            <option value="DEFAULT" disabled>Select Subject</option>
                            {subject && subject.map((item, index) => (
                              <option value={item.Subject_Name + "/" + item.Standard} key={index}>
                                {item.Subject_Name}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td>
                          <select className="select-any-options" name='user' required id='User_name' defaultValue={"DEFAULT"}>
                            <option value="DEFAULT" disabled>Select Teacher Name</option>
                            {teachers && teachers.map((item, index) => (
                              <option value={item.T_name + "/" + item.T_icard_Id} key={index}>
                                {item.T_name}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td>
                          <input type="time" placeholder='Select Date' className='time-table-time' />
                        </td>
                        <td>
                          <input type="time" placeholder='Select Date' className='time-table-time' />
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <select className="select-any-options" name='subject' required id='subject' defaultValue={"DEFAULT"}>
                            <option value="DEFAULT" disabled>Select Subject</option>
                            {subject && subject.map((item, index) => (
                              <option value={item.Subject_Name + "/" + item.Standard} key={index}>
                                {item.Subject_Name}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td>
                          <select className="select-any-options" name='user' required id='User_name' defaultValue={"DEFAULT"}>
                            <option value="DEFAULT" disabled>Select Teacher Name</option>
                            {teachers && teachers.map((item, index) => (
                              <option value={item.T_name + "/" + item.T_icard_Id} key={index}>
                                {item.T_name}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td>
                          <input type="time" placeholder='Select Date' className='time-table-time' />
                        </td>
                        <td>
                          <input type="time" placeholder='Select Date' className='time-table-time' />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                )}

                {day5 && (
                  <table className='tab-time'>
                    <thead>
                      <tr className='tr-heading'>
                        <td>Subject</td>
                        <td>Teacher</td>
                        <td>Time From</td>
                        <td>Time To</td>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <select className="select-any-options" name='subject' required id='subject' defaultValue={"DEFAULT"}>
                            <option value="DEFAULT" disabled>Select Subject</option>
                            {fridaySubjectCodes.map((subjectCode, index) => (
                              <option key={index} value={subjectCode}>{subjectCode}</option>
                            ))}
                          </select>
                        </td>
                        <td>
                          <select className="select-any-options" name='user' required id='User_name' defaultValue={"DEFAULT"}>
                            <option value="DEFAULT" disabled>Select Teacher Name</option>
                            {teachers && teachers.map((item, index) => (
                              <option value={item.T_name + "/" + item.T_icard_Id} key={index}>
                                {item.T_name}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td>
                          <input type="time" placeholder='Select Date' className='time-table-time' />
                        </td>
                        <td>
                          <input type="time" placeholder='Select Date' className='time-table-time' />
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <select className="select-any-options" name='subject' required id='subject' defaultValue={"DEFAULT"}>
                            <option value="DEFAULT" disabled>Select Subject</option>
                            {subject && subject.map((item, index) => (
                              <option value={item.Subject_Name + "/" + item.Standard} key={index}>
                                {item.Subject_Name}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td>
                          <select className="select-any-options" name='user' required id='User_name' defaultValue={"DEFAULT"}>
                            <option value="DEFAULT" disabled>Select Teacher Name</option>
                            {teachers && teachers.map((item, index) => (
                              <option value={item.T_name + "/" + item.T_icard_Id} key={index}>
                                {item.T_name}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td>
                          <input type="time" placeholder='Select Date' className='time-table-time' />
                        </td>
                        <td>
                          <input type="time" placeholder='Select Date' className='time-table-time' />
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <select className="select-any-options" name='subject' required id='subject' defaultValue={"DEFAULT"}>
                            <option value="DEFAULT" disabled>Select Subject</option>
                            {subject && subject.map((item, index) => (
                              <option value={item.Subject_Name + "/" + item.Standard} key={index}>
                                {item.Subject_Name}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td>
                          <select className="select-any-options" name='user' required id='User_name' defaultValue={"DEFAULT"}>
                            <option value="DEFAULT" disabled>Select Teacher Name</option>
                            {teachers && teachers.map((item, index) => (
                              <option value={item.T_name + "/" + item.T_icard_Id} key={index}>
                                {item.T_name}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td>
                          <input type="time" placeholder='Select Date' className='time-table-time' />
                        </td>
                        <td>
                          <input type="time" placeholder='Select Date' className='time-table-time' />
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <select className="select-any-options" name='subject' required id='subject' defaultValue={"DEFAULT"}>
                            <option value="DEFAULT" disabled>Select Subject</option>
                            {subject && subject.map((item, index) => (
                              <option value={item.Subject_Name + "/" + item.Standard} key={index}>
                                {item.Subject_Name}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td>
                          <select className="select-any-options" name='user' required id='User_name' defaultValue={"DEFAULT"}>
                            <option value="DEFAULT" disabled>Select Teacher Name</option>
                            {teachers && teachers.map((item, index) => (
                              <option value={item.T_name + "/" + item.T_icard_Id} key={index}>
                                {item.T_name}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td>
                          <input type="time" placeholder='Select Date' className='time-table-time' />
                        </td>
                        <td>
                          <input type="time" placeholder='Select Date' className='time-table-time' />
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <select className="select-any-options" name='subject' required id='subject' defaultValue={"DEFAULT"}>
                            <option value="DEFAULT" disabled>Select Subject</option>
                            {subject && subject.map((item, index) => (
                              <option value={item.Subject_Name + "/" + item.Standard} key={index}>
                                {item.Subject_Name}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td>
                          <select className="select-any-options" name='user' required id='User_name' defaultValue={"DEFAULT"}>
                            <option value="DEFAULT" disabled>Select Teacher Name</option>
                            {teachers && teachers.map((item, index) => (
                              <option value={item.T_name + "/" + item.T_icard_Id} key={index}>
                                {item.T_name}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td>
                          <input type="time" placeholder='Select Date' className='time-table-time' />
                        </td>
                        <td>
                          <input type="time" placeholder='Select Date' className='time-table-time' />
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <select className="select-any-options" name='subject' required id='subject' defaultValue={"DEFAULT"}>
                            <option value="DEFAULT" disabled>Select Subject</option>
                            {subject && subject.map((item, index) => (
                              <option value={item.Subject_Name + "/" + item.Standard} key={index}>
                                {item.Subject_Name}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td>
                          <select className="select-any-options" name='user' required id='User_name' defaultValue={"DEFAULT"}>
                            <option value="DEFAULT" disabled>Select Teacher Name</option>
                            {teachers && teachers.map((item, index) => (
                              <option value={item.T_name + "/" + item.T_icard_Id} key={index}>
                                {item.T_name}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td>
                          <input type="time" placeholder='Select Date' className='time-table-time' />
                        </td>
                        <td>
                          <input type="time" placeholder='Select Date' className='time-table-time' />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                )}

                {day6 && (
                  <>
                    <table className='tab-time'>
                      <thead>
                        <tr className='tr-heading'>
                          <td>Subject</td>
                          <td>Teacher</td>
                          <td>Time From</td>
                          <td>Time To</td>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            <select className="select-any-options" name='user' required id='User_name' defaultValue={"DEFAULT"}>
                              <option value="DEFAULT" disabled>Select Subject Name</option>
                              {mondaySubjectCodes.map((subjectCode, index) => (
                                <option key={index}>{subjectCode}</option>
                              ))}
                            </select>
                          </td>
                          <td>
                            <select className="select-any-options" name='user' required id='User_name' defaultValue={"DEFAULT"}>
                              <option value="DEFAULT" disabled>Select Teacher Name</option>
                              {teachers && teachers.map((item, index) => (
                                <option value={item.T_name + "/" + item.T_icard_Id} key={index}>
                                  {item.T_name}
                                </option>
                              ))}
                            </select>
                          </td>
                          <td>
                            <input type="time" placeholder='Select Date' className='time-table-time' />
                          </td>
                          <td>
                            <input type="time" placeholder='Select Date' className='time-table-time' />
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <select className="select-any-options" name='subject' required id='subject' defaultValue={"DEFAULT"}>
                              <option value="DEFAULT" disabled>Select Subject</option>
                              {subject && subject.map((item, index) => (
                                <option value={item.Subject_Name + "/" + item.Standard} key={index}>
                                  {item.Subject_Name}
                                </option>
                              ))}
                            </select>
                          </td>
                          <td>
                            <select className="select-any-options" name='user' required id='User_name' defaultValue={"DEFAULT"}>
                              <option value="DEFAULT" disabled>Select Teacher Name</option>
                              {teachers && teachers.map((item, index) => (
                                <option value={item.T_name + "/" + item.T_icard_Id} key={index}>
                                  {item.T_name}
                                </option>
                              ))}
                            </select>
                          </td>
                          <td>
                            <input type="time" placeholder='Select Date' className='time-table-time' />
                          </td>
                          <td>
                            <input type="time" placeholder='Select Date' className='time-table-time' />
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <select className="select-any-options" name='subject' required id='subject' defaultValue={"DEFAULT"}>
                              <option value="DEFAULT" disabled>Select Subject</option>
                              {subject && subject.map((item, index) => (
                                <option value={item.Subject_Name + "/" + item.Standard} key={index}>
                                  {item.Subject_Name}
                                </option>
                              ))}
                            </select>
                          </td>
                          <td>
                            <select className="select-any-options" name='user' required id='User_name' defaultValue={"DEFAULT"}>
                              <option value="DEFAULT" disabled>Select Teacher Name</option>
                              {teachers && teachers.map((item, index) => (
                                <option value={item.T_name + "/" + item.T_icard_Id} key={index}>
                                  {item.T_name}
                                </option>
                              ))}
                            </select>
                          </td>
                          <td>
                            <input type="time" placeholder='Select Date' className='time-table-time' />
                          </td>
                          <td>
                            <input type="time" placeholder='Select Date' className='time-table-time' />
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <select className="select-any-options" name='subject' required id='subject' defaultValue={"DEFAULT"}>
                              <option value="DEFAULT" disabled>Select Subject</option>
                              {subject && subject.map((item, index) => (
                                <option value={item.Subject_Name + "/" + item.Standard} key={index}>
                                  {item.Subject_Name}
                                </option>
                              ))}
                            </select>
                          </td>
                          <td>
                            <select className="select-any-options" name='user' required id='User_name' defaultValue={"DEFAULT"}>
                              <option value="DEFAULT" disabled>Select Teacher Name</option>
                              {teachers && teachers.map((item, index) => (
                                <option value={item.T_name + "/" + item.T_icard_Id} key={index}>
                                  {item.T_name}
                                </option>
                              ))}
                            </select>
                          </td>
                          <td>
                            <input type="time" placeholder='Select Date' className='time-table-time' />
                          </td>
                          <td>
                            <input type="time" placeholder='Select Date' className='time-table-time' />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <div className="final-submit" style={{ textAlign: "center" }}>
                      <button type='submit' className='save-all-forms'>Save</button>
                    </div>
                  </>
                )}
              </form> */}
            </div>
          </div>

          {/* Edit Modal */}

          <div className="modal fade sp_model_1" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog">
              <div className="modal-content editid_modal">
                <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                <div className='ganerateid_cnt'>
                  <div className="weekdays" style={{ padding: "40px 0 0 40px" }}>
                    <div className={day1 ? 'active123' : ''} onClick={handleDay1}>Monday</div>
                    <div className={day2 ? 'active123' : ''} onClick={handleDay2}>Tuesday</div>
                    <div className={day3 ? 'active123' : ''} onClick={handleDay3}>Wednesday</div>
                    <div className={day4 ? 'active123' : ''} onClick={handleDay4}>Thursday</div>
                    <div className={day5 ? 'active123' : ''} onClick={handleDay5}>Friday</div>
                    <div className={day6 ? 'active123' : ''} onClick={handleDay6}>Saturday</div>
                  </div>
                  {/* <form>
                    {day1 && (
                      <table className='tab-time'>
                        <thead>
                          <tr className='tr-heading'>
                            <td>Subject</td>
                            <td>Teacher</td>
                            <td>Time From</td>
                            <td>Time To</td>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>
                              <select className="select-any-options" name='subject' required id='subject' defaultValue={"DEFAULT"}>
                                <option value="DEFAULT" disabled>Select Subject</option>
                                {subject && subject.map((item, index) => (
                                  <option value={item.Subject_Name + "/" + item.Standard} key={index}>
                                    {item.Subject_Name}
                                  </option>
                                ))}
                              </select>
                            </td>
                            <td>
                              <select className="select-any-options" name='user' required id='User_name' defaultValue={"DEFAULT"}>
                                <option value="DEFAULT" disabled>Select Teacher Name</option>
                                {teachers && teachers.map((item, index) => (
                                  <option value={item.T_name + "/" + item.T_icard_Id} key={index}>
                                    {item.T_name}
                                  </option>
                                ))}
                              </select>
                            </td>
                            <td>
                              <input type="time" placeholder='Select Date' className='time-table-time' />
                            </td>
                            <td>
                              <input type="time" placeholder='Select Date' className='time-table-time' />
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <select className="select-any-options" name='subject' required id='subject' defaultValue={"DEFAULT"}>
                                <option value="DEFAULT" disabled>Select Subject</option>
                                {subject && subject.map((item, index) => (
                                  <option value={item.Subject_Name + "/" + item.Standard} key={index}>
                                    {item.Subject_Name}
                                  </option>
                                ))}
                              </select>
                            </td>
                            <td>
                              <select className="select-any-options" name='user' required id='User_name' defaultValue={"DEFAULT"}>
                                <option value="DEFAULT" disabled>Select Teacher Name</option>
                                {teachers && teachers.map((item, index) => (
                                  <option value={item.T_name + "/" + item.T_icard_Id} key={index}>
                                    {item.T_name}
                                  </option>
                                ))}
                              </select>
                            </td>
                            <td>
                              <input type="time" placeholder='Select Date' className='time-table-time' />
                            </td>
                            <td>
                              <input type="time" placeholder='Select Date' className='time-table-time' />
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <select className="select-any-options" name='subject' required id='subject' defaultValue={"DEFAULT"}>
                                <option value="DEFAULT" disabled>Select Subject</option>
                                {subject && subject.map((item, index) => (
                                  <option value={item.Subject_Name + "/" + item.Standard} key={index}>
                                    {item.Subject_Name}
                                  </option>
                                ))}
                              </select>
                            </td>
                            <td>
                              <select className="select-any-options" name='user' required id='User_name' defaultValue={"DEFAULT"}>
                                <option value="DEFAULT" disabled>Select Teacher Name</option>
                                {teachers && teachers.map((item, index) => (
                                  <option value={item.T_name + "/" + item.T_icard_Id} key={index}>
                                    {item.T_name}
                                  </option>
                                ))}
                              </select>
                            </td>
                            <td>
                              <input type="time" placeholder='Select Date' className='time-table-time' />
                            </td>
                            <td>
                              <input type="time" placeholder='Select Date' className='time-table-time' />
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <select className="select-any-options" name='subject' required id='subject' defaultValue={"DEFAULT"}>
                                <option value="DEFAULT" disabled>Select Subject</option>
                                {subject && subject.map((item, index) => (
                                  <option value={item.Subject_Name + "/" + item.Standard} key={index}>
                                    {item.Subject_Name}
                                  </option>
                                ))}
                              </select>
                            </td>
                            <td>
                              <select className="select-any-options" name='user' required id='User_name' defaultValue={"DEFAULT"}>
                                <option value="DEFAULT" disabled>Select Teacher Name</option>
                                {teachers && teachers.map((item, index) => (
                                  <option value={item.T_name + "/" + item.T_icard_Id} key={index}>
                                    {item.T_name}
                                  </option>
                                ))}
                              </select>
                            </td>
                            <td>
                              <input type="time" placeholder='Select Date' className='time-table-time' />
                            </td>
                            <td>
                              <input type="time" placeholder='Select Date' className='time-table-time' />
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <select className="select-any-options" name='subject' required id='subject' defaultValue={"DEFAULT"}>
                                <option value="DEFAULT" disabled>Select Subject</option>
                                {subject && subject.map((item, index) => (
                                  <option value={item.Subject_Name + "/" + item.Standard} key={index}>
                                    {item.Subject_Name}
                                  </option>
                                ))}
                              </select>
                            </td>
                            <td>
                              <select className="select-any-options" name='user' required id='User_name' defaultValue={"DEFAULT"}>
                                <option value="DEFAULT" disabled>Select Teacher Name</option>
                                {teachers && teachers.map((item, index) => (
                                  <option value={item.T_name + "/" + item.T_icard_Id} key={index}>
                                    {item.T_name}
                                  </option>
                                ))}
                              </select>
                            </td>
                            <td>
                              <input type="time" placeholder='Select Date' className='time-table-time' />
                            </td>
                            <td>
                              <input type="time" placeholder='Select Date' className='time-table-time' />
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <select className="select-any-options" name='subject' required id='subject' defaultValue={"DEFAULT"}>
                                <option value="DEFAULT" disabled>Select Subject</option>
                                {subject && subject.map((item, index) => (
                                  <option value={item.Subject_Name + "/" + item.Standard} key={index}>
                                    {item.Subject_Name}
                                  </option>
                                ))}
                              </select>
                            </td>
                            <td>
                              <select className="select-any-options" name='user' required id='User_name' defaultValue={"DEFAULT"}>
                                <option value="DEFAULT" disabled>Select Teacher Name</option>
                                {teachers && teachers.map((item, index) => (
                                  <option value={item.T_name + "/" + item.T_icard_Id} key={index}>
                                    {item.T_name}
                                  </option>
                                ))}
                              </select>
                            </td>
                            <td>
                              <input type="time" placeholder='Select Date' className='time-table-time' />
                            </td>
                            <td>
                              <input type="time" placeholder='Select Date' className='time-table-time' />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    )}

                    {day2 && (
                      <table className='tab-time'>
                        <thead>
                          <tr className='tr-heading'>
                            <td>Subject</td>
                            <td>Teacher</td>
                            <td>Time From</td>
                            <td>Time To</td>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>
                              <select className="select-any-options" name='subject' required id='subject' defaultValue={"DEFAULT"}>
                                <option value="DEFAULT" disabled>Select Subject</option>
                                {subject && subject.map((item, index) => (
                                  <option value={item.Subject_Name + "/" + item.Standard} key={index}>
                                    {item.Subject_Name}
                                  </option>
                                ))}
                              </select>
                            </td>
                            <td>
                              <select className="select-any-options" name='user' required id='User_name' defaultValue={"DEFAULT"}>
                                <option value="DEFAULT" disabled>Select Teacher Name</option>
                                {teachers && teachers.map((item, index) => (
                                  <option value={item.T_name + "/" + item.T_icard_Id} key={index}>
                                    {item.T_name}
                                  </option>
                                ))}
                              </select>
                            </td>
                            <td>
                              <input type="time" placeholder='Select Date' className='time-table-time' />
                            </td>
                            <td>
                              <input type="time" placeholder='Select Date' className='time-table-time' />
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <select className="select-any-options" name='subject' required id='subject' defaultValue={"DEFAULT"}>
                                <option value="DEFAULT" disabled>Select Subject</option>
                                {subject && subject.map((item, index) => (
                                  <option value={item.Subject_Name + "/" + item.Standard} key={index}>
                                    {item.Subject_Name}
                                  </option>
                                ))}
                              </select>
                            </td>
                            <td>
                              <select className="select-any-options" name='user' required id='User_name' defaultValue={"DEFAULT"}>
                                <option value="DEFAULT" disabled>Select Teacher Name</option>
                                {teachers && teachers.map((item, index) => (
                                  <option value={item.T_name + "/" + item.T_icard_Id} key={index}>
                                    {item.T_name}
                                  </option>
                                ))}
                              </select>
                            </td>
                            <td>
                              <input type="time" placeholder='Select Date' className='time-table-time' />
                            </td>
                            <td>
                              <input type="time" placeholder='Select Date' className='time-table-time' />
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <select className="select-any-options" name='subject' required id='subject' defaultValue={"DEFAULT"}>
                                <option value="DEFAULT" disabled>Select Subject</option>
                                {subject && subject.map((item, index) => (
                                  <option value={item.Subject_Name + "/" + item.Standard} key={index}>
                                    {item.Subject_Name}
                                  </option>
                                ))}
                              </select>
                            </td>
                            <td>
                              <select className="select-any-options" name='user' required id='User_name' defaultValue={"DEFAULT"}>
                                <option value="DEFAULT" disabled>Select Teacher Name</option>
                                {teachers && teachers.map((item, index) => (
                                  <option value={item.T_name + "/" + item.T_icard_Id} key={index}>
                                    {item.T_name}
                                  </option>
                                ))}
                              </select>
                            </td>
                            <td>
                              <input type="time" placeholder='Select Date' className='time-table-time' />
                            </td>
                            <td>
                              <input type="time" placeholder='Select Date' className='time-table-time' />
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <select className="select-any-options" name='subject' required id='subject' defaultValue={"DEFAULT"}>
                                <option value="DEFAULT" disabled>Select Subject</option>
                                {subject && subject.map((item, index) => (
                                  <option value={item.Subject_Name + "/" + item.Standard} key={index}>
                                    {item.Subject_Name}
                                  </option>
                                ))}
                              </select>
                            </td>
                            <td>
                              <select className="select-any-options" name='user' required id='User_name' defaultValue={"DEFAULT"}>
                                <option value="DEFAULT" disabled>Select Teacher Name</option>
                                {teachers && teachers.map((item, index) => (
                                  <option value={item.T_name + "/" + item.T_icard_Id} key={index}>
                                    {item.T_name}
                                  </option>
                                ))}
                              </select>
                            </td>
                            <td>
                              <input type="time" placeholder='Select Date' className='time-table-time' />
                            </td>
                            <td>
                              <input type="time" placeholder='Select Date' className='time-table-time' />
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <select className="select-any-options" name='subject' required id='subject' defaultValue={"DEFAULT"}>
                                <option value="DEFAULT" disabled>Select Subject</option>
                                {subject && subject.map((item, index) => (
                                  <option value={item.Subject_Name + "/" + item.Standard} key={index}>
                                    {item.Subject_Name}
                                  </option>
                                ))}
                              </select>
                            </td>
                            <td>
                              <select className="select-any-options" name='user' required id='User_name' defaultValue={"DEFAULT"}>
                                <option value="DEFAULT" disabled>Select Teacher Name</option>
                                {teachers && teachers.map((item, index) => (
                                  <option value={item.T_name + "/" + item.T_icard_Id} key={index}>
                                    {item.T_name}
                                  </option>
                                ))}
                              </select>
                            </td>
                            <td>
                              <input type="time" placeholder='Select Date' className='time-table-time' />
                            </td>
                            <td>
                              <input type="time" placeholder='Select Date' className='time-table-time' />
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <select className="select-any-options" name='subject' required id='subject' defaultValue={"DEFAULT"}>
                                <option value="DEFAULT" disabled>Select Subject</option>
                                {subject && subject.map((item, index) => (
                                  <option value={item.Subject_Name + "/" + item.Standard} key={index}>
                                    {item.Subject_Name}
                                  </option>
                                ))}
                              </select>
                            </td>
                            <td>
                              <select className="select-any-options" name='user' required id='User_name' defaultValue={"DEFAULT"}>
                                <option value="DEFAULT" disabled>Select Teacher Name</option>
                                {teachers && teachers.map((item, index) => (
                                  <option value={item.T_name + "/" + item.T_icard_Id} key={index}>
                                    {item.T_name}
                                  </option>
                                ))}
                              </select>
                            </td>
                            <td>
                              <input type="time" placeholder='Select Date' className='time-table-time' />
                            </td>
                            <td>
                              <input type="time" placeholder='Select Date' className='time-table-time' />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    )}

                    {day3 && (
                      <table className='tab-time'>
                        <thead>
                          <tr className='tr-heading'>
                            <td>Subject</td>
                            <td>Teacher</td>
                            <td>Time From</td>
                            <td>Time To</td>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>
                              <select className="select-any-options" name='subject' required id='subject' defaultValue={"DEFAULT"}>
                                <option value="DEFAULT" disabled>Select Subject</option>
                                {subject && subject.map((item, index) => (
                                  <option value={item.Subject_Name + "/" + item.Standard} key={index}>
                                    {item.Subject_Name}
                                  </option>
                                ))}
                              </select>
                            </td>
                            <td>
                              <select className="select-any-options" name='user' required id='User_name' defaultValue={"DEFAULT"}>
                                <option value="DEFAULT" disabled>Select Teacher Name</option>
                                {teachers && teachers.map((item, index) => (
                                  <option value={item.T_name + "/" + item.T_icard_Id} key={index}>
                                    {item.T_name}
                                  </option>
                                ))}
                              </select>
                            </td>
                            <td>
                              <input type="time" placeholder='Select Date' className='time-table-time' />
                            </td>
                            <td>
                              <input type="time" placeholder='Select Date' className='time-table-time' />
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <select className="select-any-options" name='subject' required id='subject' defaultValue={"DEFAULT"}>
                                <option value="DEFAULT" disabled>Select Subject</option>
                                {subject && subject.map((item, index) => (
                                  <option value={item.Subject_Name + "/" + item.Standard} key={index}>
                                    {item.Subject_Name}
                                  </option>
                                ))}
                              </select>
                            </td>
                            <td>
                              <select className="select-any-options" name='user' required id='User_name' defaultValue={"DEFAULT"}>
                                <option value="DEFAULT" disabled>Select Teacher Name</option>
                                {teachers && teachers.map((item, index) => (
                                  <option value={item.T_name + "/" + item.T_icard_Id} key={index}>
                                    {item.T_name}
                                  </option>
                                ))}
                              </select>
                            </td>
                            <td>
                              <input type="time" placeholder='Select Date' className='time-table-time' />
                            </td>
                            <td>
                              <input type="time" placeholder='Select Date' className='time-table-time' />
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <select className="select-any-options" name='subject' required id='subject' defaultValue={"DEFAULT"}>
                                <option value="DEFAULT" disabled>Select Subject</option>
                                {subject && subject.map((item, index) => (
                                  <option value={item.Subject_Name + "/" + item.Standard} key={index}>
                                    {item.Subject_Name}
                                  </option>
                                ))}
                              </select>
                            </td>
                            <td>
                              <select className="select-any-options" name='user' required id='User_name' defaultValue={"DEFAULT"}>
                                <option value="DEFAULT" disabled>Select Teacher Name</option>
                                {teachers && teachers.map((item, index) => (
                                  <option value={item.T_name + "/" + item.T_icard_Id} key={index}>
                                    {item.T_name}
                                  </option>
                                ))}
                              </select>
                            </td>
                            <td>
                              <input type="time" placeholder='Select Date' className='time-table-time' />
                            </td>
                            <td>
                              <input type="time" placeholder='Select Date' className='time-table-time' />
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <select className="select-any-options" name='subject' required id='subject' defaultValue={"DEFAULT"}>
                                <option value="DEFAULT" disabled>Select Subject</option>
                                {subject && subject.map((item, index) => (
                                  <option value={item.Subject_Name + "/" + item.Standard} key={index}>
                                    {item.Subject_Name}
                                  </option>
                                ))}
                              </select>
                            </td>
                            <td>
                              <select className="select-any-options" name='user' required id='User_name' defaultValue={"DEFAULT"}>
                                <option value="DEFAULT" disabled>Select Teacher Name</option>
                                {teachers && teachers.map((item, index) => (
                                  <option value={item.T_name + "/" + item.T_icard_Id} key={index}>
                                    {item.T_name}
                                  </option>
                                ))}
                              </select>
                            </td>
                            <td>
                              <input type="time" placeholder='Select Date' className='time-table-time' />
                            </td>
                            <td>
                              <input type="time" placeholder='Select Date' className='time-table-time' />
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <select className="select-any-options" name='subject' required id='subject' defaultValue={"DEFAULT"}>
                                <option value="DEFAULT" disabled>Select Subject</option>
                                {subject && subject.map((item, index) => (
                                  <option value={item.Subject_Name + "/" + item.Standard} key={index}>
                                    {item.Subject_Name}
                                  </option>
                                ))}
                              </select>
                            </td>
                            <td>
                              <select className="select-any-options" name='user' required id='User_name' defaultValue={"DEFAULT"}>
                                <option value="DEFAULT" disabled>Select Teacher Name</option>
                                {teachers && teachers.map((item, index) => (
                                  <option value={item.T_name + "/" + item.T_icard_Id} key={index}>
                                    {item.T_name}
                                  </option>
                                ))}
                              </select>
                            </td>
                            <td>
                              <input type="time" placeholder='Select Date' className='time-table-time' />
                            </td>
                            <td>
                              <input type="time" placeholder='Select Date' className='time-table-time' />
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <select className="select-any-options" name='subject' required id='subject' defaultValue={"DEFAULT"}>
                                <option value="DEFAULT" disabled>Select Subject</option>
                                {subject && subject.map((item, index) => (
                                  <option value={item.Subject_Name + "/" + item.Standard} key={index}>
                                    {item.Subject_Name}
                                  </option>
                                ))}
                              </select>
                            </td>
                            <td>
                              <select className="select-any-options" name='user' required id='User_name' defaultValue={"DEFAULT"}>
                                <option value="DEFAULT" disabled>Select Teacher Name</option>
                                {teachers && teachers.map((item, index) => (
                                  <option value={item.T_name + "/" + item.T_icard_Id} key={index}>
                                    {item.T_name}
                                  </option>
                                ))}
                              </select>
                            </td>
                            <td>
                              <input type="time" placeholder='Select Date' className='time-table-time' />
                            </td>
                            <td>
                              <input type="time" placeholder='Select Date' className='time-table-time' />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    )}

                    {day4 && (
                      <table className='tab-time'>
                        <thead>
                          <tr className='tr-heading'>
                            <td>Subject</td>
                            <td>Teacher</td>
                            <td>Time From</td>
                            <td>Time To</td>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>
                              <select className="select-any-options" name='subject' required id='subject' defaultValue={"DEFAULT"}>
                                <option value="DEFAULT" disabled>Select Subject</option>
                                {subject && subject.map((item, index) => (
                                  <option value={item.Subject_Name + "/" + item.Standard} key={index}>
                                    {item.Subject_Name}
                                  </option>
                                ))}
                              </select>
                            </td>
                            <td>
                              <select className="select-any-options" name='user' required id='User_name' defaultValue={"DEFAULT"}>
                                <option value="DEFAULT" disabled>Select Teacher Name</option>
                                {teachers && teachers.map((item, index) => (
                                  <option value={item.T_name + "/" + item.T_icard_Id} key={index}>
                                    {item.T_name}
                                  </option>
                                ))}
                              </select>
                            </td>
                            <td>
                              <input type="time" placeholder='Select Date' className='time-table-time' />
                            </td>
                            <td>
                              <input type="time" placeholder='Select Date' className='time-table-time' />
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <select className="select-any-options" name='subject' required id='subject' defaultValue={"DEFAULT"}>
                                <option value="DEFAULT" disabled>Select Subject</option>
                                {subject && subject.map((item, index) => (
                                  <option value={item.Subject_Name + "/" + item.Standard} key={index}>
                                    {item.Subject_Name}
                                  </option>
                                ))}
                              </select>
                            </td>
                            <td>
                              <select className="select-any-options" name='user' required id='User_name' defaultValue={"DEFAULT"}>
                                <option value="DEFAULT" disabled>Select Teacher Name</option>
                                {teachers && teachers.map((item, index) => (
                                  <option value={item.T_name + "/" + item.T_icard_Id} key={index}>
                                    {item.T_name}
                                  </option>
                                ))}
                              </select>
                            </td>
                            <td>
                              <input type="time" placeholder='Select Date' className='time-table-time' />
                            </td>
                            <td>
                              <input type="time" placeholder='Select Date' className='time-table-time' />
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <select className="select-any-options" name='subject' required id='subject' defaultValue={"DEFAULT"}>
                                <option value="DEFAULT" disabled>Select Subject</option>
                                {subject && subject.map((item, index) => (
                                  <option value={item.Subject_Name + "/" + item.Standard} key={index}>
                                    {item.Subject_Name}
                                  </option>
                                ))}
                              </select>
                            </td>
                            <td>
                              <select className="select-any-options" name='user' required id='User_name' defaultValue={"DEFAULT"}>
                                <option value="DEFAULT" disabled>Select Teacher Name</option>
                                {teachers && teachers.map((item, index) => (
                                  <option value={item.T_name + "/" + item.T_icard_Id} key={index}>
                                    {item.T_name}
                                  </option>
                                ))}
                              </select>
                            </td>
                            <td>
                              <input type="time" placeholder='Select Date' className='time-table-time' />
                            </td>
                            <td>
                              <input type="time" placeholder='Select Date' className='time-table-time' />
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <select className="select-any-options" name='subject' required id='subject' defaultValue={"DEFAULT"}>
                                <option value="DEFAULT" disabled>Select Subject</option>
                                {subject && subject.map((item, index) => (
                                  <option value={item.Subject_Name + "/" + item.Standard} key={index}>
                                    {item.Subject_Name}
                                  </option>
                                ))}
                              </select>
                            </td>
                            <td>
                              <select className="select-any-options" name='user' required id='User_name' defaultValue={"DEFAULT"}>
                                <option value="DEFAULT" disabled>Select Teacher Name</option>
                                {teachers && teachers.map((item, index) => (
                                  <option value={item.T_name + "/" + item.T_icard_Id} key={index}>
                                    {item.T_name}
                                  </option>
                                ))}
                              </select>
                            </td>
                            <td>
                              <input type="time" placeholder='Select Date' className='time-table-time' />
                            </td>
                            <td>
                              <input type="time" placeholder='Select Date' className='time-table-time' />
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <select className="select-any-options" name='subject' required id='subject' defaultValue={"DEFAULT"}>
                                <option value="DEFAULT" disabled>Select Subject</option>
                                {subject && subject.map((item, index) => (
                                  <option value={item.Subject_Name + "/" + item.Standard} key={index}>
                                    {item.Subject_Name}
                                  </option>
                                ))}
                              </select>
                            </td>
                            <td>
                              <select className="select-any-options" name='user' required id='User_name' defaultValue={"DEFAULT"}>
                                <option value="DEFAULT" disabled>Select Teacher Name</option>
                                {teachers && teachers.map((item, index) => (
                                  <option value={item.T_name + "/" + item.T_icard_Id} key={index}>
                                    {item.T_name}
                                  </option>
                                ))}
                              </select>
                            </td>
                            <td>
                              <input type="time" placeholder='Select Date' className='time-table-time' />
                            </td>
                            <td>
                              <input type="time" placeholder='Select Date' className='time-table-time' />
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <select className="select-any-options" name='subject' required id='subject' defaultValue={"DEFAULT"}>
                                <option value="DEFAULT" disabled>Select Subject</option>
                                {subject && subject.map((item, index) => (
                                  <option value={item.Subject_Name + "/" + item.Standard} key={index}>
                                    {item.Subject_Name}
                                  </option>
                                ))}
                              </select>
                            </td>
                            <td>
                              <select className="select-any-options" name='user' required id='User_name' defaultValue={"DEFAULT"}>
                                <option value="DEFAULT" disabled>Select Teacher Name</option>
                                {teachers && teachers.map((item, index) => (
                                  <option value={item.T_name + "/" + item.T_icard_Id} key={index}>
                                    {item.T_name}
                                  </option>
                                ))}
                              </select>
                            </td>
                            <td>
                              <input type="time" placeholder='Select Date' className='time-table-time' />
                            </td>
                            <td>
                              <input type="time" placeholder='Select Date' className='time-table-time' />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    )}

                    {day5 && (
                      <table className='tab-time'>
                        <thead>
                          <tr className='tr-heading'>
                            <td>Subject</td>
                            <td>Teacher</td>
                            <td>Time From</td>
                            <td>Time To</td>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>
                              <select className="select-any-options" name='subject' required id='subject' defaultValue={"DEFAULT"}>
                                <option value="DEFAULT" disabled>Select Subject</option>
                                {subject && subject.map((item, index) => (
                                  <option value={item.Subject_Name + "/" + item.Standard} key={index}>
                                    {item.Subject_Name}
                                  </option>
                                ))}
                              </select>
                            </td>
                            <td>
                              <select className="select-any-options" name='user' required id='User_name' defaultValue={"DEFAULT"}>
                                <option value="DEFAULT" disabled>Select Teacher Name</option>
                                {teachers && teachers.map((item, index) => (
                                  <option value={item.T_name + "/" + item.T_icard_Id} key={index}>
                                    {item.T_name}
                                  </option>
                                ))}
                              </select>
                            </td>
                            <td>
                              <input type="time" placeholder='Select Date' className='time-table-time' />
                            </td>
                            <td>
                              <input type="time" placeholder='Select Date' className='time-table-time' />
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <select className="select-any-options" name='subject' required id='subject' defaultValue={"DEFAULT"}>
                                <option value="DEFAULT" disabled>Select Subject</option>
                                {subject && subject.map((item, index) => (
                                  <option value={item.Subject_Name + "/" + item.Standard} key={index}>
                                    {item.Subject_Name}
                                  </option>
                                ))}
                              </select>
                            </td>
                            <td>
                              <select className="select-any-options" name='user' required id='User_name' defaultValue={"DEFAULT"}>
                                <option value="DEFAULT" disabled>Select Teacher Name</option>
                                {teachers && teachers.map((item, index) => (
                                  <option value={item.T_name + "/" + item.T_icard_Id} key={index}>
                                    {item.T_name}
                                  </option>
                                ))}
                              </select>
                            </td>
                            <td>
                              <input type="time" placeholder='Select Date' className='time-table-time' />
                            </td>
                            <td>
                              <input type="time" placeholder='Select Date' className='time-table-time' />
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <select className="select-any-options" name='subject' required id='subject' defaultValue={"DEFAULT"}>
                                <option value="DEFAULT" disabled>Select Subject</option>
                                {subject && subject.map((item, index) => (
                                  <option value={item.Subject_Name + "/" + item.Standard} key={index}>
                                    {item.Subject_Name}
                                  </option>
                                ))}
                              </select>
                            </td>
                            <td>
                              <select className="select-any-options" name='user' required id='User_name' defaultValue={"DEFAULT"}>
                                <option value="DEFAULT" disabled>Select Teacher Name</option>
                                {teachers && teachers.map((item, index) => (
                                  <option value={item.T_name + "/" + item.T_icard_Id} key={index}>
                                    {item.T_name}
                                  </option>
                                ))}
                              </select>
                            </td>
                            <td>
                              <input type="time" placeholder='Select Date' className='time-table-time' />
                            </td>
                            <td>
                              <input type="time" placeholder='Select Date' className='time-table-time' />
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <select className="select-any-options" name='subject' required id='subject' defaultValue={"DEFAULT"}>
                                <option value="DEFAULT" disabled>Select Subject</option>
                                {subject && subject.map((item, index) => (
                                  <option value={item.Subject_Name + "/" + item.Standard} key={index}>
                                    {item.Subject_Name}
                                  </option>
                                ))}
                              </select>
                            </td>
                            <td>
                              <select className="select-any-options" name='user' required id='User_name' defaultValue={"DEFAULT"}>
                                <option value="DEFAULT" disabled>Select Teacher Name</option>
                                {teachers && teachers.map((item, index) => (
                                  <option value={item.T_name + "/" + item.T_icard_Id} key={index}>
                                    {item.T_name}
                                  </option>
                                ))}
                              </select>
                            </td>
                            <td>
                              <input type="time" placeholder='Select Date' className='time-table-time' />
                            </td>
                            <td>
                              <input type="time" placeholder='Select Date' className='time-table-time' />
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <select className="select-any-options" name='subject' required id='subject' defaultValue={"DEFAULT"}>
                                <option value="DEFAULT" disabled>Select Subject</option>
                                {subject && subject.map((item, index) => (
                                  <option value={item.Subject_Name + "/" + item.Standard} key={index}>
                                    {item.Subject_Name}
                                  </option>
                                ))}
                              </select>
                            </td>
                            <td>
                              <select className="select-any-options" name='user' required id='User_name' defaultValue={"DEFAULT"}>
                                <option value="DEFAULT" disabled>Select Teacher Name</option>
                                {teachers && teachers.map((item, index) => (
                                  <option value={item.T_name + "/" + item.T_icard_Id} key={index}>
                                    {item.T_name}
                                  </option>
                                ))}
                              </select>
                            </td>
                            <td>
                              <input type="time" placeholder='Select Date' className='time-table-time' />
                            </td>
                            <td>
                              <input type="time" placeholder='Select Date' className='time-table-time' />
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <select className="select-any-options" name='subject' required id='subject' defaultValue={"DEFAULT"}>
                                <option value="DEFAULT" disabled>Select Subject</option>
                                {subject && subject.map((item, index) => (
                                  <option value={item.Subject_Name + "/" + item.Standard} key={index}>
                                    {item.Subject_Name}
                                  </option>
                                ))}
                              </select>
                            </td>
                            <td>
                              <select className="select-any-options" name='user' required id='User_name' defaultValue={"DEFAULT"}>
                                <option value="DEFAULT" disabled>Select Teacher Name</option>
                                {teachers && teachers.map((item, index) => (
                                  <option value={item.T_name + "/" + item.T_icard_Id} key={index}>
                                    {item.T_name}
                                  </option>
                                ))}
                              </select>
                            </td>
                            <td>
                              <input type="time" placeholder='Select Date' className='time-table-time' />
                            </td>
                            <td>
                              <input type="time" placeholder='Select Date' className='time-table-time' />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    )}

                    {day6 && (
                      <>
                        <table className='tab-time'>
                          <thead>
                            <tr className='tr-heading'>
                              <td>Subject</td>
                              <td>Teacher</td>
                              <td>Time From</td>
                              <td>Time To</td>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>
                                <select className="select-any-options" name='subject' required id='subject' defaultValue={"DEFAULT"}>
                                  <option value="DEFAULT" disabled>Select Subject</option>
                                  {subject && subject.map((item, index) => (
                                    <option value={item.Subject_Name + "/" + item.Standard} key={index}>
                                      {item.Subject_Name}
                                    </option>
                                  ))}
                                </select>
                              </td>
                              <td>
                                <select className="select-any-options" name='user' required id='User_name' defaultValue={"DEFAULT"}>
                                  <option value="DEFAULT" disabled>Select Teacher Name</option>
                                  {teachers && teachers.map((item, index) => (
                                    <option value={item.T_name + "/" + item.T_icard_Id} key={index}>
                                      {item.T_name}
                                    </option>
                                  ))}
                                </select>
                              </td>
                              <td>
                                <input type="time" placeholder='Select Date' className='time-table-time' />
                              </td>
                              <td>
                                <input type="time" placeholder='Select Date' className='time-table-time' />
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <select className="select-any-options" name='subject' required id='subject' defaultValue={"DEFAULT"}>
                                  <option value="DEFAULT" disabled>Select Subject</option>
                                  {subject && subject.map((item, index) => (
                                    <option value={item.Subject_Name + "/" + item.Standard} key={index}>
                                      {item.Subject_Name}
                                    </option>
                                  ))}
                                </select>
                              </td>
                              <td>
                                <select className="select-any-options" name='user' required id='User_name' defaultValue={"DEFAULT"}>
                                  <option value="DEFAULT" disabled>Select Teacher Name</option>
                                  {teachers && teachers.map((item, index) => (
                                    <option value={item.T_name + "/" + item.T_icard_Id} key={index}>
                                      {item.T_name}
                                    </option>
                                  ))}
                                </select>
                              </td>
                              <td>
                                <input type="time" placeholder='Select Date' className='time-table-time' />
                              </td>
                              <td>
                                <input type="time" placeholder='Select Date' className='time-table-time' />
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <select className="select-any-options" name='subject' required id='subject' defaultValue={"DEFAULT"}>
                                  <option value="DEFAULT" disabled>Select Subject</option>
                                  {subject && subject.map((item, index) => (
                                    <option value={item.Subject_Name + "/" + item.Standard} key={index}>
                                      {item.Subject_Name}
                                    </option>
                                  ))}
                                </select>
                              </td>
                              <td>
                                <select className="select-any-options" name='user' required id='User_name' defaultValue={"DEFAULT"}>
                                  <option value="DEFAULT" disabled>Select Teacher Name</option>
                                  {teachers && teachers.map((item, index) => (
                                    <option value={item.T_name + "/" + item.T_icard_Id} key={index}>
                                      {item.T_name}
                                    </option>
                                  ))}
                                </select>
                              </td>
                              <td>
                                <input type="time" placeholder='Select Date' className='time-table-time' />
                              </td>
                              <td>
                                <input type="time" placeholder='Select Date' className='time-table-time' />
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <select className="select-any-options" name='subject' required id='subject' defaultValue={"DEFAULT"}>
                                  <option value="DEFAULT" disabled>Select Subject</option>
                                  {subject && subject.map((item, index) => (
                                    <option value={item.Subject_Name + "/" + item.Standard} key={index}>
                                      {item.Subject_Name}
                                    </option>
                                  ))}
                                </select>
                              </td>
                              <td>
                                <select className="select-any-options" name='user' required id='User_name' defaultValue={"DEFAULT"}>
                                  <option value="DEFAULT" disabled>Select Teacher Name</option>
                                  {teachers && teachers.map((item, index) => (
                                    <option value={item.T_name + "/" + item.T_icard_Id} key={index}>
                                      {item.T_name}
                                    </option>
                                  ))}
                                </select>
                              </td>
                              <td>
                                <input type="time" placeholder='Select Date' className='time-table-time' />
                              </td>
                              <td>
                                <input type="time" placeholder='Select Date' className='time-table-time' />
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        <div className="final-submit" style={{ textAlign: "center" }}>
                          <button type='submit' className='save-all-forms'>Save</button>
                        </div>
                      </>
                    )}
                  </form> */}
                </div>
              </div>
            </div>
          </div>

          {/* Edit Modal */}
        </div>
      </div>
    </div >
  )
}

export default TimeTableData