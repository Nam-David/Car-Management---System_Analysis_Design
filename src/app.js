//"validator": "^13.12.0"
const express = require('express');
const cors = require('cors');
const app = express();

// import routes
const loginRoutes = require ('../src/routes/admin/loginRoutes');
const fillCustomerRoutes = require ('../src/routes/client/fillCustomerInfoRoutes');
const carRoutes = require('../src/routes/admin/carRoutes');
const customerRoutes = require('../src/routes/admin/customerRoutes');
const transactionRoutes = require('../src/routes/admin/transactionRoutes');
const dashboardRoutes = require('./routes/admin/dashboardRoutes');
const HumanResourceManagementRoutes= require('../src/routes/admin/HumanResourceManagementRoutes');
const accountingRoutes = require('../src/routes/admin/accountingRoutes');

// resolve CORS issue
app.use(cors());

// -- Fix cors issue - this line of code - Nam (28/6/2024 - 2:48 A.M)
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// FE send data to JSON 
app.use(express.json());
// use routes
app.use('/login', loginRoutes);
app.use('/fillCustomerInfo', fillCustomerRoutes); 
app.use('/customers', customerRoutes);
app.use('/cars', carRoutes);
app.use('/transaction', transactionRoutes);
app.use('/dashboard', dashboardRoutes);
app.use('/humanrm', HumanResourceManagementRoutes);
app.use('/accounting', accountingRoutes);

// Run Server 
app.listen(8989, () => {
    console.log('Server backend running on 8989');
});

