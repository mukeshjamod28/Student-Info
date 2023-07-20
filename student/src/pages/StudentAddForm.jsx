import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup  from 'yup';
import './AddStudent.css'
import { yupResolver } from "@hookform/resolvers/yup";

const StudentAddForm = () => {
  const validationSchema = yup.object().shape({
    Name: yup.string().required('Name is required'),
    Gender: yup.string().required('Gender is required').typeError('Gender must be a number'),
    Seat: yup.string().required('Seat is required').typeError('Seat must be a number'),
  });

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      Name: '',
      Gender: '',
      Seat: '',
    },
  });

  const onSubmit = (data) => {
    const existingData = JSON.parse(localStorage.getItem("students")) || [];
    const newData = { ...data, ID: (existingData.length + 1).toString() }; // Add a new ID to the data
    const updatedData = [...existingData, newData];
    localStorage.setItem("students", JSON.stringify(updatedData)); // Store updated data in localStorage
    reset(); // Reset the form after successful submission
  };
  

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="student-form">
      <div className="form-group">
        <label htmlFor="Name">Name:</label>
        <input type="text" name="Name" id="Name" {...register('Name')} />
        {errors.Name && <p className="error">{errors.Name.message}</p>}
      </div>
      <div className="form-group">
        <label htmlFor="Gender">Gender:</label>
        <input type="text" name="Gender" id="Gender" {...register('Gender')} />
        {errors.Gender && <p className="error">{errors.Gender.message}</p>}
      </div>
      <div className="form-group">
        <label htmlFor="Seat">Seat:</label>
        <input type="text" name="Seat" id="Seat" {...register('Seat')} />
        {errors.Seat && <p className="error">{errors.Seat.message}</p>}
      </div>
      <button type="submit" className="btn btn-primary">Add Student</button>
    </form>
  );
};

export default StudentAddForm;
