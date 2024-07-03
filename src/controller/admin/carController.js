const db = require('../../config/db');

const createCar = async (req, res) => {
    const { Model_Car_ID, Model_Car_Name, Price, Color, Origin_Of_Car, 
        Date_Of_Import, Car_Number_Availability, Car_Sold, Lauching_Year } = req.body;
    try {
        const existingCar = await db.pool.query(
            'SELECT * FROM dataCAR WHERE Model_Car_ID = $1', 
            [Model_Car_ID]
        );
        const resultExistingCar = existingCar.rows[0];

        if(resultExistingCar) {
            await db.pool.query(
                'UPDATE dataCAR SET Car_Number_Availability = Car_Number_Availability + $1, Car_Sold = Car_Sold + $2  WHERE Model_CAR_ID = $3',
                [Car_Number_Availability,Car_Sold,Model_Car_ID]

            );
        }
        else{
            await db.pool.query('INSERT INTO dataCAR (Model_Car_ID, Model_Car_Name, Price, Color, Origin_Of_Car, Date_Of_Import, Car_Number_Availability, Car_Sold, Lauching_Year) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)', [Model_Car_ID, Model_Car_Name, Price, Color, Origin_Of_Car, Date_Of_Import, Car_Number_Availability, Car_Sold, Lauching_Year]);
        }
        res.status(201).json({ message: 'Car created successfully.' });


    } catch (error) {
        res.status(500).json({ message: 'An error occurred while creating the car.', error });
    }

/* await client.query('BEGIN'); // Bắt đầu giao dịch
        //const { Citizen_ID, Phone_No, Email, Customer_Name, Address, Model_Car_ID, Transaction_Date, Payment_Date, Warranty_Valid_Date, Status_Of_Purchasing } = req.body;
        const { Citizen_ID, Phone_No, Email, Customer_Name, Address } = req.body;

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
 */




};

const getCars = async (req, res) => {
    try {
        const { rows } = await db.pool.query('SELECT * FROM dataCAR');
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while retrieving cars.', error });
    }
};

const getCarById = async (req, res) => {
    const id = req.params.id;
    try {
        const { rows } = await db.pool.query('SELECT * FROM dataCAR WHERE Model_Car_ID = $1', [id]);
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while retrieving the car.', error });
    }
};

const getCarSalesByDate = async (req, res) => {
    const selectedDate = req.query.date; // Get the selected date from query parameters
    console.log("Query Date:", selectedDate); // Log the selected date
    try {
        const { rows } = await db.pool.query(
            `SELECT dataCAR.Model_Car_Name, COUNT(dataTRANSACTION.Transaction_ID) as total_sold 
             FROM dataTRANSACTION 
             INNER JOIN dataCAR ON dataTRANSACTION.Model_Car_ID = dataCAR.Model_Car_ID
             WHERE dataTRANSACTION.Transaction_Date = $1
             GROUP BY dataCAR.Model_Car_Name`,
            [selectedDate]
        );
        console.log("Query Result:", rows); // Log the results from the query
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching car sales.', error });
    }
};


// const updateCar = async (req, res) => {
//     const id = req.params.id; // default ID car

//     // DO NOT ALLOW TO UPDATE CAR_ID -> can be lost integrity of data -> nếu muốn cập nhật thì POST lại Model car ID 
    
//     const {  Model_Car_Name, Price, Color, Origin_Of_Car, Date_Of_Import, Car_Number_Availability, Car_Sold, Lauching_Year } = req.body;
//     try {
//         db.pool.query(
//             'UPDATE dataCAR SET  Model_Car_Name = $1, Price = $2, Color = $3, Origin_Of_Car = $4, Date_Of_Import = $5, Car_Number_Availability = $6, Car_Sold = $7, Lauching_Year = $8 WHERE Model_Car_ID = $9', 
//             [Model_Car_Name, Price, Color, Origin_Of_Car, Date_Of_Import, Car_Number_Availability, Car_Sold, Lauching_Year, id]
//         );
//         res.status(200).json({ message: 'Car updated successfully.' });
//     } catch (error) {
//         res.status(500).json({ message: 'An error occurred while updating the car.', error });
//     }
// };

const updateCar = async (req, res) => {

    const id = req.params.id; // Car ID from the URL
    const field = req.body.field; // Field name to be updated (from frontend)
    const newValue = req.body.newValue; // New value for the specified field
  
    // Check if required fields are present
    if (!id || !field || !newValue) {
      return res.status(400).json({ message: 'Missing required fields (id, field, newValue).' });
    }
  
    // Sanitize input (optional): You might want to add input validation/sanitization here to prevent potential security vulnerabilities.
  
    try {
      const updateQuery = `
        UPDATE dataCAR
        SET ${field} = $1
        WHERE Model_Car_ID = $2
      `;
  
      await db.pool.query(updateQuery, [newValue, id]);
  
      res.status(200).json({ message: 'Car updated successfully.' });
    } catch (error) {
      console.error('Error updating car data:', error);
      res.status(500).json({ message: 'An error occurred while updating the car.', error });
    }



};
const deleteCar = async (req, res) => {
    const id = req.params.id;
    try {
        db.pool.query('DELETE FROM dataCAR WHERE Model_Car_ID = $1', [id]);
        res.status(200).json({ message: 'Car deleted successfully.' });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while deleting the car.', error });
    }
};

module.exports = {
    createCar,
    getCars,
    getCarById,
    getCarSalesByDate,
    updateCar,
    deleteCar
};