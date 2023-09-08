import Navbar from "../Pages/Navbar"
import Topbar from './Topbar';
import { ReactSession } from 'react-client-session';
import { Link } from 'react-router-dom';
import Delete from "../Images/delete.svg"
import React, { useEffect, useState, useRef, useCallback } from "react";
import "../Style/Class.css"
import Plus from "../Images/plus.svg"
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import apiConst from "../Api_keys"

const Class = () => {
  ReactSession.setStoreType("localStorage");
  const [navVisible, showNavbar] = useState(true);

  // ------------- fetch all classes ------------------------
  const [Classes, setClasses] = useState();

  const getClasses = useCallback(async () => {
    const response = await fetch(apiConst.fetch_all_standards,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "authToken_admin": localStorage.getItem("AToken")
        },
      });
    const json = await response.json();
    setClasses(json);
  }, []);
  // ------------- fetch all classes ------------------------

  //-------------- Create class ------------------------

  const closemodel = useRef();
  const [nextclasscode, setnextclasscode] = useState()

  const handleRetrieveValues = (Standard, classcode) => {
    let nextChar = "A"
    for (let index = 0; index < classcode.length; index++) {
      const element = classcode[index];
      nextChar = element.slice(-1);
    }
    const nextCharacter = String.fromCharCode(nextChar.charCodeAt(0) + 1);
    setnextclasscode(Standard + nextCharacter)
  };

  const CreateClasses = async (Classcode) => {
    const Standard = Classcode.substring(0, 2);
    const responseTeacher = await fetch(apiConst.create_class_code, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "authToken_admin": localStorage.getItem("AToken"),
      },
      body: JSON.stringify({ Standard, Classcode })
    });
    const json = await responseTeacher.json();
    if (json.success) {
      closemodel.current.click();
      getClasses()
      toast.success("Class Added Successfully", { position: toast.POSITION.TOP_RIGHT });
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

  //-------------- Create class ------------------------

  //------------- Delete Classes ------------------
  const deleteClass = async (id, Classcode) => {
    const responseTeacher = await fetch(apiConst.delete_class_code + id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "authToken_admin": localStorage.getItem("AToken"),
      },
      body: JSON.stringify({ Classcode })
    });
    const json = await responseTeacher.json();
    if (json.success) {
      getClasses()
      toast.success("Class deleted Successfully", { position: toast.POSITION.TOP_RIGHT });
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
  //------------- Delete Classes ------------------

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    getClasses()
  }, [getClasses]);

  return (
    <>
      <ToastContainer autoClose={2000} />
      <div className="main-content">
        <Navbar visible={navVisible} show={showNavbar} />
        <div className="inner-main-content">
          <Topbar />
          <div className="container-fluid">
            <h4 className="main-name">Class</h4>
            <div className='ganerateid_cnt class_id_gen'>
              <div className='ganerateid_cnt_inn'>
                <ul className="class_gen_div">
                  {
                    Classes && Classes.map((a, b) => (
                      <li className="class_stand" key={b}>{a.Standard}<Link to="#" data-bs-toggle="modal" data-bs-target="#myModal" onClick={() => handleRetrieveValues(a.Standard, a.ClassCode)} ><img src={Plus} alt="plus" /></Link>
                        <ul className="class_div_show">
                          {a.ClassCode.map((d, i) => (
                            <li value={d} key={i}>{d}<img className="deleteClass" src={Delete} onClick={() => deleteClass(a._id, d)} alt="delete" /></li>
                          ))}
                        </ul>
                      </li>
                    ))
                  }
                </ul>
              </div>
            </div>
            {/* -----------------Add classes model----------- */}
            <div className="modal" id="myModal">
              <div className="modal-dialog">
                <div className="modal-content class_divison_modal">
                  <button type="button" className="btn-close" data-bs-dismiss="modal" ref={closemodel}></button>
                  <h2>Add Division</h2>
                  <h4>New Class</h4>
                  <div>
                    <input className="Newclasscode" type="text" value={nextclasscode || ""} readOnly />
                  </div>
                  <div className="modelBtn">
                    <button type="button" className="createclassbtn" onClick={() => CreateClasses(nextclasscode)}>Save</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Class;