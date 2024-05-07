import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { updateEmployeeSuccess, updateEmployeeFailure } from "../../redux/EmpSlice";
import EmployeeService from "../../services/EmployeeService";

const UpdateEmployee = () => {
    const dispatch = useDispatch();
    const employees = useSelector((state) => state.emp.employees);

    // Initialize emp state with employeeId to ensure it's always in sync with empId
    const [empId, setEmpId] = useState('');
    const [emp, setEmp] = useState({
        employeeId: empId, // Sync with empId
        firstName: '',
        email: '',
        salary: ''
    });
    const [updateStatus, setUpdateStatus] = useState('');
    const { employeeId, firstName, email, salary } = emp;

    useEffect(() => {
      if (empId) {
          const employeeToUpdate = employees.find(emp => emp.employeeId === empId);
          if (employeeToUpdate) {
              setEmp(employeeToUpdate);
              setUpdateStatus('');
          } else {
              setEmp({ employeeId: empId, firstName: '', email: '', salary: '' }); // Keep employeeId in sync
              setUpdateStatus('Employee not found.');
          }
      }
  }, [empId, employees]);

    const handleUpdate = async () => {
        if (!employeeId || !firstName || !email || !salary) {
            setUpdateStatus('Please fill in all fields.');
            return;
        }

        try {
            const updatedEmployee = await EmployeeService.updateEmployee({
                employeeId,
                firstName,
                email,
                salary
            });
            dispatch(updateEmployeeSuccess(updatedEmployee));
            setUpdateStatus('Employee updated successfully!');
        } catch (error) {
            console.error(error);
            dispatch(updateEmployeeFailure(error.message));
            setUpdateStatus('Failed to update employee.');
        }
    };

    const onInputChange = (e) => {
        setEmp({ ...emp, [e.target.name]: e.target.value });
    };

    // Update both empId and employeeId in emp state to keep them in sync
    const onIdChange = (e) => {
        const newEmpId = e.target.value;
        setEmpId(newEmpId);
        setEmp(prevEmp => ({ ...prevEmp, employeeId: newEmpId }));
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







