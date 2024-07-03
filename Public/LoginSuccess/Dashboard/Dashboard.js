/*document.addEventListener('DOMContentLoaded', async function () {
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
  }); */

  const dashboardTable = document.getElementById('dashboard');

// GET - Func GET data from BACK END & Display
async function getTransactionData() {
  try {
    const response = await fetch('http://localhost:8989/dashboard');
    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.status}`);
    }
    const dashboardData = await response.json();
    console.log(dashboardData); 
    displayDashBoardData(dashboardData.transactionData); // Call display function here
  } catch (error) {
    console.error('Error fetching employee data:', error);
  }
}

function displayDashBoardData(data) {
  let tableContent = '';

  //inside <td> attribute must lowercase - same as what Backend return JSON file

  data.forEach(dashboard => {
    tableContent += `<tr>
        <td> ${dashboard.transaction_id}</td>  
        <td> ${dashboard.citizen_id}</td>
        <td> ${dashboard.model_car_id}</td>
        <td> ${dashboard.transaction_date}</td>
        <td> ${dashboard.payment_date}</td> 
        <td >${dashboard.warranty_valid_date}</td>
        <td> ${dashboard.status_of_purchasing}</td>
    </tr>`;
    // data-car-id: will store ID for each row 
  });

    tableContent += '</tbody>'; // Close table body tag

    dashboardTable.innerHTML = tableContent;
    
}