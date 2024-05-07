import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchEmployeesStart,
  fetchEmployeesSuccess,
  fetchEmployeesFailure,
  searchEmployeeByNameStart,
  searchEmployeeByNameSuccess,
  searchEmployeeByNameFailure, 
  deleteEmployee
} from "../../redux/EmpSlice";
import EmployeeService from "../../services/EmployeeService";

const EmployeeList = () => {
  const dispatch = useDispatch();
  const employees = useSelector((state) => state.emp.employees);
  const loading = useSelector((state) => state.emp.loading);
  const error = useSelector((state) => state.emp.error);
  const [searchName, setSearchName] = React.useState('');

  useEffect(() => {
    const fetchEmployees = async () => {
      dispatch(fetchEmployeesStart());
      try {
        const response = await EmployeeService.viewAllEmployees();
        dispatch(fetchEmployeesSuccess(response.data));
      } catch (error) {
        console.error("Error fetching employees:", error);
        dispatch(fetchEmployeesFailure(error.message));
      }
    };
    fetchEmployees();
  }, [dispatch]);

  const handleDelete = async (employeeId) => {
    const confirmed = window.confirm("Are you sure you want to delete this employee?");
    if (confirmed) {
      dispatch(fetchEmployeesStart());
      try {
        await EmployeeService.deleteEmployee(employeeId);
        dispatch(deleteEmployee(employeeId));
        console.log("Employee deleted successfully");
      } catch (error) {
        console.error("Error deleting employee:", error);
        dispatch(fetchEmployeesFailure(error.message));
      }
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    dispatch(searchEmployeeByNameStart());
    try {
      const response = await EmployeeService.findEmployeeByName(searchName);
      dispatch(searchEmployeeByNameSuccess(response));
    } catch (error) {
      console.error("Error searching employees:", error);
      dispatch(searchEmployeeByNameFailure(error.message));
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

      {loading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}

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
