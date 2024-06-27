const database = require('../../config/db'); 
exports.HumanRMcreate = async (req, res) => {
    const { 
        Employee_CitizenID, Employee_Name, Employee_Birthday, 
        Employee_Phone_No, Employee_Email, Employee_Address, Role_Title 
    } = req.body;

    try {
        // if (!Employee_CitizenID) {
        //     return res.status(400).json({ error: 'Dữ liệu không trùng khớp!' });
        // }
        const result = await database.pool.query({

            text: `
            INSERT INTO dataEMPLOYEE (
                Employee_CitizenID, Employee_Name, Employee_Birthday, Employee_Phone_No, 
                Employee_Email, Employee_Address, Role_Title
            ) VALUES ($1, $2, $3, $4, $5, $6, $7)`,
            
            values: [
                Employee_CitizenID, Employee_Name, Employee_Birthday, Employee_Phone_No,
                Employee_Email, Employee_Address, Role_Title
            ]
        });
        
        

        //await pool.query(sql, values); 
        res.status(201).json({ message: 'Đã thêm nhân viên thành công!' });

    } catch (err) {
        console.error(err);
       
            res.status(500).json({ error: 'Database error' }); 
    }
};

// HUMAN RESOURCE CONTROLLER

exports.getEmployees = async (req, res) => {
    try {
        const { rows } = await database.pool.query('SELECT * FROM dataEMPLOYEE');
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while retrieving employee data.', error });
    }
};

exports.getEmployeeById = async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const { rows } = await database.pool.query('SELECT * FROM dataEMPLOYEE WHERE Employee_ID = $1', [id]);
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while retrieving the employee data.', error });
    }
};

exports.updateEmployee = async (req, res) => {
    const id = parseInt(req.params.id);
    const { Employee_CitizenID, Employee_Name, Employee_Birthday, Employee_Phone_No, Employee_Email, Employee_Address, Role_Title } = req.body;
    try {
        database.pool.query('UPDATE dataEMPLOYEE SET Employee_CitizenID = $1, Employee_Name = $2, Employee_Birthday = $3, Employee_Phone_No = $4, Employee_Email = $5, Employee_Address = $6, Role_Title = $7 WHERE Employee_CitizenID = $8', [Employee_CitizenID, Employee_Name, Employee_Birthday, Employee_Phone_No, Employee_Email, Employee_Address, Role_Title, id]);
        res.status(200).json({ message: 'Employee updated successfully.' });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while updating the employee.', error });
    }
};

exports.deleteEmployee = async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        database.pool.query('DELETE FROM dataEMPLOYEE WHERE Employee_CitizenID = $1', [id]);
        res.status(200).json({ message: 'Employee deleted successfully.' });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while deleting the employee.', error });
    }
};



