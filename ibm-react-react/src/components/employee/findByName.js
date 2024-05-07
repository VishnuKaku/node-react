import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FindEmployee = () => {
  const [firstName, setFirstName] = useState('');
  const [employees, setEmployees] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:8090/emp/get-emp-by-name/${fname}`);
      setEmployees(response.data);
    } catch (error) {
      console.error(error);
      // Handle error
    }
  };

  return (
    <div>
      <h2>Find Employee By Name</h2>
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
      <button className="btn btn-primary" onClick={handleSearch}>
        Search
      </button>

      <div>
        <h3>Search Results:</h3>
        <table className="table">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Email</th>
              <th>Salary</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.id}>
                <td>{employee.firstName}</td>
                <td>{employee.email}</td>
                <td>{employee.salary}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FindEmployee;