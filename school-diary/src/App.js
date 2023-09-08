import { BrowserRouter, Routes, Route } from "react-router-dom";
import Demo from "./Components/Pages/Demo";
import Demoo from "./Components/Pages/Demoo";
import Login from "./Components/Pages/Login";
import Subject from "./Components/Pages/Subject";
import Complain from "./Components/Pages/Complain";
import Exam from "./Components/Pages/Exam";
import Fees from "./Components/Pages/Fees";
import Holiday from "./Components/Pages/Holiday";
import Id from "./Components/Pages/Id";
import Notice from "./Components/Pages/Notice";
import Result from "./Components/Pages/Result";
import Time from "./Components/Pages/Time";
import Events from "./Components/Pages/Events";
import Dashboard from "./Components/Pages/Dashboard";
import StudentData from "./Components/Pages/StudentData";
import PageNotFound from "./Components/Pages/PageNotFound";
import Class from "./Components/Pages/Class";
import EventsPhoto from "./Components/Pages/EventsPhoto";
import PhotosData from "./Components/Pages/PhotosData";
import TimeTableData from "./Components/Pages/TimeTableData";
import ResultData from "./Components/Pages/ResultData";
import SubjectData from "./Components/Pages/SubjectData";
import ExamData from "./Components/Pages/ExamData";
import Attendence from "./Components/Pages/Attendence";

function App() {
  const userData = localStorage.getItem("AToken");

  return (
    <BrowserRouter>
      <Routes>
        {!userData ? (
          <Route path="/" element={<Login />} />
        ) : (
          <>
            <Route path="/" element={<Login />} />
            <Route path="/Class" element={<Class />} />
            <Route path="/Complain" element={<Complain />} />
            <Route path="/Dashboard" element={<Dashboard />} />
            <Route path="/Events" element={<Events />} />
            <Route path="/Exam" element={<Exam />} />
            <Route path="/Fees" element={<Fees />} />
            <Route path="/Holiday" element={<Holiday />} />
            <Route path="/Id" element={<Id />} />
            <Route path="/Notice" element={<Notice />} />
            <Route path="/Result" element={<Result />} />
            <Route path="/Time" element={<Time />} />
            <Route path="/StudentData" element={<StudentData />} />
            <Route path="/Subject" element={<Subject />} />
            <Route path="/Class" element={<Class />} />
            <Route path="/EventsPhoto" element={<EventsPhoto />} />
            <Route path="/PhotosData" element={<PhotosData />} />
            <Route path="/TimeTableData" element={<TimeTableData />} />
            <Route path="/ResultData" element={<ResultData />} />
            <Route path="/SubjectData" element={<SubjectData />} />
            <Route path="/ExamData" element={<ExamData />} />
            <Route path="/Attendence" element={<Attendence />} />

            <Route path="/demoo" element={<Demoo />} />
            <Route path="Demo" element={<Demo />} />
          </>
        )}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
