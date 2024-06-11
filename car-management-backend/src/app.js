const express = require('express');
const cors = require('cors');
const app = express();
const carRoutes = require('./routes/carRoutes');
const customerRoutes = require('./routes/customerRoutes');
const transactionRoutes = require('./routes/transactionRoutes');
const pool = require('./config/db');

// Cấu hình CORS (phải được thêm trước các routes)
app.use(cors());

// Phân tích body request dưới dạng JSON
app.use(express.json());

// Khai báo routes
app.use('/cars', carRoutes);
app.use('/customers', customerRoutes);
app.use('/transaction', transactionRoutes);

// Kiểm tra kết nối database
pool.query('SELECT NOW()', (err, res) => {
    if (err) {
        console.error('Lỗi kết nối database:', err);
    } else {
        console.log('Kết nối database thành công!', res.rows[0]);
    }
});

// Khởi động server
app.listen(3001, () => {
    console.log('Server backend đang chạy trên cổng 3001');
});