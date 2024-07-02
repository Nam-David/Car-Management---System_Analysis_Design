
const employeeTable = document.getElementById('employee-data');

//  GET - Func GET data from BACK END & Display
async function getEmployeeData() {
  try {
    const response = await fetch('http://localhost:8989/HumanRM');
    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.status}`);
    }
    const employeeData = await response.json();
    
    console.log(employeeData);
    displayEmployeeData(employeeData); // Call display function here
  } catch (error) {
    console.error('Error fetching employee data:', error);
  }
}

// Function to display employee data in the table
function displayEmployeeData(data) {
  let tableContent = '';

  //inside <td> attribute must lowercase - same as what Backend return JSON file
  data.forEach(employee => {
    tableContent += `<tr>
        <td>${employee.employee_citizenid}</td>  
        <td>${employee.employee_name}</td>
        <td>${employee.employee_birthday}</td>
        <td>${employee.employee_phone_no}</td>
        <td>${employee.employee_email}</td>
        <td>${employee.employee_address}</td>
        <td>${employee.role_title}</td>
        <td>
            <button class="delete-employee"   data-employee-id="${employee.employee_citizenid}" >delete</button>  
        </td>
        <td>
            <button class="edit-employee"   data-employee-id="${employee.employee_citizenid}" >edit</button>  
        </td>
    </tr>`;
  });

  employeeTable.innerHTML = tableContent;

  employeeTable.addEventListener('click', (event) => {
    if (event.target.classList.contains('delete-employee')) {
        deleteHandlerEmployeeData(event);
    }
});

}
// Call the fetch function after fetching is complete
getEmployeeData();

// POST 
function postEmployeeData() {

    let Employee_CitizenID = document.getElementById('new-id').value;
    let Employee_Name  = document.getElementById('new-name').value;
    let Employee_Birthday = document.getElementById('new-birthdate').value;
    let Employee_Phone_No = document.getElementById('new-phoneNo').value;
    let Employee_Email = document.getElementById('new-email').value;
    let Employee_Address = document.getElementById('new-address').value;
    let Role_Title = document.getElementById('new-position').value;

    fetch('http://localhost:8989/HumanRM', {
        method: 'post',

        headers: {
            "Content-type": "application/json; charset=UTF-8"
            },
        body: JSON.stringify({
            //username and password are parameters, which declared above
            Employee_CitizenID : Employee_CitizenID,
            Employee_Name : Employee_Name ,
            Employee_Birthday : Employee_Birthday,
            Employee_Phone_No : Employee_Phone_No ,
            Employee_Email : Employee_Email ,
            Employee_Address : Employee_Address,
            Role_Title : Role_Title
   
        })
    })

    
    .then(loginRespond => {
        alert("Thêm nhân viên thành công!!!.");
    })
}
//DELETE 
function deleteHandlerEmployeeData(event) {
    if (!event.target.classList.contains('delete-employee')) {
      return; // Ignore clicks outside of delete buttons
    }
  
    const employeeId = event.target.dataset.employeeId;
    console.log(employeeId); // Verify car ID in console
  
    // Implement your logic to delete the car using the car ID
    fetch(`http://localhost:8989/HumanRM/${employeeId}`, {
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







//---------------------------------------------------------------cai dam duoi day chua hieu lam gi
// Function to sort table by column

// function sortTableByColumn(table, column, asc = true) {
//     const dirModifier = asc ? 1 : -1;
//     const tBody = table.tBodies[0];
//     const rows = Array.from(tBody.querySelectorAll("tr"));

//     // Sort each row
//     const sortedRows = rows.sort((a, b) => {
//         let aColText = a.querySelector(`td:nth-child(${column + 1})`).textContent.trim();
//         let bColText = b.querySelector(`td:nth-child(${column + 1})`).textContent.trim();

//         // Convert to number if possible
//         if (!isNaN(aColText)) {
//             aColText = Number(aColText);
//             bColText = Number(bColText);
//         }

//         return aColText > bColText ? (1 * dirModifier) : (-1 * dirModifier);
//     });

//     // Remove all existing TRs from the table
//     while (tBody.firstChild) {
//         tBody.removeChild(tBody.firstChild);
//     }

//     // Re-add the newly sorted rows
//     tBody.append(...sortedRows);

//     // Remember how the column is currently sorted
//     table.querySelectorAll("th").forEach(th => th.classList.remove("th-sort-asc", "th-sort-desc"));
//     table.querySelector(`th:nth-child(${column + 1})`).classList.toggle("th-sort-asc", asc);
//     table.querySelector(`th:nth-child(${column + 1})`).classList.toggle("th-sort-desc", !asc);
// }

// // Add event listeners for sorting
// document.querySelectorAll(".table-sortable th").forEach(headerCell => {
//     headerCell.addEventListener("click", () => {
//         const tableElement = headerCell.parentElement.parentElement.parentElement;
//         const headerIndex = Array.prototype.indexOf.call(headerCell.parentElement.children, headerCell);
//         const currentIsAscending = headerCell.classList.contains("th-sort-asc");

//         sortTableByColumn(tableElement, headerIndex, !currentIsAscending);
//     });
// });

// // Add event listeners for editing cells
// document.querySelectorAll(".edit-btn").forEach(button => {
//     button.addEventListener("click", () => {
//         const row = button.parentElement.parentElement;
//         const cells = row.querySelectorAll(".editable");
//         cells.forEach(cell => {
//             if (cell.isContentEditable) {
//                 // If the cell is currently editable, make it non-editable and remove the highlight
//                 cell.contentEditable = false;
//                 cell.style.backgroundColor = ""; // Remove background color
//             } else {
//                 // If the cell is currently non-editable, make it editable and add the highlight
//                 cell.contentEditable = true;
//                 cell.style.backgroundColor = "#ffe0e0"; // Highlight editable cells

//                 // Add an event listener for the blur event
//                 cell.addEventListener("blur", () => {
//                     // Check if the cell is empty when it loses focus
//                     if (cell.textContent.trim() === "") {
//                         alert("Bạn chưa thêm đầy đủ thông tin.");
//                     }
//                 });
//             }
//         });
//     });
// });

// // Add event listener for adding new row
// document.getElementById("add-row-form").addEventListener("submit", (event) => {
//     event.preventDefault();

//     const id = document.getElementById("new-id").value;
//     // Other fields...

//     // Check if ID already exists in the table
//     const existingIds = Array.from(document.querySelectorAll(".table-sortable tbody tr td:first-child"), td => td.textContent);
//     if (existingIds.includes(id)) {
//         alert("ID đã tồn tại. Thông tin không hợp lệ.");
//         return;
//     }
//     const name = document.getElementById("new-name").value;
//     // const birthdate = document.getElementById("new-birthdate").value;
//     const address = document.getElementById("new-address").value;
//     const phoneNo = document.getElementById("new-phoneNo").value;
//     const email = document.getElementById("new-email").value;
//     // const occupation = document.getElementById("new-occupation").value;
//     const no_transac = document.getElementById("new-no-transac").value;
//     const total = document.getElementById("new-total").value;

//     // Check if any field is empty
//     if (!id || !name || !address || !phoneNo || !email || !no_transac || !total) {
//         alert("Thông tin chưa được điền đầy đủ. Hãy kiểm tra lại.");
//         return;
//     }

//     const newRow = document.createElement('tr');
//     newRow.innerHTML = `
//         <td class="editable">${id}</td>
//         <td class="editable">${name}</td>
//         <td class="editable">${address}</td>
//         <td class="editable">${phoneNo}</td>
//         <td class="editable">${email}</td>
//         <td class="editable">${no_transac}</td>
//         <td class="editable">${total}</td>
//         <td>
//             <button class="edit-btn"><ion-icon name="create-outline"></ion-icon></button>
//             <button class="delete-btn"><ion-icon name="trash-outline"></ion-icon></button>
//         </td>
//     `;
//     document.querySelectorAll(".edit-btn").forEach(button => {
//         button.addEventListener("click", () => {
//             const row = button.parentElement.parentElement;
//             const cells = row.querySelectorAll(".editable");
//             let allCellsFilled = true;
//             cells.forEach(cell => {
//                 if (cell.isContentEditable) {
//                     // If the cell is currently editable, check if it's empty
//                     if (cell.textContent.trim() === "") {
//                         allCellsFilled = false;
//                     }

//                     // Make it non-editable and remove the highlight
//                     cell.contentEditable = false;
//                     cell.style.backgroundColor = ""; // Remove background color
//                 } else {
//                     // If the cell is currently non-editable, make it editable and add the highlight
//                     cell.contentEditable = true;
//                     cell.style.backgroundColor = "#ffe0e0"; // Highlight editable cells
//                 }
//             });

//             // If not all cells are filled, show an alert
//             if (!allCellsFilled) {
//                 alert("Bạn chưa thêm đầy đủ thông tin.");
//             }
//         });
//     });

//     document.querySelector(".table-sortable tbody").appendChild(newRow);

//     // Add event listeners to the new buttons
//     newRow.querySelector(".edit-btn").addEventListener("click", () => {
//         const row = newRow;
//         const cells = row.querySelectorAll(".editable");
//         cells.forEach(cell => {
//             cell.contentEditable = true;
//             cell.style.backgroundColor = "#ddd"; // Highlight editable cells
//         });
//     });

//     newRow.querySelector(".delete-btn").addEventListener("click", (event) => {
//         // Prevent default action of button click
//         event.preventDefault();

//         // Show confirmation dialog
//         const confirmed = confirm("Bạn có chắc chắn muốn xóa dòng này không?");
//         if (confirmed) {
//             const row = newRow;
//             row.parentNode.removeChild(row);
//         }
//     });
// });

// // Add event listener for deleting rows within the table body
// document.querySelector(".table-sortable tbody").addEventListener("click", (event) => {
//     const target = event.target;
//     if (target.closest(".delete-btn")) {
//         // Prevent default action of button click
//         event.preventDefault();

//         // Show confirmation dialog
//         const confirmed = confirm("Bạn có chắc chắn muốn xóa dòng này không?");
//         if (confirmed) {
//             const row = target.closest("tr");
//             row.parentNode.removeChild(row);
//         }
//     }
// });

// // Add this to your JavaScript
// document.getElementById("id-search").addEventListener("keyup", function() {
//     const searchValue = this.value.toLowerCase();
//     const rows = document.querySelectorAll(".table-sortable tbody tr");
//     rows.forEach(row => {
//         const idCell = row.querySelector("td:first-child");
//         const idText = idCell.textContent.toLowerCase();
//         row.style.display = idText.includes(searchValue) ? "" : "none";
//     });
// });