/**

// Function to sort table by column
function sortTableByColumn(table, column, asc = true) {
    const dirModifier = asc ? 1 : -1;
    const tBody = table.tBodies[0];
    const rows = Array.from(tBody.querySelectorAll("tr"));

    // Sort each row
    const sortedRows = rows.sort((a, b) => {
        let aColText = a.querySelector(`td:nth-child(${column + 1})`).textContent.trim();
        let bColText = b.querySelector(`td:nth-child(${column + 1})`).textContent.trim();

        // Convert to number if possible
        if (!isNaN(aColText)) {
            aColText = Number(aColText);
            bColText = Number(bColText);
        }

        return aColText > bColText ? (1 * dirModifier) : (-1 * dirModifier);
    });

    // Remove all existing TRs from the table
    while (tBody.firstChild) {
        tBody.removeChild(tBody.firstChild);
    }

    // Re-add the newly sorted rows
    tBody.append(...sortedRows);

    // Remember how the column is currently sorted
    table.querySelectorAll("th").forEach(th => th.classList.remove("th-sort-asc", "th-sort-desc"));
    table.querySelector(`th:nth-child(${column + 1})`).classList.toggle("th-sort-asc", asc);
    table.querySelector(`th:nth-child(${column + 1})`).classList.toggle("th-sort-desc", !asc);
}

// Add event listeners for sorting
document.querySelectorAll(".table-sortable th").forEach(headerCell => {
    headerCell.addEventListener("click", () => {
        const tableElement = headerCell.parentElement.parentElement.parentElement;
        const headerIndex = Array.prototype.indexOf.call(headerCell.parentElement.children, headerCell);
        const currentIsAscending = headerCell.classList.contains("th-sort-asc");

        sortTableByColumn(tableElement, headerIndex, !currentIsAscending);
    });
});

// Add event listeners for editing cells
document.querySelectorAll(".edit-btn").forEach(button => {
    button.addEventListener("click", () => {
        const row = button.parentElement.parentElement;
        const cells = row.querySelectorAll(".editable");
        cells.forEach(cell => {
            if (cell.isContentEditable) {
                // If the cell is currently editable, make it non-editable and remove the highlight
                cell.contentEditable = false;
                cell.style.backgroundColor = ""; // Remove background color
            } else {
                // If the cell is currently non-editable, make it editable and add the highlight
                cell.contentEditable = true;
                cell.style.backgroundColor = "#ffe0e0"; // Highlight editable cells

                // Add an event listener for the blur event
                cell.addEventListener("blur", () => {
                    // Check if the cell is empty when it loses focus
                    if (cell.textContent.trim() === "") {
                        alert("Bạn chưa thêm đầy đủ thông tin.");
                    }
                });
            }
        });
    });
});

// Add event listener for adding new row
document.getElementById("add-row-form").addEventListener("submit", (event) => {
    event.preventDefault();

    const id = document.getElementById("new-id").value;
    // Other fields...

    // Check if ID already exists in the table
    const existingIds = Array.from(document.querySelectorAll(".table-sortable tbody tr td:first-child"), td => td.textContent);
    if (existingIds.includes(id)) {
        alert("ID đã tồn tại. Thông tin không hợp lệ.");
        return;
    }
    const name = document.getElementById("new-name").value;
    // const birthdate = document.getElementById("new-birthdate").value;
    const address = document.getElementById("new-address").value;
    const phoneNo = document.getElementById("new-phoneNo").value;
    const email = document.getElementById("new-email").value;
    // const occupation = document.getElementById("new-occupation").value;
    const no_transac = document.getElementById("new-no-transac").value;
    const total = document.getElementById("new-total").value;

    // Check if any field is empty
    if (!id || !name || !address || !phoneNo || !email || !no_transac || !total) {
        alert("Thông tin chưa được điền đầy đủ. Hãy kiểm tra lại.");
        return;
    }

    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td class="editable">${id}</td>
        <td class="editable">${name}</td>
        <td class="editable">${address}</td>
        <td class="editable">${phoneNo}</td>
        <td class="editable">${email}</td>
        <td class="editable">${no_transac}</td>
        <td class="editable">${total}</td>
        <td>
            <button class="edit-btn"><ion-icon name="create-outline"></ion-icon></button>
            <button class="delete-btn"><ion-icon name="trash-outline"></ion-icon></button>
        </td>
    `;
    document.querySelectorAll(".edit-btn").forEach(button => {
        button.addEventListener("click", () => {
            const row = button.parentElement.parentElement;
            const cells = row.querySelectorAll(".editable");
            let allCellsFilled = true;
            cells.forEach(cell => {
                if (cell.isContentEditable) {
                    // If the cell is currently editable, check if it's empty
                    if (cell.textContent.trim() === "") {
                        allCellsFilled = false;
                    }

                    // Make it non-editable and remove the highlight
                    cell.contentEditable = false;
                    cell.style.backgroundColor = ""; // Remove background color
                } else {
                    // If the cell is currently non-editable, make it editable and add the highlight
                    cell.contentEditable = true;
                    cell.style.backgroundColor = "#ffe0e0"; // Highlight editable cells
                }
            });

            // If not all cells are filled, show an alert
            if (!allCellsFilled) {
                alert("Bạn chưa thêm đầy đủ thông tin.");
            }
        });
    });

    document.querySelector(".table-sortable tbody").appendChild(newRow);

    // Add event listeners to the new buttons
    newRow.querySelector(".edit-btn").addEventListener("click", () => {
        const row = newRow;
        const cells = row.querySelectorAll(".editable");
        cells.forEach(cell => {
            cell.contentEditable = true;
            cell.style.backgroundColor = "#ddd"; // Highlight editable cells
        });
    });

    newRow.querySelector(".delete-btn").addEventListener("click", (event) => {
        // Prevent default action of button click
        event.preventDefault();

        // Show confirmation dialog
        const confirmed = confirm("Bạn có chắc chắn muốn xóa dòng này không?");
        if (confirmed) {
            const row = newRow;
            row.parentNode.removeChild(row);
        }
    });
});

// Add event listener for deleting rows within the table body
document.querySelector(".table-sortable tbody").addEventListener("click", (event) => {
    const target = event.target;
    if (target.closest(".delete-btn")) {
        // Prevent default action of button click
        event.preventDefault();

        // Show confirmation dialog
        const confirmed = confirm("Bạn có chắc chắn muốn xóa dòng này không?");
        if (confirmed) {
            const row = target.closest("tr");
            row.parentNode.removeChild(row);
        }
    }
});

// Add this to your JavaScript
document.getElementById("id-search").addEventListener("keyup", function() {
    const searchValue = this.value.toLowerCase();
    const rows = document.querySelectorAll(".table-sortable tbody tr");
    rows.forEach(row => {
        const idCell = row.querySelector("td:first-child");
        const idText = idCell.textContent.toLowerCase();
        row.style.display = idText.includes(searchValue) ? "" : "none";
    });
});

*/

// quanlyttkh/quanlyttkh.js

// Function to sort table by column
function sortTableByColumn(table, column, asc = true) {
    const dirModifier = asc ? 1 : -1;
    const tBody = table.tBodies[0];
    const rows = Array.from(tBody.querySelectorAll("tr"));

    // Sort each row
    const sortedRows = rows.sort((a, b) => {
        let aColText = a.querySelector(`td:nth-child(${column + 1})`).textContent.trim();
        let bColText = b.querySelector(`td:nth-child(${column + 1})`).textContent.trim();

        // Convert to number if possible
        if (!isNaN(aColText)) {
            aColText = Number(aColText);
            bColText = Number(bColText);
        }

        return aColText > bColText ? (1 * dirModifier) : (-1 * dirModifier);
    });

    // Remove all existing TRs from the table
    while (tBody.firstChild) {
        tBody.removeChild(tBody.firstChild);
    }

    // Re-add the newly sorted rows
    tBody.append(...sortedRows);

    // Remember how the column is currently sorted
    table.querySelectorAll("th").forEach(th => th.classList.remove("th-sort-asc", "th-sort-desc"));
    table.querySelector(`th:nth-child(${column + 1})`).classList.toggle("th-sort-asc", asc);
    table.querySelector(`th:nth-child(${column + 1})`).classList.toggle("th-sort-desc", !asc);
}

// Add event listeners for sorting
document.querySelectorAll(".table-sortable th").forEach(headerCell => {
    headerCell.addEventListener("click", () => {
        const tableElement = headerCell.parentElement.parentElement.parentElement;
        const headerIndex = Array.prototype.indexOf.call(headerCell.parentElement.children, headerCell);
        const currentIsAscending = headerCell.classList.contains("th-sort-asc");

        sortTableByColumn(tableElement, headerIndex, !currentIsAscending);
    });
});

// Function to fetch data from the API
async function fetchData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Lỗi khi lấy dữ liệu: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error(error);
        alert('Lỗi khi lấy dữ liệu từ server.');
        return [];
    }
}

// Function to render the customer table
async function renderCustomerTable() {
    const customers = await fetchData('http://localhost:3001/customers'); // Thay đổi URL API nếu cần
    const tbody = document.querySelector(".table-sortable tbody");
    tbody.innerHTML = ''; // Xóa dữ liệu cũ

    customers.forEach(customer => {
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td class="editable">${customer.Citizen_ID}</td>
            <td class="editable">${customer.Customer_Name}</td>
            <td class="editable">${customer.Address}</td>
            <td class="editable">${customer.Phone_No}</td>
            <td class="editable">${customer.Email}</td>
            <td class="editable">${customer.Number_Transaction}</td>
            <td class="action-buttons">
                <button class="edit-btn"><ion-icon name="create-outline"></ion-icon></button>
                <button class="delete-btn"><ion-icon name="trash-outline"></ion-icon></button>
            </td>
        `;
        tbody.appendChild(newRow);

        // Add event listeners for edit and delete buttons
        addEventListenersToButtons(newRow);
    });
}

// Function to add event listeners to edit and delete buttons
function addEventListenersToButtons(row) {
    const editButton = row.querySelector(".edit-btn");
    const deleteButton = row.querySelector(".delete-btn");
    const Citizen_ID = row.querySelector("td:first-child").textContent;

    editButton.addEventListener("click", () => handleEdit(row, Citizen_ID));
    deleteButton.addEventListener("click", () => handleDelete(Citizen_ID));
}

// Function to handle edit button click
async function handleEdit(row, Citizen_ID) {
    const cells = row.querySelectorAll(".editable");
    let allCellsFilled = true;

    cells.forEach(cell => {
        if (cell.isContentEditable) {
            // If the cell is currently editable, check if it's empty
            if (cell.textContent.trim() === "") {
                allCellsFilled = false;
            }

            // Make it non-editable and remove the highlight
            cell.contentEditable = false;
            cell.style.backgroundColor = ""; // Remove background color
        } else {
            // If the cell is currently non-editable, make it editable and add the highlight
            cell.contentEditable = true;
            cell.style.backgroundColor = "#ffe0e0"; // Highlight editable cells
        }
    });

    // If not all cells are filled, show an alert
    if (!allCellsFilled) {
        alert("Bạn chưa thêm đầy đủ thông tin.");
        return;
    }

    // If all cells are filled, update the customer data
    if (allCellsFilled) {
        const updatedCustomerData = {
            Citizen_ID: cells[0].textContent,
            Customer_Name: cells[1].textContent,
            Address: cells[2].textContent,
            Phone_No: cells[3].textContent,
            Email: cells[4].textContent,
            Number_Transaction: parseInt(cells[5].textContent),
        };

        try {
            const response = await fetch(`http://localhost:3001/customers/${Citizen_ID}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedCustomerData)
            });

            if (response.ok) {
                alert('Cập nhật thông tin khách hàng thành công!');
            } else {
                alert('Lỗi khi cập nhật thông tin khách hàng.');
            }
        } catch (error) {
            console.error('Lỗi khi cập nhật thông tin khách hàng:', error);
            alert('Lỗi khi cập nhật thông tin khách hàng.');
        }
    }
}

// Function to handle delete button click
async function handleDelete(Citizen_ID) {
    if (confirm("Bạn có chắc chắn muốn xóa khách hàng này không?")) {
        try {
            const response = await fetch(`http://localhost:3001/customers/${Citizen_ID}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                alert('Xóa khách hàng thành công!');
                renderCustomerTable(); // Cập nhật lại bảng sau khi xóa
            } else {
                alert('Lỗi khi xóa khách hàng.');
            }
        } catch (error) {
            console.error('Lỗi khi xóa khách hàng:', error);
            alert('Lỗi khi xóa khách hàng.');
        }
    }
}

// Add event listener for adding new row
document.getElementById("add-row-form").addEventListener("submit", async (event) => {
    event.preventDefault();

    // Lấy dữ liệu từ form
    const newCustomerData = {
        Citizen_ID: document.getElementById("new-id").value,
        Customer_Name: document.getElementById("new-name").value,
        Address: document.getElementById("new-address").value,
        Phone_No: document.getElementById("new-phoneNo").value,
        Email: document.getElementById("new-email").value,
        Number_Transaction: parseInt(document.getElementById("new-no-transac").value) || 0,
    };

    // Kiểm tra dữ liệu (bổ sung kiểm tra Citizen_ID)
    if (Object.values(newCustomerData).some(value => !value)) {
        alert("Vui lòng điền đầy đủ thông tin");
        return;
    }

    try {
        // Gửi request POST đến API để tạo khách hàng mới
        const response = await fetch('http://localhost:3001/customers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newCustomerData)
        });

        if (response.ok) {
            alert('Thêm khách hàng thành công!');
            renderCustomerTable(); // Cập nhật lại bảng sau khi thêm
            event.target.reset(); // Reset form sau khi thêm thành công
        } else {
            alert('Lỗi khi thêm khách hàng.');
        }
    } catch (error) {
        console.error('Lỗi khi thêm khách hàng:', error);
        alert('Lỗi khi thêm khách hàng.');
    }
});

// Add event listener for searching by ID
document.getElementById("id-search").addEventListener("keyup", () => {
    const searchValue = document.getElementById("id-search").value.toLowerCase();
    const rows = document.querySelectorAll(".table-sortable tbody tr");
    rows.forEach(row => {
        const idCell = row.querySelector("td:first-child");
        const idText = idCell.textContent.toLowerCase();
        row.style.display = idText.includes(searchValue) ? "" : "none";
    });
});

// Initial render
renderCustomerTable();