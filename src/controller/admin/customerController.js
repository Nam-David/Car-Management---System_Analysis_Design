const db = require('../../config/db');

/*const createCustomer = async (req, res) => {
    const { Citizen_ID, Email, Customer_Name, Phone_No, Address, Number_Transaction } = req.body;
    try {
        await db.pool.query('INSERT INTO dataCUSTOMER (Citizen_ID, Email, Customer_Name, Phone_No, Address, Number_Transaction) VALUES ($1, $2, $3, $4, $5, $6)', [Citizen_ID, Email, Customer_Name, Phone_No, Address, Number_Transaction]);
        res.status(201).json({ message: 'Customer created successfully.' });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while creating the customer.', error });
    }
};*/

const getCustomers = async (req, res) => {
    try {
        const { rows } = await db.pool.query('SELECT * FROM dataCUSTOMER');
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while retrieving customers.', error });
    }
};

const getCustomerById = async (req, res) => {
    const id = req.params.id;
    try {
        const { rows } = await db.pool.query('SELECT * FROM dataCUSTOMER WHERE Citizen_ID = $1', [id]);
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while retrieving the customer.', error });
    }
};

const updateCustomer = async (req, res) => {
    const { Citizen_ID, Email, Customer_Name, Phone_No, Address, Number_Transaction } = req.body;
    try {
        
        db.pool.query('UPDATE dataCUSTOMER SET Citizen_ID = $1, Email = $2, Customer_Name = $3, Phone_No = $4, Address = $5, Number_Transaction = $6 WHERE Citizen_ID = $7', 
        [Citizen_ID, Email, Customer_Name, Phone_No, Address, Number_Transaction, Citizen_ID]);
        res.status(200).json({  });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while updating the customer.', error });
    }
};

const deleteCustomer = async  (req, res) => {
    const id = req.params.id;
        //console.log(resultTransactionID);

        // IF DELETE CUSTOMER -> DELETE TRANSACTION and 
        //db.pool.query('DELETE FROM dataACCOUNTING  WHERE Transaction_ID = $2', [resultTransactionID]);
        //db.pool.query('DELETE FROM dataTransaction WHERE Transaction_ID = $3', [resultTransactionID]);
        //db.pool.query('DELETE FROM dataCUSTOMER    WHERE Citizen_ID = $4', [id]);
    try {
        const resultID = await db.pool.query(
            `SELECT Transaction_ID FROM dataTransaction WHERE Citizen_ID = $1`,
            [id]
        );        
        const resultTransactionID = resultID.rows[0]; // Assuming single row
        
        // Re-enable transaction logic for deleting transactions
        await db.pool.query('BEGIN');
        await db.pool.query('DELETE FROM dataACCOUNTING WHERE Transaction_ID = $1', [resultTransactionID]);
        await db.pool.query('DELETE FROM dataTransaction WHERE Transaction_ID = $1', [resultTransactionID]);
        await db.pool.query('DELETE FROM dataCUSTOMER WHERE Citizen_ID = $1', [id]);
        await db.pool.query('COMMIT'); // Commit transaction on success


        res.status(200).json({ message: 'Customer deleted successfully.' });
    } catch (error) {
        await db.pool.query('ROLLBACK');
        res.status(500).json({ message: 'An error occurred while deleting the customer.', error });
    }
};

module.exports = {
   // createCustomer,
    getCustomers,
    getCustomerById,
    updateCustomer,
    deleteCustomer
}