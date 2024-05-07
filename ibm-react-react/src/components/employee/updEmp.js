import React, { useState } from 'react';
import axios from 'axios';

const UpdateEmployee = () => {
  const [empId, setEmpId] = useState('');
  const [emp, setEmp] = useState({
    employeeId: '',
    firstName: '',
    email: '',
    salary: ''
  });
  const [updateStatus, setUpdateStatus] = useState('');

  const { employeeId, firstName, email, salary } = emp;

  const handleUpdate = async () => {
    if (!employeeId || !firstName || !email || !salary) {
      setUpdateStatus('Please fill in all fields.');
      return;
    }

    try {
      const response = await axios.put(`http://localhost:8090/emp/update-emp`, {
        employeeId,
        firstName,
        email,
        salary
      });
      console.log(response.data);
      setUpdateStatus('Employee updated successfully!');
    } catch (error) {
      console.error(error);
      setUpdateStatus('Failed to update employee.');
    }
  };

  const onInputChange = (e) => {
    setEmp({ ...emp, [e.target.name]: e.target.value });
  };

  const onIdChange = (e) => {
    setEmpId(e.target.value);
    setEmp({ ...emp, employeeId: e.target.value });
  };

  return (
    <div>
      <h2>Update Employee</h2>
      {updateStatus && <p>{updateStatus}</p>}
      <div className="mb-3">
        <label htmlFor="empId">Employee ID:</label>
        <input
          type="text"
          className="form-control"
          id="empId"
          value={empId}
          onChange={onIdChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="firstName">First Name:</label>
        <input
          type="text"
          className="form-control"
          id="firstName"
          name="firstName"
          value={firstName}
          onChange={onInputChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          className="form-control"
          id="email"
          name="email"
          value={email}
          onChange={onInputChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="salary">Salary:</label>
        <input
          type="number"
          className="form-control"
          id="salary"
          name="salary"
          value={salary}
          onChange={onInputChange}
        />
      </div>
      <button className="btn btn-primary" onClick={handleUpdate}>
        Update
      </button>
    </div>
  );
};

export default UpdateEmployee;
