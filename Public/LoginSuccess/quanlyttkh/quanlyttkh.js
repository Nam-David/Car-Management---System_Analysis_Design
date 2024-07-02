
const customerTable = document.getElementById('customer-data');

//  GET - Func GET data from BACK END & Display
async function getCustomerData() {
  try {
    const response = await fetch('http://localhost:8989/customers');
    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.status}`);
    }
    const customerData = await response.json();
    
    displayCustomerData(customerData); // Call display function here
  } catch (error) {
    console.error('Error fetching employee data:', error);
  }
}

// Function to display employee data in the table
function displayCustomerData(data) {
  let tableContent = '';

  //inside <td> attribute must lowercase - same as what Backend return JSON file
  data.forEach(customer => {
    tableContent += `<tr>
        <td>${customer.citizen_id}</td>  
        <td>${customer.email}</td>
        <td>${customer.customer_name}</td>
        <td>${customer.phone_no}</td>
        <td>${customer.address}</td>
        <td>${customer.number_transaction}</td>
        <td>
            <button class="delete-customer"   data-customer-id="${customer.citizen_id}" >delete</button>  
        </td>
        <td>
            <button class="edit-customer"   data-customer-id="${customer.citizen_id}" >edit</button>  
        </td>
    </tr>`;
  });

  customerTable.innerHTML = tableContent;

  customerTable.addEventListener('click', (event) => {
    if (event.target.classList.contains('delete-customer')) {
        deleteHandlerCustomerData(event);
    }
});

}
// Call the fetch function after fetching is complete
getCustomerData();

//DELETE 
function deleteHandlerCustomerData(event) {
    if (!event.target.classList.contains('delete-customer')) {
      return; // Ignore clicks outside of delete buttons
    }
  
    const customerId = event.target.dataset.customerId;
    console.log(customerId)
    // Implement your logic to delete the car using the car ID
    fetch(`http://localhost:8989/customers/${customerId}`, {
      method: 'DELETE'
    })
    .then(response => {
      if (response.ok) {
        // Car deleted successfully, remove the row from the table
        event.target.parentElement.parentElement.remove();
      } else {
        console.error('Error deleting employee:', response.statusText);
        // Handle delete failure (optional: display an error message to the user)
      }
    })
    .catch(error => {
      console.error('Error deleting employee:', error);
      // Handle network or other errors (optional: display an error message to the user)
    });
}  
