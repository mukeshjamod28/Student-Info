import { Button, Modal } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';

const InfoDialogBox = ({ show, handleClose, data, onSave }) => {
  const [editedData, setEditedData] = useState({
    Name: data?.Name,
    Gender: data?.Gender,
    Seat: data?.Seat
  });

  useEffect(() => {
    if (data) {
      setEditedData(data);
    }
  }, [data]);
  console.log("dialog", data)

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSave = () => {
    onSave(editedData); // Pass the updated data back to the parent component
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Student Information</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="form-group">
          <label>Name:</label>
          <input className="form-control" type="text" name="Name" value={editedData.Name} onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label>Gender:</label>
          <input className="form-control" type="number" name="Gender" value={editedData.Gender} onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label>Seat:</label>
          <input className="form-control" type="number"  name="Seat" value={editedData.Seat} onChange={handleInputChange} />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        {data && (
          <Button variant="primary" onClick={handleSave}>
            Save
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default InfoDialogBox;
