const database = require ('../../config/db');
const validator = require('validator');
// validator - have not learned

exports.saveCustomerInfo = async (req, res) => {
    try {
        const { Citizen_ID, Phone_No, Email, Customer_Name, Address } = req.body; // data from body -> send from FE 


       // issue: cho phep dien email, so dien thoai, dia chi (nhap theo format so nha, quan, tp, quoc gia)
        if (!Citizen_ID || !Phone_No || !Email || !Customer_Name || !Address) {
            return res.status(400).json({ error: 'Vui lòng điền đầy đủ thông tin.' });
        }
        if (!validator.isEmail(Email)) {
            return res.status(400).json({ error: 'Email không hợp lệ.' });
        }
        if (!validator.isMobilePhone(Phone_No, 'vi-VN')) { // Kiểm tra số điện thoại Việt Nam
            return res.status(400).json({ error: 'Số điện thoại không hợp lệ.' });
        }
        // Chèn thông tin khách hàng vào bảng dataCUSTOMER
        const result = await database.pool.query(
            'INSERT INTO dataCUSTOMER (Citizen_ID, Customer_Name, Phone_No, Email, Address) VALUES ($1, $2, $3, $4, $5) RETURNING Citizen_ID',
            [Citizen_ID, Customer_Name, Phone_No, Email, Address]
        );
       /*
        await pool.query('BEGIN'); // Kết thúc giao dịch nếu thành công??????

        await pool.query('COMMIT'); // Kết thúc giao dịch nếu thành công??????
        */
        
        
        const newCitizenID = result.rows[0].Citizen_ID; // Lấy Citizen_ID vừa được chèn
        console.log('Insert successfully');
        res.status(201).json({ Citizen_ID: newCitizenID });





    } catch (err) {
        
       // await pool.query('ROLLBACK'); // Hoàn tác giao dịch nếu có lỗi

    

        console.error('Error during signup:', err);
        res.status(500).json({ message: 'Server cannot connected.' });
    }
}