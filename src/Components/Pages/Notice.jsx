import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom';
import "../Style/Notice.css"
import Navbar from "../Pages/Navbar"
import Topbar from './Topbar';
import { BiEditAlt } from 'react-icons/bi'
import { AiFillDelete } from 'react-icons/ai'
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Api_keys from '../Api_keys'



const Notice = () => {
  const [navVisible, showNavbar] = useState(true);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    getNotice();
  }, []);

  const [display, setDisplay] = useState("none")

  const antc = () => {
    setDisplay(display === "none" ? "block" : "none")
  }


  // ------------------- send notice the student and teachers -----------------------
  const [noticeData, setNoticeData] = useState({
    Notice_title: '',
    Notice_description: '',
    Group: '',
    noticeFile: null,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('Notice_title', noticeData.Notice_title);
      formData.append('Notice_description', noticeData.Notice_description);
      formData.append('Group', noticeData.Group);
      formData.append('notice_attach', noticeData.noticeFile);

      const response = await axios.post(Api_keys.send_notice, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "authToken_admin": localStorage.getItem("AToken"),
        }
      });

      if (response.data.success) {
        toast.success("Notice generated successfully", { position: toast.POSITION.TOP_RIGHT });
        setNoticeData({
          Notice_title: '',
          Notice_description: '',
          Group: '',
          noticeFile: null,
        });
        getNotice();
      }
      else {
        toast.error(response.data.error, { position: toast.POSITION.TOP_RIGHT });
      }
    } catch (error) {
      toast.error(error.response.data.error[0].msg, { position: toast.POSITION.TOP_RIGHT });
    }
  }

  const onChange1 = (e) => {
    if (e.target.name === 'noticeFile') {
      setNoticeData({ ...noticeData, [e.target.name]: e.target.files[0] });
    } else {
      setNoticeData({ ...noticeData, [e.target.name]: e.target.value });
    }
  }


  //-----------------Fetch Notices ----------------

  const [notice, setNotice] = useState();

  const getNotice = async () => {
    const response = await fetch(Api_keys.get_all_notice, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "authToken_admin": localStorage.getItem("AToken")
      },
    });

    const json = await response.json();
    console.log(json);
    setNotice(json);
  };

  //-----------------Fetch Notices ----------------

  // -------------Update Notices --------------------

  const ref = useRef(null);

  const [updateNotice, setUpdateNotice] = useState({
    Notice_title: "",
    Notice_description: "",
    Notice_attechments: null,
    Group: ""
  })

  const updateRestNotice = (currentNotice) => {
    ref.current.click();
    setUpdateNotice({
      id: currentNotice._id,
      Notice_title: currentNotice.Notice_title,
      Notice_description: currentNotice.Notice_description,
      Notice_attechments: currentNotice.notice_attach,
      Group: currentNotice.Group
    })
  }

  const handleSubmit1 = (e) => {
    e.preventDefault();
    RestUpdateNotice(
      updateNotice.id,
      updateNotice.Notice_title,
      updateNotice.Notice_description,
      updateNotice.Notice_attechments,
      updateNotice.Group
    );
  }

  const RestUpdateNotice = async (id, Notice_title, Notice_description, Notice_attechments, Group) => {
    try {
      const updateformData = new FormData();
      updateformData.append('Notice_title', Notice_title);
      updateformData.append('Notice_description', Notice_description);
      updateformData.append('notice_attach', Notice_attechments);
      updateformData.append('Group', Group);

      const response = await axios.patch(Api_keys.edit_Notice + id, updateformData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "authToken_admin": localStorage.getItem("AToken"),
        }
      });

      if (response.data.success) {
        toast.success("Notice Updated Successfully", { position: toast.POSITION.TOP_RIGHT });
        getNotice();
      }
      else {
        toast.error(response.data.error, { position: toast.POSITION.TOP_RIGHT });
      }
    } catch (error) {
      toast.error(error.response.data.error[0].msg, { position: toast.POSITION.TOP_RIGHT });
    }
  }

  const onChanges = (e) => {
    if (e.target.name === 'Notice_attechments') {
      setUpdateNotice({ ...updateNotice, [e.target.name]: e.target.files[0] });
    } else {
      setUpdateNotice({ ...updateNotice, [e.target.name]: e.target.value });
    }
  }

  // ----------------------------------------------------------------Update Notices --------------------------------


  //----------------------------------------------------------------Delete Notices --------------------------------

  const deleteRest = (id) => {
    fetch(Api_keys.delete_notice + id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "authToken_admin": localStorage.getItem("AToken"),
      },
    }).then((result) => {
      result.json().then((resp) => {
        if (resp.success) {
          toast.success("Notice Deleted Successfully", { position: toast.POSITION.TOP_RIGHT });
          getNotice();
        }
        else {
          toast.error(resp.error, { position: toast.POSITION.TOP_RIGHT });
        }
        getNotice();
      })
    })
  }

  //----------------------------------------------------------------Delete Notices --------------------------------
  return (
    <>
      <ToastContainer />
      <div className="main-content">
        <Navbar visible={navVisible} show={showNavbar} />
        <div className="inner-main-content"  >
          <Topbar />
          <div className="container-fluid">
            <h4 className='main-name'>Notice Board</h4>
            {/* notice board - section */}
            <section>
              <div className='inner-send'>
                <form onSubmit={handleSubmit}>
                  {/* first-sec */}
                  <div className="first-part">
                    <p className='send'>Send Notification</p>
                    <div className="tb1">
                      <label className='amt' htmlFor="tname" name='tname'>Title</label><br />
                      <input className='linput' type="text" name='Notice_title' required id='Notice_title' value={noticeData.Notice_title} onChange={onChange1} />
                      <br />
                      <label className='amt' name='aname' style={{ marginTop: "30px" }}>Attachment</label><br />
                      <input type="file" accept="image/*, application/pdf, video/mp4" onChange={onChange1} required name="noticeFile" /><br />
                      <p className='only-accepts'>(Only Accepts Images, Videos and PDF)</p><br />
                      <label className='amt' htmlFor="Message">Message</label><br />
                      <textarea className='msg' type="text" name="Notice_description" required id="Notice_description" value={noticeData.Notice_description} onChange={onChange1} /><br /><br />
                      <button type='submit' className='s-btn' >SAVE</button>
                    </div>
                  </div>
                  {/* second-sec */}
                  <div className="second-part">
                    <p className='send'>Massage To</p>
                    <div className="tb2">
                      <div className='sright'>
                        <input className='chbtn' type="radio" id="1" required onChange={onChange1} name="Group" value="Student" />
                        <label className='chstudent' htmlFor="student" name='Group'>Student</label><br />
                      </div>
                      <div className='tright'>
                        <input className='chbtn' type="radio" id="2" required onChange={onChange1} name="Group" value="Teacher" />
                        <label className='chstudent' htmlFor="student" name='Group'>Teacher</label><br />
                      </div>
                      <div className='aright'>
                        <input className='chbtn' type="radio" id="3" required onChange={onChange1} name="Group" value="All" />
                        <label className='chstudent' htmlFor="student" name='Group'>All</label><br />
                      </div>
                    </div>
                  </div>
                </form>
              </div>
              <button className='hntc' onClick={antc}><Link className='view' >View all notice</Link></button>
            </section>
            {/* btn-link -section */}
            <section>
              <div className="view-all-ntc" style={{ display }}>
                <table className='tab-notice' style={{ marginBottom: "99px" }} >
                  <thead>
                    <tr className='tbl-tr'>
                      <th  >Title</th>
                      <th > <div className='des'>Description</div></th>
                      <th className='tbldate'>Date</th>
                      <th className='tblgroup' >Group</th>
                      <th>Attachment</th>
                      <th className='null-class'></th>
                    </tr>
                  </thead>
                  <tbody>
                    {notice && notice.map((a, i) => (
                      <tr className='abc' key={i}>
                        <td>{a.Notice_title}</td>
                        <td>{a.Notice_description}</td>
                        <td>{
                          a.Date.split('T')[0]
                        }</td>
                        <td>{a.Group}</td>
                        <td>
                          {
                            a.Notice_attechments.slice(-4).toLowerCase() === '.pdf' ?
                              <iframe src={`https://api.nutanpublic.naavhub.com/notices/${a.Notice_attechments}`} title={a.Notice_attechments} style={{ width: "100px" }} ></iframe>
                              :
                              a.Notice_attechments.slice(-4).toLowerCase() === '.mp4'
                                ?
                                <video autoplay="autoplay" src={`https://api.nutanpublic.naavhub.com/notices/${a.Notice_attechments}`} title={a.Notice_attechments} style={{ width: "100px" }} ></video>
                                :
                                <div className="himg"><img src={`https://api.nutanpublic.naavhub.com/notices/${a.Notice_attechments}`} style={{ width: "100px" }} alt={a.Notice_attechments} /></div>
                          }
                        </td>
                        <td className='dust'>
                          <BiEditAlt onClick={() => updateRestNotice(a)} /><br /><br />
                          <AiFillDelete onClick={() => deleteRest(a._id)} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>


              {/* <!-- Modal --> */}
              <button type="button" ref={ref} style={{ display: "none" }} className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#edit3">
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
                          <p className='send'>Send Notification</p>
                          <div className="tb1-update ">
                            <label className='amt' htmlFor="tname" name='tname'>Title</label><br />
                            <input className='linput' type="text" value={updateNotice.Notice_title} name='Notice_title' id='Notice_title' onChange={onChanges} />
                            <br />
                            <label className='amt' name='aname'>Attachment</label>
                            <input type="file" accept="image/*, application/pdf" onChange={onChanges} name='Notice_attechments' /><br />
                            <p className='only-accepts'>(Only Accepts Images and PDF)</p><br />
                            <label className='amt' htmlFor="">Message</label><br />
                            <textarea className='msg' type="text" name="Notice_description" value={updateNotice.Notice_description} id="Notice_description" onChange={onChanges} /><br /><br />
                          </div>
                        </div>
                        {/* second-sec */}
                        <div className="second-part-update">
                          <p className='send-update'>Massage To</p>
                          <div className="tb2-update">
                            <div className='sright'>
                              <input className='chbtn' type="radio" id="1" onChange={onChanges} checked={updateNotice.Group === 'Student'} name="Group" value="Student" />
                              <label className='chstudent' htmlFor="student" name='Group'>Student</label><br />
                            </div>
                            <div className='tright'>
                              <input className='chbtn' type="radio" id="2" onChange={onChanges} checked={updateNotice.Group === 'Teacher'} name="Group" value="Teacher" />
                              <label className='chstudent' htmlFor="student" name='Group'>Teacher</label><br />
                            </div>
                            <div className='aright'>
                              <input className='chbtn' type="radio" id="3" onChange={onChanges} checked={updateNotice.Group === 'All'} name="Group" value="All" />
                              <label className='chstudent' htmlFor="student" name='Group'>All</label><br />
                            </div>
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
            </section>
          </div>
        </div>
      </div>
    </>
  )
}

export default Notice