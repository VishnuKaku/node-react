
// EmployeeService.js

import axios from 'axios';

const BASE_URL = 'http://localhost:8090'; // express api

const EmployeeService = {

    viewAllEmployees: async () => {
        try {
            const response = await axios.get(`${BASE_URL}/emp/get-all-emps`);
            console.log(response);
            return response;
        }
        catch (error) {
            console.log(error);
            throw new Error(error);
        }

        // code 
    },

    findEmployeeByName: async (name) => {
        try {
            const response = await axios.get(`${BASE_URL}/emp/get-emp-by-name/${name}`);
            console.log(response);
            return response.data;
        } catch (error) {
            console.log(error);
            throw new Error(error);
        }
    },

    addEmployee: async (employeeData) => {
        try {
            const response = await axios.post(`${BASE_URL}/emp/add-emp`, employeeData);
            console.log(response);
            return response.data;
        } catch (error) {
            console.log(error);
            throw new Error(error);
        }
    },

    updateEmployee: async (employeeData) => {
        try {
            const response = await axios.post(`${BASE_URL}/emp/update-emp`, employeeData);
            console.log(response);
            return response.data;
        } catch (error) {
            console.log(error);
            throw new Error(error);
        }
    },

    deleteEmployee: async (employeeId) => {
        try {
            const response = await axios.delete(`${BASE_URL}/emp/delete-emp/${employeeId}`);
            console.log(response);
            return response.data; // or response.status for status code
        } catch (error) {
            console.log(error);
            throw new Error(error);
        }
    }
};
export default EmployeeService;

