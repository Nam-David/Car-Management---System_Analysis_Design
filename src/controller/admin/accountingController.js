const db = require('../../config/db');

const getAccountings = async (req, res) => {
    try {
        const { rows } = await db.pool.query('SELECT * FROM dataACCOUTING');
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while retrieving accounting data.', error });
    }
};

// const getAccountingById = async (req, res) => {
//     const id = parseInt(req.params.id);
//     try {
//         const { rows } = await db.pool.query('SELECT * FROM dataACCOUTING WHERE Transaction_ID = $1', [id]);
//         res.status(200).json(rows);
//     } catch (error) {
//         res.status(500).json({ message: 'An error occurred while retrieving the accounting data.', error });
//     }
// };

module.exports = { 
    getAccountings, 
    //getAccountingById 
};