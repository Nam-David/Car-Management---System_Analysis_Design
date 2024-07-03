const carTable = document.getElementById('ketoan-data');

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
        <td data-field= "Model_Car_ID"> ${car.model_car_id}</td>  
        <td data-field= "Model_Car_Name"> ${car.model_car_name}</td>
        <td data-field= "Price"> ${car.price}</td>
        <td data-field= "Color"> ${car.color}</td>
        <td data-field= "Origin_Of_Car"> ${car.origin_of_car}</td> 
        <td data-field= "Date_Of_Import"> ${car.date_of_import}</td>
        <td data-field= "Car_Number_Availability">${car.car_number_availability}</td>
        <td data-field= "Car_Sold"> ${car.car_sold}</td>
        <td data-field= "Lauching_Year"> ${car.lauching_year}</td>
       
        
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