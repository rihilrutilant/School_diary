import React, { useEffect, useState } from "react";
import "../Style/Fees.css";
import Navbar from "../Pages/Navbar";
import Topbar from "./Topbar";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Edit from "../Images/edit.svg"
import apiConst from "../Api_keys";

const Fees = () => {
  const [navVisible, showNavbar] = useState(true);
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    getclasses();
  }, []);

  const [error, setError] = useState("");

  const [FeesField1, setFeesField1] = useState('');
  const [FeesField3, setFeesField3] = useState('');
  const [FeesField4, setFeesField4] = useState('');


  const handleFeeSubmit = (e) => {
    e.preventDefault();
    if (FeesField1 && FeesField3 && FeesField4) {
      window.location.href = "/dashboard";
    }
    else {
      setError("Please fill all fields");
    }
  };


  //----------------fetch all fees of all standards----------------------

  const [getFees, setgetFees] = useState()

  const getAllFees = async () => {
    const response = await fetch(apiConst.get_fees_of_all_standards, {
      method: "POST",
      headers: {
        "authToken_admin": localStorage.getItem("AToken")
      },
    });
    const json = await response.json();
    setgetFees(json)
  };
  //----------------fetch all fees of all standards----------------------


  //---------------Update Fees----------------------------------------

  const handleEdit = async (id) => {
    const Fees_Amount = prompt('Enter new number:');
    const response = await fetch(apiConst.edit_fees_of_standard + id, {
      method: "PATCH",
      body: JSON.stringify({ Fees_Amount }),
      headers: {
        "Content-Type": "application/json",
        "authToken_admin": localStorage.getItem("AToken")
      }
    });
    const json = await response.json();
    if (json.success) {
      getAllFees();
      toast.success("Fees Updated Successfully", { position: toast.POSITION.TOP_RIGHT });
    }
    else {
      if (!json.error[0].msg) {
        toast.error(json.error, { position: toast.POSITION.TOP_RIGHT });
      }
      else {
        toast.error(json.error[0].msg, { position: toast.POSITION.TOP_RIGHT });
      }
    }
  };
  //---------------Update Fees----------------------------------------


  // -----------------------Fetch all Standards ---------------------
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
  // -----------------------Fetch all Standards ---------------------

  //-----------------------Fetch all Classcode standard wise-------------------------
  const [classCode, setclassCode] = useState()
  const getclasscodes = async (e) => {
    const Standard = e.target.value
    const response = await fetch(apiConst.get_all_classes_std_wise, {
      method: "POST",
      body: JSON.stringify({ Standard }),
      headers: {
        "Content-Type": "application/json",
        "authToken_admin": localStorage.getItem("AToken")
      },
    });
    const json = await response.json();
    setclassCode(json)
  };
  //-----------------------Fetch all Classcode standard wise-------------------------

  return (
    <>
      <ToastContainer />
      <div className="main-content">
        <Navbar visible={navVisible} show={showNavbar} />
        <div className="inner-main-content">
          <Topbar />
          <div className="container-fluid">
            <h4 className="main-name">Fees</h4>
            <div className="fees_status">
              <select defaultValue={"DEFAULT"} name="fees" id="fees">
                <option value="DEFAULT" disabled>Select Status</option>
                <option value="paid">Piad</option>
                <option value="unpaid">Unpaid</option>
              </select>
            </div>
            <div className='exam_cnt'>
              <div className='exam_info'>
                <form onSubmit={handleFeeSubmit}>
                  <div className='exam_info_select'>
                    <div className="custom-dropdown">
                      <select defaultValue={"DEFAULT"} onChange={(e) => setFeesField1(e.target.value)}>
                        <option value="DEFAULT" disabled>Fees Type</option>
                        <option value="First term">First term</option>
                        <option value="Second term">Second term</option>
                      </select>
                    </div>
                    <div className="custom-dropdown">
                      <select defaultValue={"DEFAULT"} onChange={getclasscodes}>
                        <option value="DEFAULT" disabled>Select Class</option>
                        {
                          classes && classes.map((item, k) => {
                            return (
                              <option key={k} value={item.Standard}>std {item.Standard}</option>
                            )
                          })
                        }
                      </select>
                    </div>
                    <div className="custom-dropdown">
                      <select defaultValue={"DEFAULT"} onChange={(e) => setFeesField3(e.target.value)}>
                        <option value="DEFAULT">Select Division</option>
                        {
                          classCode && classCode.map((item, k) => {
                            return (
                              <option key={k} value={item}>{item}</option>
                            )
                          })
                        }
                      </select>
                    </div>
                    <div className="custom-dropdown">
                      <select defaultValue={"DEFAULT"} onChange={(e) => setFeesField4(e.target.value)}>
                        <option value="DEFAULT" disabled>Year</option>
                        <option value="100">100</option>
                        <option value="50">50</option>
                        <option value="30">30</option>
                      </select>
                    </div>
                  </div>
                  <div className="submit_part">
                    <button className="submit_btn" type="submit">SUBMIT</button>
                  </div>
                </form>
                {error && <div className='login_error'>{error}</div>}
              </div>
            </div>
            <div className="fees_show">
              <button className="fees_show_btn" onClick={getAllFees} data-bs-toggle="modal" data-bs-target="#FeesBackdrop">FEES</button>
              <button className="add_fees_btn"> Add Fees</button>
            </div>

            <div className="modal" id="FeesBackdrop">
              <div className="modal-dialog">
                <div className="modal-content fees_modal">
                  <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                  <ul>
                    {
                      getFees && getFees.map((item, index) => (
                        <li key={index}>
                          <h3>STD {item.Standard}</h3>
                          <div className='fees_amt'>
                            <h4>{item.Fees_Amount}</h4>
                            <button onClick={() => handleEdit(item._id)}> <img src={Edit} alt="edit" /> </button>
                          </div>
                        </li>
                      ))
                    }
                  </ul >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Fees;
