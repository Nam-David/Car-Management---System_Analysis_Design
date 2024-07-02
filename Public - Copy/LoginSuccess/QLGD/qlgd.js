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
        const tableElement = headerCell.closest(".table-sortable");
        const headerIndex = Array.prototype.indexOf.call(headerCell.parentElement.children, headerCell);
        const currentIsAscending = headerCell.classList.contains("th-sort-asc");

        sortTableByColumn(tableElement, headerIndex, !currentIsAscending);
    });
});

// Add event listeners for editing cells
document.querySelectorAll(".edit-btn").forEach(button => {
    button.addEventListener("click", () => {
        const row = button.closest("tr");
        const cells = row.querySelectorAll(".editable");
        cells.forEach(cell => {
            if (cell.isContentEditable) {
                cell.contentEditable = false;
                cell.style.backgroundColor = ""; // Remove background color
            } else {
                cell.contentEditable = true;
                cell.style.backgroundColor = "#ffe0e0"; // Highlight editable cells

                // Add an event listener for the blur event
                cell.addEventListener("blur", () => {
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

    const transactionId = document.getElementById("new-Transaction_Id").value;
    const citizenId = document.getElementById("new-Citizen_Id").value;
    const modalCarId = document.getElementById("new-Modal_Car_Id").value;
    const transactionDate = document.getElementById("new-Transaction_Date").value;
    const paymentDate = document.getElementById("new-Payment_Date").value;
    const warrantyDate = document.getElementById("new-Warrnty_Valid_Date").value;
    const status = document.getElementById("new-Status_Of_Purchasing").value;

    const existingIds = Array.from(document.querySelectorAll(".table tbody tr td:first-child"), td => td.textContent);
    if (existingIds.includes(transactionId)) {
        alert("Mã giao dịch đã tồn tại. Thông tin không hợp lệ.");
        return;
    }

    if (!transactionId || !citizenId || !modalCarId || !transactionDate || !paymentDate || !warrantyDate || !status) {
        alert("Thông tin chưa được điền đầy đủ. Hãy kiểm tra lại.");
        return;
    }

    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td class="editable">${transactionId}</td>
        <td class="editable">${citizenId}</td>
        <td class="editable">${modalCarId}</td>
        <td class="editable">${transactionDate}</td>
        <td class="editable">${paymentDate}</td>
        <td class="editable">${warrantyDate}</td>
        <td class="editable">${status}</td>
        <td>
            <button class="edit-btn"><ion-icon name="create-outline"></ion-icon></button>
            <button class="delete-btn"><ion-icon name="trash-outline"></ion-icon></button>
        </td>
    `;

    document.querySelector(".table tbody").appendChild(newRow);

    // Add event listeners to the new buttons
    newRow.querySelector(".edit-btn").addEventListener("click", () => {
        const row = newRow;
        const cells = row.querySelectorAll(".editable");
        cells.forEach(cell => {
            if (cell.isContentEditable) {
                if (cell.textContent.trim() === "") {
                    alert("Bạn chưa thêm đầy đủ thông tin.");
                }
                cell.contentEditable = false;
                cell.style.backgroundColor = ""; // Remove background color
            } else {
                cell.contentEditable = true;
                cell.style.backgroundColor = "#ffe0e0"; // Highlight editable cells
            }
        });
    });

    newRow.querySelector(".delete-btn").addEventListener("click", (event) => {
        event.preventDefault();
        const confirmed = confirm("Bạn có chắc chắn muốn xóa dòng này không?");
        if (confirmed) {
            newRow.remove();
        }
    });
});

// Add event listener for deleting rows within the table body
document.querySelector(".table tbody").addEventListener("click", (event) => {
    const target = event.target;
    if (target.closest(".delete-btn")) {
        event.preventDefault();
        const confirmed = confirm("Bạn có chắc chắn muốn xóa dòng này không?");
        if (confirmed) {
            const row = target.closest("tr");
            row.remove();
        }
    }
});

// Search by Citizen ID
document.getElementById("id-search").addEventListener("keyup", function() {
    const searchValue = this.value.toLowerCase();
    const rows = document.querySelectorAll(".table tbody tr");
    rows.forEach(row => {
        const idCell = row.querySelector("td:nth-child(2)");
        const idText = idCell.textContent.toLowerCase();
        row.style.display = idText.includes(searchValue) ? "" : "none";
    });
});
