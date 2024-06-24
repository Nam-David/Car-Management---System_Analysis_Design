const database = require('../../config/db');
const validator = require('validator');
const { v4: uuidv4 } = require('uuid');

exports.saveCustomerInfo = async (req, res) => {
    const client = await database.pool.connect();

    try {
        await client.query('BEGIN');
        const { Citizen_ID, Phone_No, Email, Customer_Name, Address, Model_Car_ID, Transaction_Date, Payment_Date, Warranty_Valid_Date, Status_Of_Purchasing } = req.body;

        // ... (Phần kiểm tra dữ liệu đầu vào)

        // Kiểm tra xem Citizen_ID đã tồn tại chưa
        const existingCustomerResult = await client.query(
            'SELECT * FROM dataCUSTOMER WHERE Citizen_ID = $1', [Citizen_ID]
        );
        const existingCustomer = existingCustomerResult.rows[0]; // Lấy ra thông tin khách hàng nếu tồn tại

        if (existingCustomer) {
            // Nếu Citizen_ID đã tồn tại, cập nhật số lượng giao dịch và thông tin khác (nếu cần)
            await client.query(
                'UPDATE dataCUSTOMER SET Number_Transaction = Number_Transaction + 1 WHERE Citizen_ID = $1', [Citizen_ID]
            );
        } else {
            // Nếu Citizen_ID chưa tồn tại, thêm khách hàng mới với Number_Transaction = 1
            await client.query(
                'INSERT INTO dataCUSTOMER (Citizen_ID, Customer_Name, Phone_No, Email, Address, Number_Transaction) VALUES ($1, $2, $3, $4, $5, 1)',
                [Citizen_ID, Customer_Name, Phone_No, Email, Address]
            );
        }

        // Tạo giao dịch mới với nextval trong truy vấn SQL
        const transactionResult = await client.query(
            'INSERT INTO dataTRANSACTION (Transaction_ID, Citizen_ID, Model_Car_ID, Transaction_Date, Payment_Date, Warranty_Valid_Date, Status_Of_Purchasing) VALUES (nextval(\'transaction_id_seq\'), $1, $2, $3, $4, $5, $6) RETURNING Transaction_ID',
            [Citizen_ID, Model_Car_ID, Transaction_Date, Payment_Date, Warranty_Valid_Date, Status_Of_Purchasing]
        );

        // ... (Phần thêm data vào bảng dataACCOUTING)

        res.status(201).json({ Transaction_ID: transactionResult.rows[0].transaction_id }); // Chú ý: transaction_id (chữ thường)

    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ error: 'Đã có lỗi xảy ra' });
    } finally {
        client.release();
    }
};

