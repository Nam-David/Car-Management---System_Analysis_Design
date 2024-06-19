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