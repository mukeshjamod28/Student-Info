// import { AddStudentInfo } from "./pages/AddStudent";
import StudentInfo from "./pages/student";
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
// import AddStudentInfo from "./pages/AddStudent";
import AddStudent from "./pages/AddStudent";
function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<StudentInfo />} />
        <Route path="addStudent" element={<AddStudent/>} />
      </Routes>
    </Router>
  );
}

export default App;
