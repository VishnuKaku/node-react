import axios from "axios";
import React, { useState, useEffect } from "react";
export default function EmployeeList() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get("http://localhost:8090/emp/get-all-emps");
        setEmployees(response.data);
      } catch (error) {
        console.error(error);
        // Handle error
      }
    };
    fetchEmployees();
  }, []);


  return (
    
    <div>
    <h2>Employee List</h2>
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

  );
}