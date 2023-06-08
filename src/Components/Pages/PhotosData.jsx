import React, { useEffect, useState } from 'react'
import { ReactSession } from 'react-client-session';
import Navbar from './Navbar';
import Topbar from './Topbar';
import "../Style/StudentData.css"

const PhotosData = () => {

    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }, []);

    ReactSession.setStoreType("localStorage");
    const Data = ReactSession.get("username");
    const Photos = ReactSession.get("photos");

    const [navVisible, showNavbar] = useState(true);

    return (
        <div className="main-content">
            <Navbar visible={navVisible} show={showNavbar} />
            <div className="inner-main-content"  >
                <Topbar />
                <div className="container-fluid">
                    <h4 className='main-name'>{Data}</h4>
                    <div className='ganerateid_cnt'>
                        <div className='ganerateid_cnt_inn'>
                            <div className='teacherid_check'>
                                <div className='photos_detail' style={{ display: "flex", gap: "50px" }}>
                                    {
                                        Photos && Photos.map((item, index) => (
                                            <div className="abc" key={index}>
                                                <div className='teacherid_img'>
                                                    {
                                                        item.slice(-4).toLowerCase() === '.mp4'
                                                            ?
                                                            <video autoPlay="autoplay" src={`http://localhost:5050/event_photos/${item}`} title={item.Event_Photos}></video>
                                                            :
                                                            <img src={`http://localhost:5050/event_photos/${item}`} alt={item.Event_Photos} />
                                                    }
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PhotosData