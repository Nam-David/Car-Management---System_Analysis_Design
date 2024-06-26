// HUMAN RESOURCE CONTROLLER
const pool = require('../../config/database');

const getEmployees = async (req, res) => {
    try {
        const { rows } = await pool.query('SELECT * FROM dataEMPLOYEE');
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while retrieving employee data.', error });
    }
};

const getEmployeeById = async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const { rows } = await pool.query('SELECT * FROM dataEMPLOYEE WHERE Employee_ID = $1', [id]);
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while retrieving the employee data.', error });
    }
};

const updateEmployee = async (req, res) => {
    const id = parseInt(req.params.id);
    const { Employee_CitizenID, Employee_Name, Employee_Birthday, Employee_Phone_No, Employee_Email, Employee_Address, Role_Title } = req.body;
    try {
        pool.query('UPDATE dataEMPLOYEE SET Employee_CitizenID = $1, Employee_Name = $2, Employee_Birthday = $3, Employee_Phone_No = $4, Employee_Email = $5, Employee_Address = $6, Role_Title = $7 WHERE Employee_ID = $8', [Employee_CitizenID, Employee_Name, Employee_Birthday, Employee_Phone_No, Employee_Email, Employee_Address, Role_Title, id]);
        res.status(200).json({ message: 'Employee updated successfully.' });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while updating the employee.', error });
    }
};

const deleteEmployee = async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        pool.query('DELETE FROM dataEMPLOYEE WHERE Employee_ID = $1', [id]);
        res.status(200).json({ message: 'Employee deleted successfully.' });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while deleting the employee.', error });
    }
};

module.exports = {
    getEmployees,
    getEmployeeById,
    updateEmployee,
    deleteEmployee
};