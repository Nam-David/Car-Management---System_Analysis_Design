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