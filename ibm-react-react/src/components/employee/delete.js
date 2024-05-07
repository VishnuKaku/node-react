import React, { useState } from 'react';
import axios from 'axios';

const DeleteEmployee = () => {
  const [firstName, setFirstName] = useState('');

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`http://localhost:8090/emp/delete-emp/${eid}`);
      console.log(response.data); // You can handle success response here
    } catch (error) {
      console.error(error);
      // Handle error
    }
  };

  return (
    <div>
      <h2>Delete Employee</h2>
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
      <button className="btn btn-danger" onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
};

export default DeleteEmployee;
