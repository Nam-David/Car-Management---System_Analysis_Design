const transactionTable = document.getElementById('qlgd-data');

// GET - Func GET data from BACK END & Display
async function getTransactionData() {
  try {
    const response = await fetch('http://localhost:8989/transaction');
    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.status}`);
    }
    const transactionData = await response.json();
    
    displayTransactionData(transactionData  ); // Call display function here
  } catch (error) {
    console.error('Error fetching employee data:', error);
  }
}

function displayTransactionData(data) {
  let tableContent = '';

  //inside <td> attribute must lowercase - same as what Backend return JSON file

  data.forEach(transaction => {
    tableContent += `<tr>
        <td> ${transaction.transaction_id}</td>  
        <td> ${transaction.citizen_id}</td>
        <td> ${transaction.model_car_id}</td>
        <td> ${transaction.transaction_date}</td>
        <td> ${transaction.payment_date}</td> 
        <td >${transaction.warranty_valid_date}</td>
        <td> ${transaction.status_of_purchasing}</td>
       
        
        <td>
            <button class="delete-transaction"   data-transaction-id="${transaction.transaction_id}" >delete</button>  
         </td>
         <td>
            <button class="edit-transaction"   data-transaction-id="${transaction.transaction_id}" >edit</button>  
        </td>
    </tr>`;
    // data-car-id: will store ID for each row 
  });

    tableContent += '</tbody>'; // Close table body tag

    transactionTable.innerHTML = tableContent;
    // add event to delete and delete
    transactionTable.addEventListener('click', deleteHandlerTransactionData);
    transactionTable.addEventListener('click', (event) => {
        if (event.target.classList.contains('edit-car')) {
            //makeCellEditable(event);
        }
    });
}

function deleteHandlerTransactionData(event) {
    if (!event.target.classList.contains('delete-transaction')) {
      return; // Ignore clicks outside of delete buttons
    }
  
    const transactionId = event.target.dataset.transactionId;
  
    // Implement your logic to delete the car using the car ID
    fetch(`http://localhost:8989/transaction/${transactionId}`, {
      method: 'DELETE'
    })
    .then(response => {
      if (response.ok) {
        // Car deleted successfully, remove the row from the table
        event.target.parentElement.parentElement.remove();
      } else {
        console.error('Error deleting car:', response.statusText);
        // Handle delete failure (optional: display an error message to the user)
      }
    })
    .catch(error => {
      console.error('Error deleting car:', error);
      // Handle network or other errors (optional: display an error message to the user)
    });
}  
getTransactionData()