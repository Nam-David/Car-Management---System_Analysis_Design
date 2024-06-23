//"validator": "^13.12.0"
const express = require('express');
const cors = require('cors');
const app = express();

const loginRoutes = require ('../src/routes/admin/loginRoutes');
const fillCustomerRoutes = require ('../src/routes/client/fillCustomerInfoRoutes');
const carRoutes = require('../src/routes/admin/carRoutes');
const customerRoutes = require('../src/routes/admin/customerRoutes');
const transactionRoutes = require('../src/routes/admin/transactionRoutes');


// Cấu hình CORS (phải được thêm trước các routes)
//  app.use(cors());
//resolve CORS issue

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


// FE send data to JSON 
app.use(express.json());



// declare routes
app.use('/login', loginRoutes);
app.use('/fillCustomerInfo', fillCustomerRoutes); 
// app.use('/cars', carRoutes);
app.use('/customers', customerRoutes);
// app.use('/transaction', transactionRoutes);
// app.use('/dashboard', dashboardRoutes); // Sử dụng route dashboard

// Run Server 
app.listen(8989, () => {
    console.log('Server backend running on 8989');
});






/*
// Khởi động server
const PORT = process.env.PORT || 3001; // Cho phép sử dụng PORT từ môi trường (cho deployment)
app.listen(PORT, () => {
    console.log(`Server backend đang chạy trên cổng ${PORT}`);
});
*/

