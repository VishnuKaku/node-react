import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    empObj: { firstName: 'Sonu', salary: 10.50 }, // Existing initial state
    employees: [], // New state for employee list
    loading: false, // New state for loading status
    error: null, // New state for error message
};

const empSlice = createSlice({
    name: 'emp',
    initialState,
    reducers: {
        setEmpObj: (state, action) => {
            console.log(action.payload);
            state.empObj = action.payload;
        },
        // Add the new reducers here:
        fetchEmployeesStart(state) {
            state.loading = true;
            state.error = null;
        },
        fetchEmployeesSuccess(state, action) {
            state.employees = action.payload;
            state.loading = false;
            state.error = null;
        },
        fetchEmployeesFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        searchEmployeeByNameStart(state) {
            state.loading = true;
            state.error = null;
        },
        searchEmployeeByNameSuccess(state, action) {
            state.employees = action.payload;
            state.loading = false;
            state.error = null;
        },
        searchEmployeeByNameFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        addEmployee(state, action) {
            state.employees.push(action.payload);
        },
        updateEmployeeSuccess(state, action) {
            const index = state.employees.findIndex(emp => emp.employeeId === action.payload.employeeId);
            if (index !== -1) {
                state.employees[index] = action.payload;
            }
            state.loading = false;
            state.error = null;
        },

        // Reducer for handling employee update failure
        updateEmployeeFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        deleteEmployee(state, action) {
            state.employees = state.employees.filter(emp => emp.employeeId !== action.payload);
        },
    },
});

export default empSlice.reducer;
export const { 
    setEmpObj, 
    fetchEmployeesStart,
    fetchEmployeesSuccess,
    fetchEmployeesFailure,
    searchEmployeeByNameStart,
    searchEmployeeByNameSuccess,
    searchEmployeeByNameFailure, 
    addEmployee, 
    updateEmployeeSuccess,
    updateEmployeeFailure,
    deleteEmployee 
} = empSlice.actions; 

// const empSlice = createSlice({
//     name: 'empObj',
//     initialState : '',
//     reducers : {
        
//     }
// });




// import { createSlice } from "@reduxjs/toolkit";
// import Employee from "../components/Employee";

// const EmpSlice = createSlice({
//     name: 'em',
//     initialState: '',
//     reducers : {
//         abc: (state, action) => {
//             state.em = action.payload;
//         }
//     },
// });

// // export default 
// export const {abc}  = EmpSlice.actions;
// export default EmpSlice.reducer;

// // const EmpReducer = createReducer(
// //     {
        
// //     }

// //     );