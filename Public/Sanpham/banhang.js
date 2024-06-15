// script.js

const cars = [
    { name: "VinFast Wild", image: "/Public/Images/car-pics/vfwild.jpg", specs: ["Việt Nam", "2024"], value: "$500 000" },
    { name: "VinFast VF 3", image: "/Public/Images/vf3.jpg", specs: ["Spec 1", "Spec 2", "Spec 3"] },
    { name: "Vinfast VF 7", image: "/Public/Images/vf7.png", specs: ["Spec 1", "Spec 2", "Spec 3"] },
    { name: "Vinfast VF 3", image: "/Public/Images/vf3.jpg", specs: ["Spec 1", "Spec 2", "Spec 3"] },
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
                    ${car.specs.map(spec => `<li>${spec}</li>`).join('')}
                </ul>
                <h3>
                    ${car.value}
                </h3>
                <button>Chi tiết</button>
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
  if (slideIndex > slides.length) {slideIndex = 1}    
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