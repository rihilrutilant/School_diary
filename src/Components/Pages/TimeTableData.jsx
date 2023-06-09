import React, { useEffect, useState } from 'react'
import Navbar from './Navbar';
import Topbar from './Topbar';

const TimeTableData = () => {

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, []);

  const [navVisible, showNavbar] = useState(true);
  
  return (
    <div className="main-content">
      <Navbar visible={navVisible} show={showNavbar} />
      <div className="inner-main-content"  >
        <Topbar />
        <div className="container-fluid">
          <h4 className='main-name'>Time Table</h4>
          <div className='ganerate_id_part'>
            <div className='ganerateid_cnt'>
              <div className='ganerateid_cnt_inn'>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TimeTableData