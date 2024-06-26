const database = require('../../config/db');
const validator = require('validator');

exports.saveCustomerInfo = async (req, res) => {
    const client = await database.pool.connect();

    try {
        await client.query('BEGIN'); // Bắt đầu giao dịch
        const { Citizen_ID, Phone_No, Email, Customer_Name, Address, Model_Car_ID, Transaction_Date, Payment_Date, Warranty_Valid_Date, Status_Of_Purchasing } = req.body;

        // ... (Phần kiểm tra dữ liệu đầu vào)

        // Kiểm tra xem Citizen_ID đã tồn tại chưa
        const existingCustomerResult = await client.query(
            'SELECT * FROM dataCUSTOMER WHERE Citizen_ID = $1', [Citizen_ID]
        );
        const existingCustomer = existingCustomerResult.rows[0];

        if (existingCustomer) {
            // Nếu Citizen_ID đã tồn tại, cập nhật số lượng giao dịch
            await client.query(
                'UPDATE dataCUSTOMER SET Number_Transaction = Number_Transaction + 1 WHERE Citizen_ID = $1', [Citizen_ID]
            );
        } else {
            // Nếu Citizen_ID chưa tồn tại, thêm khách hàng mới
            await client.query(
                'INSERT INTO dataCUSTOMER (Citizen_ID, Customer_Name, Phone_No, Email, Address, Number_Transaction) VALUES ($1, $2, $3, $4, $5, 1)',
                [Citizen_ID, Customer_Name, Phone_No, Email, Address]
            );
        }

        // Tạo giao dịch mới
        const transactionResult = await client.query(
            'INSERT INTO dataTRANSACTION (Transaction_ID, Citizen_ID, Model_Car_ID, Transaction_Date, Payment_Date, Warranty_Valid_Date, Status_Of_Purchasing) VALUES (nextval(\'transaction_id_seq\'), $1, $2, $3, $4, $5, $6) RETURNING Transaction_ID',
            [Citizen_ID, Model_Car_ID, Transaction_Date, Payment_Date, Warranty_Valid_Date, Status_Of_Purchasing]
        );

        const transactionId = transactionResult.rows[0].transaction_id;

        // ... (Phần thêm data vào bảng dataACCOUTING, sử dụng transactionId)
        await client.query('COMMIT'); // Xác nhận toàn bộ giao dịch

        res.status(201).json({ Transaction_ID: transactionId }); 
    } catch (err) {
        await client.query('ROLLBACK'); // Hoàn tác giao dịch nếu có lỗi
        console.error('Error:', err);
        res.status(500).json({ error: 'Đã có lỗi xảy ra' });
    } finally {
        client.release(); // Giải phóng kết nối client
    }
};
