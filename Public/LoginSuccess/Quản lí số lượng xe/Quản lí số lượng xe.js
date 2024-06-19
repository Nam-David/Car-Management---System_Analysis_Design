// Quản lí số lượng xe.js

// Hàm để kích hoạt chế độ chỉnh sửa
function editRow(button) {
    let row = button.parentNode.parentNode;
    let cells = row.querySelectorAll('.editable');

    cells.forEach(cell => {
        let input = document.createElement('input');
        input.type = 'text';
        input.value = cell.textContent;
        cell.textContent = '';
        cell.appendChild(input);
    });

    button.innerHTML = '<ion-icon name="save-outline"></ion-icon>';
    button.setAttribute('onclick', 'saveRow(this)');
}

// Hàm để lưu dữ liệu sau khi chỉnh sửa
function saveRow(button) {
    let row = button.parentNode.parentNode;
    let cells = row.querySelectorAll('.editable');

    cells.forEach(cell => {
        let input = cell.querySelector('input');
        cell.textContent = input.value;
    });

    button.innerHTML = '<ion-icon name="create-outline"></ion-icon>';
    button.setAttribute('onclick', 'editRow(this)');
}

// Hàm để xóa một hàng
function deleteRow(button) {
    let row = button.parentNode.parentNode;
    row.parentNode.removeChild(row);
}

// Hàm để tìm kiếm theo mã xe
function searchById() {
    let input = document.getElementById('id-search').value.toUpperCase();
    let table = document.querySelector('table tbody');
    let rows = table.getElementsByTagName('tr');

    for (let i = 0; i < rows.length; i++) {
        let cells = rows[i].getElementsByTagName('td');
        let idCell = cells[0];

        if (idCell) {
            let idText = idCell.textContent || idCell.innerText;

            if (idText.toUpperCase().indexOf(input) > -1) {
                rows[i].style.display = '';
            } else {
                rows[i].style.display = 'none';
            }
        }
    }
}

// Thêm sự kiện lắng nghe cho nút tìm kiếm
document.getElementById('id-search').addEventListener('keyup', searchById);

// Thêm sự kiện lắng nghe cho các nút chỉnh sửa và xóa
document.querySelectorAll('.edit-btn').forEach(button => {
    button.addEventListener('click', function() {
        editRow(this);
    });
});

document.querySelectorAll('.delete-btn').forEach(button => {
    button.addEventListener('click', function() {
        deleteRow(this);
    });
});
