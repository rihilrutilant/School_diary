import React, { useEffect, useRef, useState } from 'react'
import Navbar from "../Pages/Navbar"
import Topbar from './Topbar';
import { ReactSession } from 'react-client-session';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { AiFillDelete } from 'react-icons/ai'
import "../Style/EventsPhoto.css"
import apiConst from "../Api_keys"


const EventsPhoto = () => {

  const refClose = useRef(null);

  const [navVisible, showNavbar] = useState(true);
  useEffect(() => {
    getAllPhotos();
    getEvents();
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, []);

  ReactSession.setStoreType("localStorage");

  const navigate = useNavigate();

  const onChange = (event) => {
    ReactSession.set("username", event.Event_title);
    ReactSession.set("photos", event.Event_Photos);

    navigate('/photosdata')
  };

  // --------------- Fetch all phtos --------------------
  const [EventTitle, setEventTitle] = useState();

  const getAllPhotos = async () => {
    const response = await fetch(apiConst.fetch_all_event_photos,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "authToken_admin": localStorage.getItem("AToken")
        },
      });

    const json = await response.json();
    setEventTitle(json);
  };

  // --------------- Fetch all phtos --------------------

  // --------------- Add Photos -------------------------
  const [photosData, setPhotosData] = useState({
    Event_title: ''
  });
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('Event_title', photosData.Event_title);
      for (let index = 0; index < img_files.length; index++) {
        formData.append('events_files', img_files[index]);
      }
      const response = await axios.post(apiConst.upload_event_photos, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "authToken_admin": localStorage.getItem("AToken"),
        }
      });
      
      if (response.data.success) {
        refClose.current.click();
        toast.success("Photo Added", { position: toast.POSITION.TOP_RIGHT });
        getAllPhotos();
        setPhotosData({
          Event_title: ''
        });
      }
      else {
        toast.error(response.data.error, { position: toast.POSITION.TOP_RIGHT });
      }
    } catch (error) {
      toast.error("Enter Valid Data", { position: toast.POSITION.TOP_RIGHT });
    }
  }
  const [img_files, setimg_files] = useState()
  const onChange1 = (e) => {
    if (e.target.name === 'Event_Photos') {
      setimg_files(e.target.files)
    } else {
      setPhotosData({ ...photosData, [e.target.name]: e.target.value });
    }
  }
  // --------------- Add Photos -------------------------

  //  -------------------- Extra Stuff --------------------

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

  //  -------------------- Extra Stuff --------------------

  //---------------------- Delete Event --------------------

  const deleteRest = (id) => {
    fetch(apiConst.delete_event_photos+id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "authToken_admin": localStorage.getItem("AToken"),
      },
    }).then((result) => {
      result.json().then((resp) => {
        if (resp.success) {
          toast.success("Event Deleted Successfully", { position: toast.POSITION.TOP_RIGHT });
          getAllPhotos();
        }
        else {
          toast.error(resp.error, { position: toast.POSITION.TOP_RIGHT });
        }
        getAllPhotos();
      })
    })
  }

  //---------------------- Delete Event --------------------

  return (
    <>
      <ToastContainer />
      <div className="main-content">
        <Navbar visible={navVisible} show={showNavbar} />
        <div className="inner-main-content"  >
          <Topbar />
          <div className="container-fluid">
            <h4 className='main-name'>Event Photos</h4>
            <button className='examschedule_btn' data-bs-toggle="modal" data-bs-target="#staticBackdrop">+ Add Photos</button>
            <div className='ganerateid_cnt'>
              <div className='ganerateid_cnt_inn'>
                <div className='teacherid_check'>
                  <div className='teacherid_detail'>
                    {
                      EventTitle === "No Event Photos Found"
                        ?
                        <h2 style={{ color: "red" }}>Data not available</h2>
                        :
                        EventTitle && EventTitle.map((item, index) => (
                          <div key={index}>
                            <div className='studentid_btn jcsb event_detail' >
                              <div onClick={() => onChange(item)} style={{ cursor: "pointer" }}>
                                {item.Event_title}
                              </div>
                              <AiFillDelete style={{ cursor: "pointer" }} onClick={() => deleteRest(item._id)} />
                            </div>
                          </div>
                        ))
                    }
                  </div>
                </div>
              </div>
            </div>

            {/* Add Photos */}
            <div className="modal fade sp_model_1" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" aria-labelledby="staticBackdropLabel" aria-hidden="true">
              <div className="modal-dialog">
                <div className="modal-content editid_modal">
                  <button type="button" className="btn-close" ref={refClose} data-bs-dismiss="modal"></button>
                  <form id="editid_form" className="editid_form" onSubmit={handleSubmit}>
                    <div className='input_part idcard_input'>
                      <label>Title</label><br />
                      <select className="any-options" onChange={onChange1} name='Event_title' required id='Event_title' defaultValue={"DEFAULT"}>
                        <option value="DEFAULT" disabled>Select Event Title</option>
                        {events && events.map((item, index) => (
                          <option value={item.Event_title} key={index}>
                            {item.Event_title}
                          </option>
                        ))}
                      </select>

                    </div>
                    <div className='input_part standard_input'>
                      <label>Photo</label> <br />
                      <input type="file" accept="image/*, video/mp4" multiple onChange={onChange1} required name="Event_Photos" /><br />
                      <p className='only-accepts'>(Only Accepts Images, Videos and PDF)</p><br />
                    </div>
                    <div className="save_part">
                      <button className="save_btn" type="submit">SAVE</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default EventsPhoto