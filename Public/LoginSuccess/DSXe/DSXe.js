const carTable = document.getElementById('car-data');

// GET - Func GET data from BACK END & Display
async function getCarData() {
  try {
    const response = await fetch('http://localhost:8989/cars');
    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.status}`);
    }
    const carData = await response.json();
    
    //console.log(carData);
    displayCarData(carData); // Call display function here
  } catch (error) {
    console.error('Error fetching employee data:', error);
  }
}
//class="data-cell"
//  <td class="edit-car" data-field= "Model_Car_ID"> ${car.model_car_id}</td>  
//             <button class="delete-car"   data-car-id="${car.model_car_id}" >delete</button>  --> can tim hieu cho nay vi sao     const carId = event.target.dataset.carId; co the lay duoc du lieu 
// Function to display car data in the table
function displayCarData(data) {
  let tableContent = '';

  //inside <td> attribute must lowercase - same as what Backend return JSON file

  data.forEach(car => {
    tableContent += `<tr>
        <td data-field="Model_Car_ID"> ${car.model_car_id}</td>  
        <td data-field="Model_Car_Name"> ${car.model_car_name}</td>
        <td data-field="Price"> ${car.price}</td>
        <td data-field="Color"> ${car.color}</td>
        <td data-field="Origin_Of_Car"> ${car.origin_of_car}</td> 
        <td data-field="Date_Of_Import"> ${car.date_of_import}</td>
        <td data-field="Car_Number_Availability">${car.car_number_availability}</td>
        <td data-field="Car_Sold"> ${car.car_sold}</td>
        <td data-field="Lauching_Year"> ${car.lauching_year}</td>
       
        
        <td>
            <button class="delete-car"   data-car-id="${car.model_car_id}" >delete</button>  
         </td>
         <td>
            <button class="edit-car"   data-car-id="${car.model_car_id}" >edit</button>  
        </td>
    </tr>`;
    // data-car-id: will store ID for each row 
  });

    tableContent += '</tbody>'; // Close table body tag

    carTable.innerHTML = tableContent;
    // add event to delete and delete
    carTable.addEventListener('click', deleteHandlerCarData);
    carTable.addEventListener('click', (event) => {
        if (event.target.classList.contains('edit-car')) {
            makeCellEditable(event);
        }
    });
}

/*
function makeCellEditable(event) {
    const editButton = event.target;
    const carId = editButton.dataset.carId;

    const tableRow = editButton.parentElement.parentElement; // Get the table row
    //const field = tableRow.querySelector('td').dataset.field;  // Get the field name to update
    const field =editButton.dataset.field;

    console.log(carId, field, tableRow); // Verify data in console


    // Find the cell to edit based on the data-field attribute
    const cellToEdit = tableRow.querySelector(`td[data-field="${field}"]`);
  
    if (cellToEdit) {
         // Make the cell editable
        cellToEdit.contentEditable = true;
        cellToEdit.style.backgroundColor = '#f0f0f0'; // Optional: highlight editable cell
        
        cellToEdit.addEventListener('blur', () => {
            updateCarData(carId, field, cellToEdit.textContent); // Send PUT request
            cellToEdit.contentEditable = false; // Disable editing
            cellToEdit.style.backgroundColor = ''; // Optional: remove highlight
          
        });
    } 
    else {
        console.error("Cell to edit not found!"); // Optional: Log an error message
    }
}






  // Function to send PUT request to update a single field
  async function updateCarData(carId, field, newValue) {
    const updatedData = { [field]: newValue }; // Create object with specific field
  
    try {
      const response = await fetch(`http://localhost:8989/cars/${carId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedData)
      });
  
      if (response.ok) {
        alert("Cập nhật xe thành công!!!"); // Update success message (optional)
      } else {
        console.error('Error updating car data:', response.statusText);
        // Handle update failure (optional: display an error message to the user)
      }
    } catch (error) {
      console.error('Error updating car data:', error);
      // Handle network or other errors (optional: display an error message to the user)
    }
  }

*/


// POST 
function postCarData() {

    let Model_Car_ID = document.getElementById("new-id").value;
    let Model_Car_Name = document.getElementById("new-name").value;
    let Price = document.getElementById("new-price").value;
    let Color = document.getElementById("new-color").value;
    let Origin_Of_Car = document.getElementById("new-origin").value;
    let Date_Of_Import = document.getElementById("new-date-import").value;
    let Car_Number_Availability = document.getElementById("new-import-car-number").value;
    let Car_Sold = document.getElementById("new-sold-car-number").value;
    let Lauching_Year = document.getElementById("new-launching-year").value;

    fetch('http://localhost:8989/cars', {
        method: 'post',

        headers: {
            "Content-type": "application/json; charset=UTF-8"
            },
        body: JSON.stringify({
            //username and password are parameters, which declared above
            Model_Car_ID : Model_Car_ID ,
            Model_Car_Name : Model_Car_Name ,
            Price : Price,
            Color : Color ,
            Origin_Of_Car: Origin_Of_Car ,
            Date_Of_Import: Date_Of_Import,
            Car_Number_Availability : Car_Number_Availability,
            Car_Sold : Car_Sold,
            Lauching_Year : Lauching_Year
        })
    })

    
    .then(loginRespond => {
        alert("Thêm xe thành công!!!.");
    })
}

//DELETE
function deleteHandlerCarData(event) {
    if (!event.target.classList.contains('delete-car')) {
      return; // Ignore clicks outside of delete buttons
    }
  
    const carId = event.target.dataset.carId;
    console.log(carId); // Verify car ID in console
  
    // Implement your logic to delete the car using the car ID
    fetch(`http://localhost:8989/cars/${carId}`, {
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
getCarData();


//PUT
/*
function putHandlerCarData(event){
    if (!event.target.classList.contains('edit-car')) {
        return;
    }
    
    const carId = event.target.dataset.carId;
    const carRow = event.target.parentElement.parentElement; // Get the table row
    // Make all table cells editable (except ID and buttons, not first and last child of row) - ID have been stored in carID
    console.log(carRow);

    // USE to GET data from specific car ID
    const response = fetch('http://localhost:8989/cars/${carId}',{ method: "GET"});
    const updatedCarData =  response.json();
    //JSON data





    let hasChanges = false;
    carRow.querySelectorAll('td').forEach((cell, index) => {
        //check neu co thay doi thi moi thay doi 

        if (cell.textContent !== cell.dataset.originalValue & (index !== 0 || index !== carRow.children.length - 1)) {
            hasChanges = true;
            cell.contentEditable = true; // true: allow to edit
            //cell.style.backgroundColor = '#f0f0f0'; // Optional: highlight editable cells        }
        }
        if (hasChanges) {
            carRow.querySelectorAll('td').forEach((cell, index) => {
                
            });


        } else {
            alert("No changes detected. Update cancelled.");
        } 
    });


  
    
    // Prepare an empty object to store updated values
    //const updatedCarData = {};
    carRow.querySelectorAll('td:not(:first-child, :last-child)').forEach(cell => {
        updatedCarData[cell.dataset.field] = cell.textContent;
    });

    fetch(`http://localhost:8989/cars/${carId}`, {
        method: 'PUT', 
        headers: { 
            'Content-Type': 'application/json' 
        }, 
        
        body: JSON.stringify(updatedCarData)
    })
    .then(response => {
    if (response.ok) {
        alert("Cập nhật xe thành công!!!")
    } else {
        console.error('Error updating car data:', response.statusText);
        // Handle update failure (optional: display an error message to the user)
    }
    })
    .catch(error => {
    console.error('Error updating car data:', error);
    // Handle network or other errors (optional: display an error message to the user)
    });
}
*/







// Function to handle edit button click - Edit data directly to table 
// function putHandlerCarData(event) {
//   if (!event.target.classList.contains('edit-car')) {
//     return; // Ignore clicks outside of edit buttons
//   }

//   const carId = event.target.dataset.carId;
//   const carRow = event.target.parentElement.parentElement; // Get the table row

//   // Make all table cells editable (except ID and buttons, not first and last child of row) - ID have been stored in carID

//     carRow.querySelectorAll('td: not(:first-child)').forEach(cell => {
//         cell.contentEditable = true; // true: allow to edit
        
//         cell.style.backgroundColor = '#f0f0f0'; // Optional: highlight editable cells
//     });

//     carRow.querySelectorAll('td: not(:last-child)').forEach(cell => {
//         cell.contentEditable = true; // true: allow to edit
        
//         cell.style.backgroundColor = '#f0f0f0'; // Optional: highlight editable cells
//     }
//   );
//   const firstChild = carRow.firstChild;
//   const lastChild = carRow.lastChild;
  
//   console.log("First Child:", firstChild); // May contain whitespace or text nodes
//   console.log("Last Child:", lastChild);

//   // Add a confirmation button
//   const confirmButton = document.createElement('button');
//   confirmButton.textContent = 'Confirm Edit';
//   confirmButton.addEventListener('click', () => updateCarData(carId, carRow));
//   carRow.appendChild(confirmButton);
// }


// function updateCarData(carId, carRow) {
//     const updatedCarData = {};
  
//     // Collect updated values from editable cells
//     carRow.querySelectorAll('td:not(:first-child, :last-child)').forEach(cell => {
//       updatedCarData[cell.dataset.field] = cell.textContent;
//     });
  
//     // Send a PUT request to update the car data on the server
//     fetch(`http://localhost:8989/cars/${carId}`, {
//         method: 'PUT',
//         headers: { 
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(updatedCarData)
//     })
//     .then(response => {
//       if (response.ok) {
//         alert("Cập nhật xe thành công!!!")
        
//         // Update the table row with the updated data (optional)
//         // You can refetch data here or directly update cell values
  
//         // Reset the row to non-editable state
//         // carRow.querySelectorAll('td').forEach(cell => {
//         //   cell.contentEditable = false;
//         //   cell.style.backgroundColor = ''; // Remove highlight
//         // });
//         // carRow.removeChild(confirmButton); // Remove confirmation button
//       } else {
//         console.error('Error updating car data:', response.statusText);
//         // Handle update failure (optional: display an error message to the user)
//       }
//     })
//     .catch(error => {
//       console.error('Error updating car data:', error);
//       // Handle network or other errors (optional: display an error message to the user)
//     });
// }
// Call the fetch function after fetching is complete --> call data from BACK END after post get put 


//     // (Optional) Prompt the user to enter new values for editable fields
//     // You can use a modal or form to collect user input for each field
//     // Here's an example using prompts (replace with preferred method):
//     const newModelCarID = prompt("Enter new car id:");
//     const newModelCarName = prompt("Enter new model car:");
//     const newPrice = prompt("Enter new price:");
//     const newColor = prompt("Enter new color:");
//     const newOriginOfCar = prompt("Enter new car origin:");
//     const newDateImport = prompt("Enter new date import:");
//     const newCarNumberAvailability = prompt("Enter new car availability:");
//     const newCarSold = prompt("Enter new number car sold:");
//     const newLauchingYear = prompt("Enter new launching year:");
//     // ... (repeat for other editable fields)

//     // Update the "object" with edited values based on user input or other logic
//     if (newModelCarID) updatedCarData.Model_Car_ID = newModelCarID;
//     if (newModelCarName) updatedCarData. Model_Car_Name = newModelCarName;
//     if (newPrice) updatedCarData.Price = newPrice;
//     if (newColor) updatedCarData.Color = newColor;
//     if (newOriginOfCar) updatedCarData.Origin_Of_Car = newOriginOfCar;

//     if (newDateImport) updatedCarData.Date_Of_Import = newDateImport;
//     if (newCarNumberAvailability) updatedCarData.Car_Number_Availability = newCarNumberAvailability;
//     if (newCarSold) updatedCarData.Car_Sold  = newCarSold;
//     if (newLauchingYear) updatedCarData.Lauching_Year = newLauchingYear;
    





