const { pool } = require('../config/db'); // Sẽ được tạo ở bước tiếp theo

const getCars = async () => {
    const result = await pool.query('SELECT * FROM dataCAR');
    return result.rows;
};

const getCarById = async (id) => {
    const result = await pool.query(
        'SELECT * FROM dataCAR WHERE model_car_id = $1',
        [id]
    );
    return result.rows[0]; // Trả về xe đầu tiên (nếu tìm thấy)
};

module.exports = {
    getCars,
    getCarById // Xuất hàm mới
};