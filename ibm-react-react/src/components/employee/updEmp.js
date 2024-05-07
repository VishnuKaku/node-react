import React, { useState } from 'react';
import axios from 'axios';

const UpdateEmployee = () => {
  const [firstName, setFirstName] = useState('');
  const [newSalary, setNewSalary] = useState('');
  const [email, setEmail] = useState('');

  const handleUpdate = async () => {
    try {
      const response = await axios.put("http://localhost:8090/emp/update-emp", { salary: newSalary, email: email });
      console.log(response.data); // You can handle success response here
    } catch (error) {
      console.error(error);
      // Handle error
    }
  };

  return (
    <div>
      <h2>Update Employee</h2>
      <div className="mb-3">
        <label htmlFor="firstName">First Name:</label>
        <input
          type="text"
          className="form-control"
          id="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="newSalary">New Salary:</label>
        <input
          type="number"
          className="form-control"
          id="newSalary"
          value={newSalary}
          onChange={(e) => setNewSalary(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          className="form-control"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <button className="btn btn-primary" onClick={handleUpdate}>
        Update
      </button>
    </div>
  );
};

export default UpdateEmployee;
