const keToanTable = document.getElementById('ketoan-data');

// GET - Func GET data from BACK END & Display
async function getKeToanData() {
  try {
    const response = await fetch('http://localhost:8989/accounting');
    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.status}`);
    }
    const keToanData = await response.json();
    
    //console.log(carData);
    displayKeToanData(keToanData); // Call display function here
  } catch (error) {
    console.error('Error fetching employee data:', error);
  }
}

function displayKeToanData(data) {
  let tableContent = '';

  data.forEach(keToan => {
    tableContent += `<tr>
        <td > ${keToan.transaction_id}</td>  
        <td > ${keToan.transaction_price}</td>
        <td > ${keToan.deposit_price}</td> 
        <td > ${keToan.totalprice}</td> 
    </tr>`;
    // data-car-id: will store ID for each row 
  });

    tableContent += '</tbody>'; // Close table body tag

    keToanTable.innerHTML = tableContent;
    // add event to delete and delete
    keToanTable.addEventListener('click', (event) => {
        if (event.target.classList.contains('delete-ketoan')) {
            makeCellEditable(event);
        }
    });
}

getKeToanData();