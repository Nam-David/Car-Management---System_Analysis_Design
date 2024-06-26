const database = require('../../config/db'); 
exports.HumanRMcreate = async (req, res) => {
    const { 
        Employee_CitizenID, Employee_Name, Employee_Birthday, 
        Employee_Phone_No, Employee_Email, Employee_Address, Role_Title 
    } = req.body;

    // Input từ trường dữ liệu FE
    if (!Employee_CitizenID || !Employee_Name || !Employee_Birthday) {
        return res.status(400).json({ error: 'Dữ liệu không trùng khớp!' });
    }

    try {
        
        const pool = database.pool; 

        // PostgreSQL 
        const sql = `
            INSERT INTO dataEMPLOYEE (
                Employee_CitizenID, Employee_Name, Employee_Birthday, Employee_Phone_No, 
                Employee_Email, Employee_Address, Role_Title
            ) VALUES ($1, $2, $3, $4, $5, $6, $7)
        `;

        const values = [
            Employee_CitizenID, Employee_Name, Employee_Birthday, Employee_Phone_No,
            Employee_Email, Employee_Address, Role_Title
        ];

        await pool.query(sql, values); 
        res.status(201).json({ message: 'Đã thêm nhân viên thành công!' });

    } catch (err) {
        console.error(err);
        if (err.code === '23505') { 
            res.status(409).json({ error: 'Nhân viên với mã nhân viên hoặc Email hoặc số điện thoại đã tồn tại trên hệ thống!' });
        } else {
            res.status(500).json({ error: 'Database error' }); 
        }
    }
};
