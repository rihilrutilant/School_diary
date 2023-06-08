import React from 'react'
import "../Style/Topbar.css"

const Topbar = () => {
    return (
        <div className="topbar">
            <div className="left-side">
                <input type="text" placeholder='Search...' />
                <button className='search'>
                    <img src={require("../Images/search.png")} alt=" " />
                </button>
            </div>
            <div className="display-flex">
                <img src={require("../Images/notification.png")} alt=" " className='noti' />
                <img src={require("../Images/admin.png")} alt=" " className='admin' />
                <div className="none">
                    <p className='rajanuj'>Nutan School</p>
                    <span className='principal'>Principal</span>
                </div>
            </div>
        </div >
    )
}

export default Topbar