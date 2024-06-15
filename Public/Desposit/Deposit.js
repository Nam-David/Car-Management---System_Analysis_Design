document.getElementById('deposit-nav').addEventListener('click', function(event) {
    event.preventDefault();
    var form = document.getElementById('dwfrm_billing');
    if (form.checkValidity()) {
        document.querySelectorAll('.content').forEach(function(content) {
            content.style.display = 'none';
        });
        document.getElementById('content3').style.display = 'block';
    } else {
        form.reportValidity();
    }
});

document.querySelectorAll('.navbar a').forEach(function(link) {
    link.addEventListener('click', function(event) {
        event.preventDefault();
        var targetContent = this.getAttribute('data-content');
        if (targetContent !== 'content3' || document.getElementById('dwfrm_billing').checkValidity()) {
            document.querySelectorAll('.content').forEach(function(content) {
                content.style.display = 'none';
            });
            document.getElementById(targetContent).style.display = 'block';
        }
    });
});

// document.querySelectorAll('.js_numText').forEach(input => {
//     const maxNum = input.nextElementSibling.nextElementSibling.querySelector('.max_num').textContent;
//     input.addEventListener('input', function() {
//         const currentNum = input.value.length;
//         input.nextElementSibling.nextElementSibling.querySelector('.num').textContent = currentNum;
//     });
// });

document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.navbar a');
    const contents = document.querySelectorAll('.content');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetContent = document.querySelector(this.getAttribute('data-content'));

            contents.forEach(content => {
                content.classList.remove('active');
                content.style.display = 'none';
            });

            targetContent.classList.add('active');
            targetContent.style.display = 'block';
        });
    });

    // Trigger the first tab by default
    navLinks[0].click();
});

document.addEventListener("DOMContentLoaded", function() {
    const navLinks = document.querySelectorAll('.navbar a');
    const contents = document.querySelectorAll('.content');
    const radioButtons = document.querySelectorAll('.radio-button');
    const nextStep1Button = document.getElementById('next-step-1');
    const nextStep2Button = document.getElementById('next-step-2');
    const submitDepositButton = document.getElementById('submit-deposit');

    let step1Complete = false;
    let step2Complete = false;

    function showContent(contentId) {
        contents.forEach(content => {
            if (content.id === contentId) {
                content.style.display = 'block';
            } else {
                content.style.display = 'none';
            }
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const contentId = this.getAttribute('data-content');

            if (contentId === 'content2' && !step1Complete) {
                document.getElementById('step1-warning').style.display = 'block';
            } else if (contentId === 'content3' && !step2Complete) {
                document.getElementById('step2-warning').style.display = 'block';
            } else {
                document.getElementById('step1-warning').style.display = 'none';
                document.getElementById('step2-warning').style.display = 'none';
                showContent(contentId);
            }
        });
    });

    radioButtons.forEach(radio => {
        radio.addEventListener('change', function() {
            if (this.checked) {
                nextStep1Button.disabled = false;
                step1Complete = true;
            }
        });
    });

    nextStep1Button.addEventListener('click', function() {
        showContent('content2');
    });

    nextStep2Button.addEventListener('click', function(e) {
        e.preventDefault();
        const requiredFields = document.querySelectorAll('#content2 input[required]');

        let allFieldsValid = true;
        requiredFields.forEach(field => {
            if (!field.value) {
                allFieldsValid = false;
                field.nextElementSibling.innerText = field.dataset.missingError;
            } else if (!field.checkValidity()) {
                allFieldsValid = false;
                field.nextElementSibling.innerText = field.dataset.parseError;
            } else {
                field.nextElementSibling.innerText = '';
            }
        });

        if (allFieldsValid) {
            step2Complete = true;
            showContent('content3');
        } else {
            step2Complete = false;
        }
    });

    submitDepositButton.addEventListener('click', function(e) {
        e.preventDefault();
        if (step2Complete) {
            // Add your deposit submission logic here
            alert('Đặt cọc thành công!');
        } else {
            alert('Vui lòng hoàn thiện các bước trước khi đặt cọc.');
        }
    });
});

// Xử lý sự kiện khi click vào từng tab trong navbar
// document.querySelectorAll('.navbar a').forEach(function(link) {
//     link.addEventListener('click', function(event) {
//         event.preventDefault();

//         // Lấy target content từ data-content của link được click
//         var targetContent = this.getAttribute('data-content');

//         // Kiểm tra điều kiện cho từng trường hợp
//         if (targetContent === 'content2') { // Nếu click vào Nhập thông tin (bước 2)
//             if (document.getElementById('vf3-standard').checked || document.querySelectorAll('.color-swatch input:checked').length > 0) {
//                 // Nếu đã chọn phiên bản và màu sắc, hiển thị content2 (Nhập thông tin)
//                 showContent(targetContent);
//             } else {
//                 // Nếu chưa chọn đủ thông tin, hiển thị cảnh báo
//                 alert("Quý khách chưa hoàn thiện thông tin xe tại bước 1 - Lựa chọn xe, vui lòng quay lại và hoàn thiện thông tin.");
//             }
//         } else if (targetContent === 'content3') { // Nếu click vào Đặt cọc (bước 3)
//             if (validateStepTwo()) {
//                 // Nếu bước 2 (Nhập thông tin) đã hợp lệ, hiển thị content3 (Đặt cọc)
//                 showContent(targetContent);
//             } else {
//                 // Nếu bước 2 (Nhập thông tin) chưa hợp lệ, hiển thị cảnh báo
//                 alert("Quý khách chưa hoàn thiện thông tin Khách hàng tại bước 2 - Nhập thông tin, vui lòng quay lại và hoàn thiện thông tin.");
//             }
//         } else {
//             // Nếu không phải là content2 hoặc content3, hiển thị content tương ứng
//             showContent(targetContent);
//         }
//     });
// });

// // Hàm hiển thị nội dung theo id và ẩn các nội dung khác
// function showContent(id) {
//     document.querySelectorAll('.content').forEach(function(content) {
//         content.style.display = 'none';
//     });
//     document.getElementById(id).style.display = 'block';
// }

// Hàm kiểm tra các trường bắt buộc trong bước 2 (Nhập thông tin)
function validateStepTwo() {
    var lastName = document.getElementsByName('dwfrm_billing_addressFields_lastName')[0].value.trim();
    var companyName = document.getElementsByName('companyName')[0].value.trim();
    var phone = document.getElementsByName('dwfrm_billing_contactInfoFields_phone')[0].value.trim();
    var email = document.getElementsByName('dwfrm_billing_contactInfoFields_email')[0].value.trim();
    var address = document.getElementsByName('dwfrm_billing_addressFields_address')[0].value.trim();

    // Kiểm tra điều kiện
    if (lastName === '' || companyName === '' || phone === '' || email === '' || address === '') {
        return false;
    }
    return true;
}




document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded and parsed');

    const swatches = document.querySelectorAll('.color-swatch');

    function removeSelectedClass() {
        swatches.forEach(swatch => {
            swatch.classList.remove('selected');
        });
    }

    swatches.forEach(swatch => {
        swatch.addEventListener('click', function() {
            console.log('Swatch clicked:', swatch);
            removeSelectedClass();
            this.classList.add('selected');
        });
    });
});



document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.navbar a');
    const contents = document.querySelectorAll('.content');

    function showContent(contentId) {
        contents.forEach(content => {
            content.classList.remove('active');
            content.style.display = 'none';
        });

        document.getElementById(contentId).classList.add('active');
        document.getElementById(contentId).style.display = 'block';
    }

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const contentId = this.getAttribute('data-content');
            showContent(contentId);
        });
    });

    // Trigger the first tab by default
    navLinks[0].click();
});

document.addEventListener('DOMContentLoaded', function() {
    const radioVFStandard = document.getElementById('vf3-standard');
    const colorSwatches = document.querySelectorAll('.color-swatch');
    const nextStep1Button = document.getElementById('next-step-1');

    // Sự kiện khi thay đổi radio button
    radioVFStandard.addEventListener('change', function() {
        checkConditions();
    });

    // Sự kiện khi click vào mẫu màu
    colorSwatches.forEach(swatch => {
        swatch.addEventListener('click', function() {
            // Xóa lớp 'selected' của tất cả các mẫu màu
            colorSwatches.forEach(s => s.classList.remove('selected'));
            // Thêm lớp 'selected' cho mẫu màu được click
            this.classList.add('selected');
            checkConditions();
        });
    });

    // Hàm kiểm tra điều kiện và cập nhật trạng thái của button
    function checkConditions() {
        const radioChecked = radioVFStandard.checked;
        const colorSelected = document.querySelector('.color-swatch.selected') !== null;

        if (radioChecked && colorSelected) {
            nextStep1Button.removeAttribute('disabled');
        } else {
            nextStep1Button.setAttribute('disabled', 'disabled');
        }
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const inputs = document.querySelectorAll('input[required]');
    const nextStep2Button = document.getElementById('next-step-2');

    // Thêm sự kiện input cho các trường nhập liệu bắt buộc
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            checkInputs();
        });
    });

    // Hàm kiểm tra các trường nhập liệu
    function checkInputs() {
        let allValid = true;
        inputs.forEach(input => {
            if (!input.checkValidity()) {
                allValid = false;
            }
        });

        if (allValid) {
            nextStep2Button.removeAttribute('disabled');
        } else {
            nextStep2Button.setAttribute('disabled', 'disabled');
        }
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const agree1Checkbox = document.getElementById('Agree1');
    const agree2Checkbox = document.getElementById('Agree2');
    const agree3Checkbox = document.getElementById('Agree3');
    const submitDepositBtn = document.getElementById('submit-deposit');

    function checkAllCheckboxes() {
        if (agree1Checkbox.checked && agree2Checkbox.checked && agree3Checkbox.checked) {
            submitDepositBtn.removeAttribute('disabled');
        } else {
            submitDepositBtn.setAttribute('disabled', 'disabled');
        }
    }

    agree1Checkbox.addEventListener('change', checkAllCheckboxes);
    agree2Checkbox.addEventListener('change', checkAllCheckboxes);
    agree3Checkbox.addEventListener('change', checkAllCheckboxes);

    // Kiểm tra trạng thái ban đầu
    checkAllCheckboxes();
});