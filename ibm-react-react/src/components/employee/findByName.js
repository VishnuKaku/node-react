// import React, { useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { fetchEmployeesStart, fetchEmployeesSuccess, fetchEmployeesFailure } from '../../redux/EmpSlice';
// import EmployeeService from '../../services/EmployeeService';

// const FindEmployee = () => {
//   const [firstName, setFirstName] = useState('');
//   const dispatch = useDispatch();
//   const employees = useSelector((state) => state.emp.employees);
//   const loading = useSelector((state) => state.emp.loading);
//   const error = useSelector((state) => state.emp.error);

//   const handleSearch = async () => {
//     if (!firstName.trim()) {
//       console.error('Please enter a first name to search.');
//       return;
//     }
//     dispatch(fetchEmployeesStart());
//     try {
//       const response = await EmployeeService.findEmployeeByName(firstName);
//       dispatch(fetchEmployeesSuccess(response));
//     } catch (error) {
//       console.error('Error fetching employees by name:', error);
//       dispatch(fetchEmployeesFailure(error.message));
//     }
//   };

//   return (
//     <div>
//       <h2>Find Employee By Name</h2>
//       <div className="mb-3">
//         <label htmlFor="firstName">First Name:</label>
//         <input
//           type="text"
//           className="form-control"
//           id="firstName"
//           value={firstName}
//           onChange={(e) => setFirstName(e.target.value)}
//         />
//       </div>
//       <button className="btn btn-primary" onClick={handleSearch}>
//         Search
//       </button>

//       {loading && <div>Loading...</div>}
//       {error && <div>Error: {error}</div>}

//       <div>
//         <h3>Search Results:</h3>
//         <table className="table">
//           <thead>
//             <tr>
//               <th>First Name</th>
//               <th>Email</th>
//               <th>Salary</th>
//             </tr>
//           </thead>
//           <tbody>
//             {employees.map((employee) => (
//               <tr key={employee.employeeId}>
//                 <td>{employee.firstName}</td>
//                 <td>{employee.email}</td>
//                 <td>{employee.salary}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default FindEmployee;
