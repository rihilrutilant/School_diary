import React, { useCallback, useEffect, useRef, useState } from 'react'
import Navbar from './Navbar';
import Topbar from './Topbar';
import { ReactSession } from 'react-client-session';
import "../Style/Time.css"
import apiConst from "../Api_keys"
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MdOutlineOpenInFull } from 'react-icons/md'
import { Link } from 'react-router-dom';

const TimeTableData = () => {
  const [navVisible, showNavbar] = useState(true);
  ReactSession.setStoreType("localStorage");
  const Data = ReactSession.get("username");
  const DataStudent = Data.substring(0, 2);
  const DataStudClass = Data.substring(2);
  const DataClass = DataStudent + '/' + DataStudClass;

  //----------------------------- Fetch Exam ------------------------

  const [allSubject, setAllSubject] = useState();
  const getSubject = useCallback(async () => {
    const Class_code = Data;
    const response = await fetch(apiConst.fetch_all_timetable_by_classes, {
      method: "POST",
      body: JSON.stringify({ Class_code }),
      headers: {
        "Content-Type": "application/json",
        "authToken_admin": localStorage.getItem("AToken")
      },
    });
    const json = await response.json();
    setAllSubject(json)
  }, [DataStudent]);

  const dailyTimeTable = allSubject?.Daily_TimeTable || '';

  //----------------------------- Fetch Exam ------------------------

  //--------------------------- Create Exam --------------------

  const [examData, setExamData] = useState({ Class_code: '', tt_img: null })

  const clearFields = () => {
    setExamData('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('Class_code', examData.Class_code);
      formData.append('tt_img', examData.tt_img);


      const response = await axios.post(apiConst.make_timetable, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "authToken_admin": localStorage.getItem("AToken"),
        }
      });

      if (response.data.success) {
        toast.success("Time Table generated successfully", { position: toast.POSITION.TOP_RIGHT });
        getSubject();
        clearFields();
      }
      else {
        toast.error(response.data.error, { position: toast.POSITION.TOP_RIGHT });
      }
    } catch (error) {
      toast.error(error.response.data.error[0].msg, { position: toast.POSITION.TOP_RIGHT });
    }
  }

  const onChange = (e) => {
    if (e.target.name === 'tt_img') {
      setExamData({ ...examData, [e.target.name]: e.target.files[0] });
    } else {
      setExamData({ ...examData, [e.target.name]: e.target.value });
    }
  }

  //--------------------------- Create Exam --------------------

  //--------------------------- Update Exam --------------------

  const refClose = useRef(null);
  const [updateNotice, setUpdateNotice] = useState({ tt_img: null })

  const updateRestNotice = (currentNotice) => {
    refClose.current.click();
    setUpdateNotice({
      id: currentNotice,
      tt_img: currentNotice.tt_img
    })
  }

  const handleSubmit1 = (e) => {
    e.preventDefault();
    RestUpdateNotice(
      updateNotice.id,
      updateNotice.tt_img
    );
  }

  const RestUpdateNotice = async (id, tt_img) => {
    try {
      const updateformData = new FormData();
      updateformData.append('tt_img', tt_img);
      const response = await axios.patch(apiConst.edit_timetable + id, updateformData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "authToken_admin": localStorage.getItem("AToken"),
        }
      });
      const json = response.data
      if (response.data.success) {
        toast.success("TimeTable Updated Successfully", { position: toast.POSITION.TOP_RIGHT });
        getSubject();
      }
      else {
        toast.error("response.data.error", { position: toast.POSITION.TOP_RIGHT });
      }
    } catch (error) {
      toast.error(error, { position: toast.POSITION.TOP_RIGHT });
    }
  }

  const onChanges = (e) => {
    if (e.target.name === 'tt_img') {
      setUpdateNotice({ ...updateNotice, [e.target.name]: e.target.files[0] });
    } else {
      setUpdateNotice({ ...updateNotice, [e.target.name]: e.target.value });
    }
  }

  // ----------------------------------------------------------------Update Notices --------------------------------

  useEffect(() => {
    getSubject();
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, []);

  return (
    <>
      <ToastContainer />
      <div className="main-content">
        <Navbar visible={navVisible} show={showNavbar} />
        <div className="inner-main-content"  >
          <Topbar />
          <div className="container-fluid">
            <div className="studentid_cnt">
              <h4 className='main-name'>Time Table<span> {DataClass}</span></h4>
            </div>
            <div className='ganerate_id_part'>
              <div className='ganerateid_cnt'>
                {
                  allSubject === null ?
                    <>
                      <h2 style={{ color: "#E33535", textAlign: "center" }}>Time Table not found</h2>
                      <button className='gene-time' data-bs-toggle="modal" data-bs-target="#staticBackdrop">+ Generate TimeTable</button>
                    </>
                    :
                    dailyTimeTable && dailyTimeTable.toLowerCase().endsWith('.pdf') ? (
                      <>
                        <iframe
                          src={`https://api.nutanpublic.naavhub.com/time_table/${dailyTimeTable}`}
                          title={dailyTimeTable}
                          className="timetable-photo"
                        />
                      </>
                    ) : (
                      <>
                        <img
                          src={`https://api.nutanpublic.naavhub.com/time_table/${dailyTimeTable}`}
                          alt={dailyTimeTable}
                          className="timetable-photo"
                        />
                      </>
                    )
                }
              </div>
              <button className='gene-edit-time' onClick={() => updateRestNotice(allSubject._id)}>Edit TimeTable</button>
              <div className='open-full'>
                <Link target='_blank' to={`https://api.nutanpublic.naavhub.com/time_table/${dailyTimeTable}`}>
                  <MdOutlineOpenInFull />
                </Link>
              </div>
            </div>

            {/* generate Exam */}

            <div className="modal fade sp_model_1" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" aria-labelledby="staticBackdropLabel" aria-hidden="true" tabIndex='-1'>
              <div className="modal-dialog">
                <div className="modal-content editid_modal">
                  <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                  <form id="editid_form" className="editid_form" onSubmit={handleSubmit}>
                    <div className='input_part idcard_input'>
                      <label>Class Code</label> <br />
                      <input type="text" value={examData.Standard} name="Class_code" onChange={onChange} />
                    </div>

                    <div className='input_part idcard_input'>
                      <label>Document</label> <br />
                      <input type="file" accept="application/pdf" required name="tt_img" onChange={onChange} /><br />
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
            <button type="button" ref={refClose} style={{ display: "none" }} className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#edit3">
              Launch demo modal
            </button>

            <div className="modal fade" id="edit3" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div className="modal-body">
                    <div className="update-part">
                      <div className="first-part-update">
                        <p className='send'>Update TimeTable</p>
                        <div className="tb1-update ">
                          <label className='amt' name='tt_img'>Document</label>
                          <input type="file" accept="image/*, application/pdf" onChange={onChanges} name='tt_img' /><br />
                          <p className='only-accepts'>(Only Accepts Images and PDF)</p><br />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn-upd" onClick={handleSubmit1} data-bs-dismiss="modal" aria-label="Close">UPDATE</button>
                  </div>
                </div>
              </div>
            </div>
            {/* Update Exam */}
          </div>
        </div>
      </div >
    </>
  )
};

export default TimeTableData