import axios from "axios";
import React, { useState, useEffect } from "react";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [searchName, setSearchName] = useState('');

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get("http://localhost:8090/emp/get-all-emps");
        setEmployees(response.data);
      } catch (error) {
        console.error("Error fetching employees:", error);
        // Handle error
      }
    };
    fetchEmployees();
  }, []);

  const handleDelete = async (employeeId) => {
    try {
      if (!employeeId) {
        console.error("Invalid employee ID");
        return;
      }

      const confirmed = window.confirm("Are you sure you want to delete this employee?");
      if (!confirmed) {
        return;
      }

      await axios.delete(`http://localhost:8090/emp/delete-emp/${employeeId}`);

      setEmployees(employees.filter((employee) => employee.employeeId !== employeeId));
      console.log("Employee deleted successfully");

    } catch (error) {
      console.error("Error deleting employee:", error);
      // Handle error, e.g., display an error message to the user
    }

  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`http://localhost:8090/emp/get-emp-by-name/${searchName}`);
      setEmployees(response.data); // Update employee list with search results
    } catch (error) {
      console.error("Error searching employees:", error);
      // Handle error
    }
  };

  return (
    <div>
      <h2>Employee List</h2>

      {/* Search Form */}
      <form onSubmit={handleSearch}>
        <input 
          type="text" 
          placeholder="Search by First Name"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)} 
        />
        <button type="submit">Search</button>
      </form>

      {/* Employee Table */}
      <table className="table">
      <thead>
          <tr>
            <th>Employee ID</th>
            <th>First Name</th>
            <th>Email</th>
            <th>Salary</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.employeeId}>
              <td>{employee.employeeId}</td>
              <td>{employee.firstName}</td>
              <td>{employee.email}</td>
              <td>{employee.salary}</td>
              <td>
                <button className="btn btn-danger" onClick={() => handleDelete(employee.employeeId)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
};

export default EmployeeList;
