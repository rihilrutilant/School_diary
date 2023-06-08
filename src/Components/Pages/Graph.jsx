import React, { useEffect, useState } from 'react'
import "../Style/Demo.css"
import { Bar } from 'react-chartjs-2';
import { CategoryScale } from 'chart.js';
import Chart from 'chart.js/auto';
import "../Style/Chart.css"
Chart.register(CategoryScale);

const Graph = () => {
  const [selectedValue, setSelectedValue] = useState('');

  const handleDropdownChange = (e) => {
    setSelectedValue({ ...selectedValue, [e.target.name]: e.target.value });
  };

  // console.log(selectedValue);

  // Generate random data for demonstration
  const generateData = () => {
    return Array.from({ length: 5 }, () => Math.floor(Math.random() * 20));
  };

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    getclasses();
  }, []);
  const data = {
    labels: ['10A', '10B', '10C', '10D', '10E'],
    datasets: [
      {
        label: 'Absent',
        backgroundColor: '#E10C0C',
        borderColor: '#E10C0C',
        borderWidth: 1,
        data: generateData(),
        outerWidth: "10px"
      },
      {
        label: 'Present',
        backgroundColor: '#038400',
        borderColor: '#038400',
        borderWidth: 1,
        data: generateData()
      },
    ],
  };

  // ---------------fetch all standards-------------------
  const [classes, setclasses] = useState()
  const getclasses = async () => {
    const response = await fetch("http://localhost:5050/api/classcode/get_all_classes", {
      method: "POST",
      headers: {
        "authToken_admin": localStorage.getItem("AToken")
      },
    });
    const json = await response.json();
    setclasses(json)
  };
  // ---------------fetch all standards-------------------

  return (
    <>
      <div className="select-side">
        <div className="inner-flex">
          <p>Attendance</p>
          <div className="sec-inner">
            <select defaultValue={"DEFAULT"} onChange={handleDropdownChange} className='drop'>
              <option value="DEFAULT" disabled>Select Option</option>
              {
                classes && classes.map((item, k) => {
                  return (
                    <option key={k} value={item.Standard}>Class {item.Standard}</option>
                  )
                })
              }
            </select>
          </div>
        </div>
        <Bar data={data} />
      </div>
    </>
  )
}

export default Graph