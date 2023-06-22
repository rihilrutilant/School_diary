import React from 'react'
import StudentAttendanceGraph from './StudentAttendanceGraph';

const Demo = () => {
  const data = [
    {
      present: [
        {
          Name: 'wxy',
          S_Icard_Id: 'SXYAB01A09',
        },
        {
          Name: 'Vaidik',
          S_Icard_Id: 'SXY10A02',
        },
        {
          Name: 'milan',
          S_Icard_Id: 'SXY01AMS',
        }
      ],
      absent: [
        {
          Name: 'Vaidik this me',
          S_Icard_Id: 'SXY10A01',
        },
        {
          Name: 'Vaidik',
          S_Icard_Id: 'SXY10A05',
        },
        {
          Name: 'milan',
          S_Icard_Id: 'SXY02AMS',
        },
        {
          Name: 'rihil',
          S_Icard_Id: 'SXY11AMS01',
        },
        {
          Name: 'Rihil P. S.',
          S_Icard_Id: 'SXYSR01A22',
        },
        {
          Name: 'rihil',
          S_Icard_Id: 'SXY11AMS',
        },
        {
          Name: 'milan',
          S_Icard_Id: 'SXY01AMS02',
        },
      ],
    },
  ];

  return (
    <div>
      <h1>Student Attendance</h1>
      <div style={{ width: '100px', height: '300px' }}>
        <StudentAttendanceGraph data={data[0]} />
      </div>
    </div>
  );
}

export default Demo