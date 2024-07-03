document.addEventListener('DOMContentLoaded', async function () {
    const transactionTable = document.querySelector('.table tbody');
    const errorMessageElement = document.createElement('div');
    errorMessageElement.classList.add('error-message');
    
    const totalRevenueElement = document.getElementById('total-revenue'); // Move variable declaration inside the listener
    const totalCarsInStockElement = document.getElementById('total-cars-in-stock'); // Move variable declaration inside the listener
    // GET - Fetch Dashboard Data from Backend
    async function getDashboardData() {
        try {
            const response = await fetch('http://localhost:8989/dashboard');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
  
            const data = await response.json();
            console.log("Fetched data:", data);
  
            displayDashboardData(data);
        } catch (error) {
            console.error('Error fetching data:', error);
  
            // Display error message in the table area
            errorMessageElement.textContent = 'Error loading data. Please try again later.';
            errorMessageElement.classList.add('error-message');
            if (!document.body.contains(errorMessageElement)) {
                transactionTable.parentNode.insertBefore(errorMessageElement, transactionTable);
            }
        }
    }
  
    // Display Dashboard Data in UI Elements
    function displayDashboardData(data) {
        totalRevenueElement.textContent = `Total Revenue: ${data.totalRevenue}`;
        totalCarsInStockElement.textContent = `Total Cars In Stock: ${data.totalCarsInStock}`;
        transactionTable.innerHTML = ''; // Clear the table before adding new rows
        data.transactionData.forEach(transaction => {
            const row = transactionTable.insertRow();
  
            // Create cells for each property and set IDs
            Object.keys(transaction).forEach(key => {
                const cell = row.insertCell();
                cell.id = `${key}-${transaction.id}`; 
                cell.textContent = transaction[key] || "N/A";
            });
        });
  
        // Remove error message if it exists
        if (transactionTable.parentNode.contains(errorMessageElement)) {
            transactionTable.parentNode.removeChild(errorMessageElement);
        }
    }
    // Initial Data Load
    getDashboardData(); 
  });

const dateInput = document.getElementById('dateInput');
const fetchButton = document.getElementById('fetchButton');
const chartContainer = document.getElementById('carSalesChart');

fetchButton.addEventListener('click', fetchCarSales);

async function fetchCarSales() {
    chartContainer.innerHTML = ''; // Xóa nội dung cũ

    if (!dateInput.value) {
        chartContainer.textContent = 'Vui lòng chọn ngày.';
        return;
    }
    console.log("data input: ", dateInput.value);
    try {
        // Chuyển đổi định dạng ngày từ DD/MM/YYYY sang YYYY-MM-DD
        const [day, month, year] = dateInput.value.split('/');
        const formattedDate = `${year}-${month}-${day}`; 

        const response = await fetch(`http://localhost:8989/cars/sales?date=${formattedDate.value}`);
        if (!response.ok) {
            throw new Error(`Lỗi khi lấy dữ liệu: ${response.status}`);
        }
        const data = await response.json();

        // Nếu không có dữ liệu bán hàng
        if (data.length === 0) {
            chartContainer.textContent = 'Không có dữ liệu bán hàng cho ngày đã chọn.';
            return;
        }

        const table = document.createElement('table');
        table.classList.add('graph');

        const thead = table.createTHead();
        const headerRow = thead.insertRow();
        headerRow.insertCell().textContent = 'Model';
        headerRow.insertCell().textContent = 'Sold';

        const tbody = table.createTBody();
        data.forEach(sale => {
            const row = tbody.insertRow();
            row.insertCell().textContent = sale.model_car_name;
            row.insertCell().textContent = sale.total_sold;
        });

        chartContainer.appendChild(table);
    } catch (error) {
        console.error('Lỗi:', error);
        chartContainer.textContent = 'Đã xảy ra lỗi khi lấy dữ liệu.';
    }
}
