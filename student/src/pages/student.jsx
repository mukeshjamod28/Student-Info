import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import InfoDialogBox from './components/DialogBox';

const StudentInfo = () => {
  const [students, setStudents] = useState([]);
  const [showDialog, setShowDialog] = useState(false);
  const [selectedData, setSelectedData] = useState(null);

  const navigate = useNavigate();
 
console.log(selectedData,"select")
  const handleOpenDialog = (data) => {
    setSelectedData(data);
    setShowDialog(true);
  };

  const handleCloseDialog = () => {
    setShowDialog(false);
  };

  console.log(students, "info");

  useEffect(() => {
    const localStorageData = localStorage.getItem("students");
    if (localStorageData) {
      setStudents(JSON.parse(localStorageData));
    } else {
      fetch('/student.json')
        .then(response => response.json())
        .then(data => {
          const firstTenStudents = data.slice(0, 10);
          setStudents(firstTenStudents);
          localStorage.setItem("students", JSON.stringify(firstTenStudents));
        })
        .catch(error => console.error('Error loading student data:', error));
    }
  }, []);

  const handleDelete = (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this student?");
    console.log("id",id);
    if (confirmed) {
      const updatedStudents = students.filter(student => student.ID !== id);
      setStudents(updatedStudents);
      localStorage.setItem("students", JSON.stringify(updatedStudents));
    }
  };

  const handleEdit = (student) => {
    // localStorage.setItem(student); // Set the student to be edited
    handleOpenDialog(student); // Open the dialog box
  };

  const handleSave = (updatedData) => {
    const updatedStudents = students.map(student => {
      if (student.ID === updatedData.ID) {
        return { ...student, ...updatedData };
      }
      return student;
    });
    setStudents(updatedStudents);
    localStorage.setItem("students", JSON.stringify(updatedStudents));
    // handleClose();
  };

  const handleAddStudentData = () => {
    navigate('/addStudent');
  }

  return (
    <div className="container">
      <>
        <h1 className="heading">Student Info</h1>
        <button className="button" onClick={handleAddStudentData}>Add</button>
      </>
      <div>
        <table className="table table-hover table-dark">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Gender</th>
              <th>Seat</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {students.map(student => (
              <tr key={student.ID}>
                <td>{student.ID}</td>
                <td>{student.Name}</td>
                <td>{student.Gender}</td>
                <td>{student.Seat}</td>
                <td>
                  <button onClick={() => handleDelete(student.ID)}>Delete</button>
                  <button onClick={() => handleEdit(student)}>Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <InfoDialogBox show={showDialog} handleClose={handleCloseDialog} data={selectedData} onSave={handleSave} />
    </div>
  )
};

export default StudentInfo;
