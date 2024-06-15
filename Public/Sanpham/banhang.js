// script.js

const cars = [
    { name: "VinFast Wild", image: "/Public/Images/vfwild.jpg", origin: "Việt Nam", year: "2024", hw: "664HP", value: "$50 000", link: "/Public/Desposit/Deposit_VFwild.html" },
    { name: "VinFast VF 9", image: "/Public/Images/car-pics/vf9/vf9r.png", origin: "Việt Nam", year: "2024", hw: "402HP", value: "$81 000", link: "/Public/Desposit/Deposit_VF9.html" },
    { name: "Vinfast VF 8", image: "/Public/Images/car-pics/vf8/vf8wh.png", origin: "Việt Nam", year: "2024", hw: "402HP", value: "$47 200", link: "/Public/Desposit/Deposit_VF8.html" },
    { name: "Vinfast VF 7", image: "/Public/Images/car-pics/vf7/vf7b.png", origin: "Việt Nam", year: "2024", hw: "349HP", value: "$37 000", link: "/Public/Desposit/Deposit_VF7.html" },
    { name: "VinFast VF 6", image: "/Public/Images/car-pics/vf6/vf6r.png", origin: "Việt Nam", year: "2024", hw: "201HP", value: "$35 000", link: "/Public/Desposit/Deposit_VF6.html" },
    { name: "VinFast VF 5", image: "/Public/Images/car-pics/vf5/vf5bl.png", origin: "Việt Nam", year: "2024", hw: "134HP", value: "$30 000", link: "/Public/Desposit/Deposit_VF5.html" },
    { name: "VinFast VF 3", image: "/Public/Images/car-pics/vf3/vf3yl.png", origin: "Việt Nam", year: "2024", hw: "43HP", value: "$16 000", link: "/Public/Desposit/Deposit_VF3.html" },
    { name: "VinFast VF e34", image: "/Public/Images/car-pics/vfe34/vfe34b.png", origin: "Việt Nam", year: "2024", hw: "147HP", value: "$26 000", link: "/Public/Desposit/Deposit_VFe34.html" },
    // Thêm dữ liệu xe khác tại đây
];

const carsPerPage = 3;
let currentPage = 1;

function renderCars() {
    const carContainer = document.getElementById("car-container");
    carContainer.innerHTML = "";

    const startIndex = (currentPage - 1) * carsPerPage;
    const endIndex = Math.min(startIndex + carsPerPage, cars.length);
    const carsToShow = cars.slice(startIndex, endIndex);

    carsToShow.forEach(car => {
        const carElement = document.createElement("div");
        carElement.className = "car";
        carElement.innerHTML = `
            <div class="image-container">
                <img src="${car.image}" alt="${car.name}">
            </div>
            <div class="info-container">
                <h2>${car.name}</h2>
                <ul>
                    <li>Xuất xứ: ${car.origin}</li>
                </ul>
                <ul>
                    <li>Năm sản xuất: ${car.year}</li>
                </ul>
                <ul>
                    <li>${car.hw}</li>
                </ul>
                <h3>
                    ${car.value}
                </h3>
                <button onclick = "location.href = '${car.link}'">Chi tiết</button>
            </div>
        `;
        carContainer.appendChild(carElement);
    });
}

function renderPagination() {
    const paginationContainer = document.getElementById("pagination");
    paginationContainer.innerHTML = ""; // Xóa nội dung cũ

    const totalPages = Math.ceil(cars.length / carsPerPage);

    const prevButton = document.createElement("button");
    prevButton.textContent = "<";
    prevButton.addEventListener("click", () => {
        if (currentPage > 1) {
            currentPage--;
            renderCars();
            renderPagination();
        }
    });
    paginationContainer.appendChild(prevButton);

    for (let i = 1; i <= totalPages; i++) {
        const button = document.createElement("button");
        button.textContent = i;
        button.classList.toggle("active", i === currentPage);
        button.addEventListener("click", () => {
            currentPage = i;
            renderCars();
            renderPagination();
        });
        paginationContainer.appendChild(button);
    }

    const nextButton = document.createElement("button");
    nextButton.textContent = ">";
    nextButton.addEventListener("click", () => {
        if (currentPage < totalPages) {
            currentPage++;
            renderCars();
            renderPagination();
        }
    });
    paginationContainer.appendChild(nextButton);
}

function addCar(newCar) {
    cars.push(newCar);
    renderCars();
    renderPagination();
}

// Initial render
renderCars();
renderPagination();


//ad
var slideIndex = 0;
var autoSlideInterval;
var manualChange = false;

showSlides();

// Hàm này sẽ tự động thay đổi slide
function showSlides() {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    var dots = document.getElementsByClassName("dot");

    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > slides.length) { slideIndex = 1 }
    slides[slideIndex - 1].style.display = "block";

    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    dots[slideIndex - 1].className += " active";

    if (!manualChange) {
        autoSlideInterval = setTimeout(showSlides, 3000); // Thay đổi hình ảnh sau mỗi 3 giây
    } else {
        manualChange = false; // Reset lại trạng thái sau một lần dừng tự động chuyển
    }
}

// Hàm để điều khiển thủ công chuyển slide
function plusSlides(n) {
    clearTimeout(autoSlideInterval); // Dừng tự động chuyển
    manualChange = true; // Đặt cờ để chỉ ra người dùng đã thực hiện thay đổi thủ công
    slideIndex += n;

    var totalSlides = document.getElementsByClassName("mySlides").length;

    // Nếu slideIndex vượt quá hình cuối cùng, đặt slideIndex là 1
    if (slideIndex > totalSlides) {
        slideIndex = 1;
    }
    // Nếu slideIndex nhỏ hơn 1, đặt slideIndex là hình cuối cùng
    else if (slideIndex < 1) {
        slideIndex = totalSlides;
    }

    showSlides();
}

// Hàm để hiển thị slide cụ thể
function currentSlide(n) {
    clearTimeout(autoSlideInterval); // Dừng tự động chuyển
    manualChange = true; // Đặt cờ để chỉ ra người dùng đã thực hiện thay đổi thủ công
    slideIndex = n;
    showSlides();
}