// // src\controller\client\fillCustomerInfoController.js
// const database = require('../../config/db');
// const validator = require('validator');

// exports.saveCustomerInfo = async (req, res) => {
//     const client = await database.pool.connect();

//     try {
//         await client.query('BEGIN');
//         const {
//             Citizen_ID,
//             Phone_No,
//             Email,
//             Customer_Name,
//             Address,
//             Model_Car_ID  // Lấy Model_Car_ID từ req.body
//         } = req.body;

//         // --- Kiểm tra dữ liệu đầu vào ---
//         if (!Citizen_ID || !Phone_No || !Email || !Customer_Name || !Address || !Model_Car_ID) {
//             return res.status(400).json({ error: 'Vui lòng nhập đầy đủ thông tin' });
//         }

//         if (!validator.isEmail(Email)) {
//             return res.status(400).json({ error: 'Email không hợp lệ' });
//         }

//         if (!validator.isMobilePhone(Phone_No, 'vi-VN')) {
//             return res.status(400).json({ error: 'Số điện thoại không hợp lệ' });
//         }
//         // --- Kết thúc kiểm tra ---

//         // Kiểm tra xem Citizen_ID đã tồn tại chưa
//         const existingCustomerResult = await client.query(
//             'SELECT * FROM dataCUSTOMER WHERE Citizen_ID = $1', [Citizen_ID]
//         );
//         const existingCustomer = existingCustomerResult.rows[0];

//         if (existingCustomer) {
//             await client.query(
//                 'UPDATE dataCUSTOMER SET Number_Transaction = Number_Transaction + 1 WHERE Citizen_ID = $1', [Citizen_ID]
//             );
//         } else {
//             await client.query(
//                 'INSERT INTO dataCUSTOMER (Citizen_ID, Customer_Name, Phone_No, Email, Address, Number_Transaction) VALUES ($1, $2, $3, $4, $5, 1)',
//                 [Citizen_ID, Customer_Name, Phone_No, Email, Address]
//             );
//         }

//         // --- Tạo giao dịch mới ---
//         // Lấy ngày hiện tại
//         const currentDate = new Date();

//         // Payment_Date là ngày hiện tại:
//         const paymentDate = currentDate;

//         // Tính Warranty_Valid_Date (cộng thêm 2 năm)
//         const warrantyValidDate = new Date(currentDate);
//         warrantyValidDate.setFullYear(warrantyValidDate.getFullYear() + 2);

//         // Tạo Transaction_ID (có thể sử dụng UUID hoặc logic tạo ID riêng)
//         const transactionId = 'T' + Date.now(); // Ví dụ: T1699999999999

//         // Thêm dữ liệu vào dataTRANSACTION (sử dụng transactionId, Model_Car_ID, và currentDate)
//         await client.query(
//             'INSERT INTO dataTRANSACTION (Transaction_ID, Citizen_ID, Model_Car_ID, Transaction_Date, Payment_Date, Warranty_Valid_Date, Status_Of_Purchasing) VALUES ($1, $2, $3, $4, $5, $6, $7)',
//             [transactionId, Citizen_ID, Model_Car_ID, currentDate, paymentDate, warrantyValidDate, 'deposited'] // Giả sử trạng thái ban đầu là 'deposited'
//         );
//         // --- Kết thúc tạo giao dịch ---

//         // --- Thêm data vào bảng dataACCOUNTING ---
//         // Lấy giá trị đặt cọc (ví dụ: 10% giá xe) - Cần logic xác định giá trị đặt cọc dựa trên Model_Car_ID - 5000
//         const depositPrice = 5000

//         // Lấy giá xe từ dataCAR:
//         const carPrice = (await client.query('SELECT Price FROM dataCAR WHERE Model_Car_ID = $1', [Model_Car_ID])).rows[0].price - depositPrice;

//         // **Sửa đổi ở đây:** Thay đổi tên bảng từ dataEMPLOYEE thành dataACCOUNTING
//         await client.query(
//             'INSERT INTO dataACCOUNTING (Transaction_ID, Transaction_Price, Deposit_Price) VALUES ($1, $2, $3)',
//             [transactionId, carPrice, depositPrice]
//         );
//         // --- 

//         await client.query('COMMIT');
//         res.status(201).json({ Transaction_ID: transactionId });

//     } catch (err) {
//         await client.query('ROLLBACK');
//         console.error('Error:', err);
//         res.status(500).json({ error: 'Đã có lỗi xảy ra' });
//     } finally {
//         client.release();
//     }
// };

const database = require('../../config/db');
const validator = require('validator');

exports.saveCustomerInfo = async (req, res) => {
    const client = await database.pool.connect();

    try {
        await client.query('BEGIN');
        const {
            Citizen_ID,
            Phone_No,
            Email,
            Customer_Name,
            Address,
            Model_Car_ID  // Lấy Model_Car_ID từ req.body
        } = req.body;

        // --- Kiểm tra dữ liệu đầu vào ---
        if (!Citizen_ID || !Phone_No || !Email || !Customer_Name || !Address || !Model_Car_ID) {
            return res.status(400).json({ error: 'Vui lòng nhập đầy đủ thông tin' });
        }

        if (!validator.isEmail(Email)) {
            return res.status(400).json({ error: 'Email không hợp lệ' });
        }

        if (!validator.isMobilePhone(Phone_No, 'vi-VN')) {
            return res.status(400).json({ error: 'Số điện thoại không hợp lệ' });
        }
        // --- Kết thúc kiểm tra ---

        // Kiểm tra xem Citizen_ID đã tồn tại chưa
        const existingCustomerResult = await client.query(
            'SELECT * FROM dataCUSTOMER WHERE Citizen_ID = $1', [Citizen_ID]
        );
        const existingCustomer = existingCustomerResult.rows[0];

        if (existingCustomer) {
            await client.query(
                'UPDATE dataCUSTOMER SET Number_Transaction = Number_Transaction + 1 WHERE Citizen_ID = $1', [Citizen_ID]
            );
        } else {
            await client.query(
                'INSERT INTO dataCUSTOMER (Citizen_ID, Customer_Name, Phone_No, Email, Address, Number_Transaction) VALUES ($1, $2, $3, $4, $5, 1)',
                [Citizen_ID, Customer_Name, Phone_No, Email, Address]
            );
        }

        // --- Tạo giao dịch mới ---
        // Lấy ngày hiện tại
        const currentDate = new Date();

        // Payment_Date là ngày hiện tại:
        const paymentDate = currentDate;

        // Tính Warranty_Valid_Date (cộng thêm 2 năm)
        const warrantyValidDate = new Date(currentDate);
        warrantyValidDate.setFullYear(warrantyValidDate.getFullYear() + 2);

        // Lấy giá trị Transaction_ID cuối cùng và tăng lên một đơn vị - default T068 
        const lastTransactionIdResult = await client.query(
            'SELECT Transaction_ID FROM dataTRANSACTION ORDER BY Transaction_ID DESC LIMIT 1'
        );
        
        const lastTransactionId = lastTransactionIdResult.rows[0] ? lastTransactionIdResult.rows[0].transaction_id : 'T068';

        const nextTransactionId = 'T' + String(Number(lastTransactionId.slice(1)) + 1).padStart(3, '0');

        // Thêm dữ liệu vào dataTRANSACTION (sử dụng nextTransactionId, Model_Car_ID, và currentDate)
        await client.query(
            'INSERT INTO dataTRANSACTION (Transaction_ID, Citizen_ID, Model_Car_ID, Transaction_Date, Payment_Date, Warranty_Valid_Date, Status_Of_Purchasing) VALUES ($1, $2, $3, $4, $5, $6, $7)',
            [nextTransactionId, Citizen_ID, Model_Car_ID, currentDate, paymentDate, warrantyValidDate, 'deposited'] // Giả sử trạng thái ban đầu là 'deposited'
        );
        // --- Kết thúc tạo giao dịch ---

        // --- Thêm data vào bảng dataACCOUNTING ---
        // Lấy giá trị đặt cọc (ví dụ: 10% giá xe) - Cần logic xác định giá trị đặt cọc dựa trên Model_Car_ID
        const depositPrice = 5000;

        // Lấy giá xe từ dataCAR:
        const carPriceResult = await client.query('SELECT Price FROM dataCAR WHERE Model_Car_ID = $1', [Model_Car_ID]);
        const carPrice = carPriceResult.rows[0].price - depositPrice;

        // **Sửa đổi ở đây:** Thay đổi tên bảng từ dataEMPLOYEE thành dataACCOUNTING
        await client.query(
            'INSERT INTO dataACCOUNTING (Transaction_ID, Transaction_Price, Deposit_Price) VALUES ($1, $2, $3)',
            [nextTransactionId, carPrice, depositPrice]
        );
        // --- 

        await client.query('COMMIT');
        res.status(201).json({ Transaction_ID: nextTransactionId });

    } catch (err) {
        await client.query('ROLLBACK');
        console.error('Error:', err);
        res.status(500).json({ error: 'Đã có lỗi xảy ra' });
    } finally {
        client.release();
    }
};