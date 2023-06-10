import React, { useCallback, useEffect, useState } from 'react'
import apiConst from "../Api_keys"
import { ReactSession } from 'react-client-session';


const Demo = () => {

  ReactSession.setStoreType("localStorage");
  const Data = ReactSession.get("username");

  //-------TimeTable Data--------/
  const [timetableData, setTimetableData] = useState({
    Class_code: "",
  });


  const getTimetable = useCallback(async () => {
    const Class_code = Data

    const response = await fetch(apiConst.fetch_all_timetable_by_classes,
      {
        method: "POST",
        body: JSON.stringify({
          Class_code
        }),
        headers: {
          "Content-Type": "application/json",
          "authToken_admin": localStorage.getItem("AToken")
        },
      });

    const json = await response.json();
    setTimetableData(json);
  }, []);

  console.log(timetableData);

  const fridayTimeTable = timetableData.Daily_TimeTable && timetableData.Daily_TimeTable.length > 0 ? timetableData.Daily_TimeTable[0].Friday : {};
  const fridaySubjectCodes = Object.values(fridayTimeTable).map(item => item.Subject_Code);

  useEffect(() => {
    getTimetable();
  }, [getTimetable])


  //-------TimeTable Data ----------//

  return (
    <div className="">
      <span className='data-onlydata'>{timetableData.Class_code}</span>
      <select className="select-any-options" name='subject' required id='subject' defaultValue={"DEFAULT"}>
        <option value="DEFAULT" disabled>Select Subject</option>
        {fridaySubjectCodes.map((subjectCode, index) => (
          <option key={index} value={subjectCode}>{subjectCode}</option>
        ))}
      </select>
    </div>
  )
}

export default Demo