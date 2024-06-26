import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addEmployee } from "../../redux/EmpSlice";
import EmployeeService from "../../services/EmployeeService"; 

export default function AddEmployee() {
    const dispatch = useDispatch();
    let navigate = useNavigate();
    const [emp, setEmp] = useState({
        firstName: "",
        email: "",
        salary: "",
    });

    const { firstName, email, salary } = emp;

    const onInputChange = (e) => {
        setEmp({ ...emp, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await EmployeeService.addEmployee(emp); // Using EmployeeService
            dispatch(addEmployee(response));
            navigate("/");
        } catch (error) {
            console.error("Error adding employee:", error);
            // Handle error
        }
    };

    return (
        
      <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">AddEmp</h2>

          <form onSubmit={(e) => onSubmit(e)}>
            <div className="mb-3">
              <label htmlFor="firstName" className="form-label">
                First Name
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter your first name"
                name="firstName"
                value={firstName}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type={"email"} 
                className="form-control"
                placeholder="Enter your email address"
                name="email"
                value={email}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="salary" className="form-label">
                Salary
              </label>
              <input
                type={"number"} 
                className="form-control"
                placeholder="Enter your salary"
                name="salary"
                value={salary}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <button type="submit" className="btn btn-outline-primary">
              Submit
            </button>
            <Link className="btn btn-outline-danger mx-2" to="/">
              Cancel
            </Link>
          </form>
        </div>
      </div>
    </div>
        
    );
}







// import axios from "axios";
// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";

// export default function AddEmployee() {
//   let navigate = useNavigate();

//   const [emp, setEmp] = useState({
//     firstName: "",
//     email: "",
//     salary: "",
//   });

//   const { firstName, email, salary } = emp;

//   const onInputChange = (e) => {
//     setEmp({ ...emp, [e.target.name]: e.target.value });
//   };

//   const onSubmit = async (e) => {
//     e.preventDefault();
//     await axios.post("http://localhost:8090/emp/add-emp", emp); 
//     navigate("/");
//   };

//   return (
//     <div className="container">
//       <div className="row">
//         <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
//           <h2 className="text-center m-4">AddEmp</h2>

//           <form onSubmit={(e) => onSubmit(e)}>
//             <div className="mb-3">
//               <label htmlFor="firstName" className="form-label">
//                 First Name
//               </label>
//               <input
//                 type={"text"}
//                 className="form-control"
//                 placeholder="Enter your first name"
//                 name="firstName"
//                 value={firstName}
//                 onChange={(e) => onInputChange(e)}
//               />
//             </div>
//             <div className="mb-3">
//               <label htmlFor="email" className="form-label">
//                 Email
//               </label>
//               <input
//                 type={"email"} 
//                 className="form-control"
//                 placeholder="Enter your email address"
//                 name="email"
//                 value={email}
//                 onChange={(e) => onInputChange(e)}
//               />
//             </div>
//             <div className="mb-3">
//               <label htmlFor="salary" className="form-label">
//                 Salary
//               </label>
//               <input
//                 type={"number"} 
//                 className="form-control"
//                 placeholder="Enter your salary"
//                 name="salary"
//                 value={salary}
//                 onChange={(e) => onInputChange(e)}
//               />
//             </div>
//             <button type="submit" className="btn btn-outline-primary">
//               Submit
//             </button>
//             <Link className="btn btn-outline-danger mx-2" to="/">
//               Cancel
//             </Link>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }