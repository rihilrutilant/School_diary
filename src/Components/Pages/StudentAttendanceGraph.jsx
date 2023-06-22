import React, { useEffect, useRef } from 'react';
import { Bar } from 'react-chartjs-2';

const StudentAttendanceGraph = ({ data }) => {
    // Extracting the number of present and absent students
    const presentCount = data.present.length;
    const absentCount = data.absent.length;

    // Creating the data for the bar graph
    const graphData = {
        labels: ['Present', 'Absent'],
        datasets: [
            {
                label: 'Number of Students',
                data: [presentCount, absentCount],
                backgroundColor: ['green', 'red'],
            },
        ],
    };

    // Bar graph options (you can customize these as per your needs)
    const graphOptions = {
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    stepSize: 1,
                },
            },
        },
    };

    return (
        <>
           
                <Bar data={graphData} options={graphOptions} />
      
        </>
    )
};

export default StudentAttendanceGraph;
