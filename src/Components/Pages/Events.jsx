import React, { useEffect, useRef, useState } from "react";
import "../Style/Events.css";
import Navbar from "../Pages/Navbar";
import Topbar from "./Topbar";
import "react-calendar/dist/Calendar.css";
import { FaEdit } from "react-icons/fa";
import { FaRegTrashAlt } from "react-icons/fa";
import { toast, ToastContainer } from 'react-toastify';
import { Link } from "react-router-dom";
import apiConst from "../Api_keys"

const Events = () => {

  const [navVisible, showNavbar] = useState(true);
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    getEvents();
  }, []);

  //------------------------- Fetch Events --------------------
  const [events, setEvents] = useState();
  const getEvents = async () => {
    const response = await fetch(apiConst.fetch_all_events, {
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

  //-----------------------Delete Events --------------------------------

  const deleteRest = (id) => {
    fetch(apiConst.delete_events + id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "authToken_admin": localStorage.getItem("AToken"),
      },
    }).then((result) => {
      result.json().then((resp) => {
        if (resp.success) {
          toast.success("Event Deleted Successfully", { position: toast.POSITION.TOP_RIGHT });
          getEvents();
        }
        else {
          toast.error(resp.error, { position: toast.POSITION.TOP_RIGHT });
        }
        getEvents();
      })
    })
  }


  //--------------------Delete Events --------------------------------

  //--------------------Add Events --------------------------------

  const refClose = useRef(null)
  const ref2 = useRef(null);
  const refClose2 = useRef(null);

  const [newEvents, setNewEvents] = useState({
    Event_title: "",
    Event_description: "",
    Event_Start: "",
    Event_End: "",
    Groups: ""
  })

  const addEvents = async (e) => {
    e.preventDefault();
    const {
      Event_title,
      Event_description,
      Event_Start,
      Event_End,
      Groups
    } = newEvents;
    const response = await fetch(apiConst.send_event, {
      method: 'POST',
      body: JSON.stringify({
        Event_title,
        Event_description,
        Event_Start,
        Event_End,
        Groups
      }),
      headers: {
        'Content-Type': 'application/json',
        'authToken_admin': localStorage.getItem("AToken")
      }
    });

    const json = await response.json();
    if (json.success) {
      refClose.current.click();
      getEvents();
      toast.success("Events added successfully", { position: toast.POSITION.TOP_RIGHT });
      const timer = setTimeout(() => {
      }, 1000);
      return () => clearTimeout(timer);
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

  const onChangesEvents = (e) => {
    setNewEvents({ ...newEvents, [e.target.name]: e.target.value })
  }

  //--------------------Add Events --------------------------------

  //-------------------- Update Events --------------------------------

  const [updateEvents, setUpdateEvents] = useState({
    Event_title: "",
    Event_description: "",
    Event_Start: "",
    Event_End: "",
    Groups: ""
  })

  const updateRestEvents = (currentEvents) => {
    ref2.current.click();
    setUpdateEvents({
      id: currentEvents._id,
      Event_title: currentEvents.Event_title,
      Event_description: currentEvents.Event_description,
      Event_Start: currentEvents.Event_Start.split('T')[0],
      Event_End: currentEvents.Event_End.split('T')[0],
      Groups: currentEvents.Groups,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    RestUpdateEvents(
      updateEvents.id,
      updateEvents.Event_title,
      updateEvents.Event_description,
      updateEvents.Event_Start,
      updateEvents.Event_End,
      updateEvents.Groups
    );
  }

  const RestUpdateEvents = async (id, Event_title, Event_description, Event_Start, Event_End, Groups) => {

    const responseHoliday = await fetch(apiConst.edit_event + id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "authToken_admin": localStorage.getItem("AToken"),
      },
      body: JSON.stringify({ Event_title, Event_description, Event_Start, Event_End, Groups })
    });

    // console.log(responseHoliday);
    const json = await responseHoliday.json();

    // console.log(json);
    if (json.success === true) {
      refClose2.current.click();
      getEvents();
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
    setUpdateEvents({ ...updateEvents, [e.target.name]: e.target.value });
  }

  //-------------------- Update Events --------------------------------

  return (
    <>
      <ToastContainer />
      <div className="main-content">
        <Navbar visible={navVisible} show={showNavbar} />
        <div className="inner-main-content">
          <Topbar />
          <div className="container-fluid">
            <div className="add_ePhoto">
              <h4 className="main-name">Events</h4>
              <Link to="/eventsphoto" className="eventsphoto">
                All Photos
              </Link>
            </div>

            <section>
              <div className="about_events">
                <div className="event_list">
                  <div className="eventList_head">
                    <h3>Event list</h3>
                    <button data-bs-toggle="modal" data-bs-target="#event_one">
                      + Add Event
                    </button>
                  </div>

                  <div className="eventList_table">
                    <table>

                      <thead>
                        <tr>
                          <th>Event title</th>
                          <th>Class section</th>
                          <th>From</th>
                          <th>To</th>
                          <th>Action</th>
                        </tr>
                      </thead>

                      {events && events.map((a, i) => (
                        <tbody key={i}>
                          <tr>
                            <td>{a.Event_title}</td>
                            <td>{a.Groups} </td>
                            <td>{a.Event_Start.split('T')[0]}</td>
                            <td>{a.Event_End.split('T')[0]}</td>
                            <td>
                              <button>
                                <FaEdit onClick={() => updateRestEvents(a)} />
                              </button>
                              <button>
                                <FaRegTrashAlt onClick={() => deleteRest(a._id)} />
                              </button>
                            </td>
                          </tr>
                        </tbody>
                      ))}
                    </table>
                  </div>
                </div>
              </div>

              {/* ------------------------ Add    MODAL 1    -----------------------------  */}

              <div
                className="modal fade"
                id="event_one"
                tabIndex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <div className="addEvent_modal">
                        <h2>Add Event</h2>

                        <hr />

                        <div className="eventFor_modal">
                          <h5>Event for</h5>
                          <div className="eventFor_modal_option">
                            <input className='chbtn' type="radio" id="1" required onChange={onChangesEvents} name="Groups" value="Students" />
                            <label className='chstudent' htmlFor="1" name='Groups'>Student</label><br />
                            <input className='chbtn' type="radio" id="2" required onChange={onChangesEvents} name="Groups" value="Teachers" />
                            <label className='chstudent' htmlFor="2" name='Groups'>Teacher</label><br />
                            <input className='chbtn' type="radio" id="3" required onChange={onChangesEvents} name="Groups" value="All" />
                            <label className='chstudent' htmlFor="3" name='Groups'>All</label><br />
                          </div>
                        </div>
                        <div className="eventModal_table">
                          <div className="eTable_title">
                            <label htmlFor="">Event title</label>
                            <input
                              type="text"
                              placeholder="Fees notification"
                              name="Event_title" onChange={onChangesEvents}
                            />
                          </div>

                          <div className="eTable_date">
                            <div className="date_from">
                              <label htmlFor="">Event from date</label>
                              <input id="date" type="date" name="Event_Start" onChange={onChangesEvents} />
                            </div>
                            <div className="date_to">
                              <label htmlFor="">Event to date</label>
                              <input id="date" type="date" name="Event_End" onChange={onChangesEvents} />
                            </div>
                          </div>

                          <div className="eTable_note">
                            <label htmlFor="">Note</label>
                            <input
                              type="text"
                              placeholder="The fee notification is sent electronically to the main contact stated in the ear-portal."
                              name="Event_description" onChange={onChangesEvents}
                            />
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
                        <button className="save_btn" onClick={addEvents}> SAVE</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* ------------------------ Update   MODAL 2    -----------------------------  */}
              <button type="button" ref={ref2} style={{ display: "none" }} className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#event_two">
                Launch demo modal
              </button>

              <div
                className="modal fade"
                id="event_two"
                tabIndex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <div className="addEvent_modal">
                        <h2>Update Events</h2>
                        <hr />
                        <div className="eventFor_modal">
                          <h5>Event for</h5>
                          <div className="eventFor_modal_option">
                            <input className='chbtn' type="radio" id="1" onChange={onChanges} checked={updateEvents.Groups === 'Students'} name="Groups" value="Students" />
                            <label className='chstudent' htmlFor="student" name='Groups'>Student</label><br />
                            <input className='chbtn' type="radio" id="2" onChange={onChanges} checked={updateEvents.Groups === 'Teachers'} name="Groups" value="Teachers" />
                            <label className='chstudent' htmlFor="student" name='Groups'>Teacher</label><br />
                            <input className='chbtn' type="radio" id="3" onChange={onChanges} checked={updateEvents.Groups === 'All'} name="Groups" value="All" />
                            <label className='chstudent' htmlFor="student" name='Groups'>All</label><br />
                          </div>
                        </div>
                        <div className="eventModal_table">
                          <div className="eTable_title">
                            <label htmlFor="">Event title</label>
                            <input type="text" name='Event_title' required id='Event_title' value={updateEvents.Event_title} onChange={onChanges} />
                          </div>
                          <div className="eTable_date ev_photo">
                            <div className="date_from">
                              <label htmlFor="">Event Starting date</label>
                              <input id="date" type="date" name="Event_Start" onChange={onChanges} value={updateEvents.Event_Start.split('T')[0]} />
                            </div>
                            <div className="date_from">
                              <label htmlFor="">Event Ending date</label>
                              <input id="date" type="date" name="Event_End" onChange={onChanges} value={updateEvents.Event_End.split('T')[0]} />
                            </div>
                          </div>

                          <div className="eTable_note">
                            <label htmlFor="">Note</label>
                            <input type="text" name="Event_description" required id='Event_description' value={updateEvents.Event_description} onChange={onChanges}
                            />
                          </div>
                        </div>
                      </div>

                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                        ref={refClose2}
                      ></button>
                    </div>
                    {/* <div  className="modal-body">...</div> */}
                    <div className="modal-footer">
                      <div className="hTable_btn ev_view_btn">
                        <button className="save_btn" onClick={handleSubmit}> SAVE</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default Events;
