import React, { useEffect, useState } from 'react'
import "../Style/Login.css"
import logo from "../Images/blue-loogo.svg"
import { Navigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [credentials, setCredentials] = useState({ Password: "", Mobile_no: "" });

  const handleInputChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();
    const { Mobile_no, Password } = credentials;
    const response = await fetch("http://localhost:5050/api/admin/admin_login", {
      method: 'POST',
      body: JSON.stringify({ Mobile_no, Password }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const json = await response.json();
    if (json.authtoken) {
      localStorage.setItem('AToken', json.authtoken);
      toast.success("Login successfully", { position: toast.POSITION.TOP_RIGHT });
      const timer = setTimeout(() => {
        window.location.href = "/dashboard"
      }, 1000);
      return () => clearTimeout(timer);
    }
    else {
      toast.error("Please enter valid details", { position: toast.POSITION.TOP_RIGHT });
    }
  }

  return (
    <>
      {!localStorage.getItem("AToken")
        ?
        <>
          <ToastContainer autoClose={2000} />
          <div id="modal_overlay">
            <div className="cell">
              <div className="modal_main">
                <img src={logo} alt="logo" />
                <div className='login_modal'>
                  <h2>LOG IN</h2>
                  <form onSubmit={handleSubmit}>
                    <input type="text" name="Mobile_no" onChange={handleInputChange} placeholder="Username" />
                    <input type="password" name="Password" onChange={handleInputChange} placeholder="Password" />
                    <div className="loginbtn-part">
                      <button className="loginbtn lrBtn" type="submit">SUBMIT</button>
                    </div>
                    {/* {error && <div className='login_error'>{error}</div>} */}
                  </form>
                </div>
              </div>
            </div>
          </div>
        </>
        :
        <Navigate to="/dashboard" />
      }
    </>
  )
}

export default Login