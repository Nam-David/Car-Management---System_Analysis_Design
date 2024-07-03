


  // Call the function after the DOM is loaded (ensure this script runs after the button is loaded):
//window.addEventListener("DOMContentLoaded", extractId);
 

function postDatabase() {
    let Customer_Name = document.getElementById("CustomerName").value;
    let Citizen_ID = document.getElementById("IdentityCard").value;
    let Phone_No = document.getElementById("NumberPhone").value;
    let Email = document.getElementById("Email").value;
    let Address = document.getElementById("Address").value;
    let Model_Car_ID = document.getElementById("model_car_id").value;
    // console.log(Customer_Name)
    // console.log(Citizen_ID)
    // console.log(Phone_No)
    // console.log(Email)
    // console.log(Address)
    // console.log(Model_Car_ID )

    fetch('http://localhost:8989/fillCustomerInfo', {
            method: 'post',

            headers: {
                "Content-type": "application/json; charset=UTF-8"
                },
            body: JSON.stringify({
                //username and password are parameters, which declared above
                Customer_Name: Customer_Name,
                Citizen_ID: Citizen_ID,
                Phone_No: Phone_No,
                Email: Email,
                Address: Address,
                Model_Car_ID: Model_Car_ID
                
            })
        })  
        .then(res => res.json()) //parse data send from BE to JSON format - the line that receives the data (JSON object) 
        .then(loginRespond => {

z        });  
        // loginRespond -> data after being parsed by JSON 
  
}


// function extractId() {
//     const buttonElement = document.querySelector("button[type='submit']"); // Assuming there's only one submit button
//     if (buttonElement) {
//       const id = buttonElement.id;
//        console.log("Extracted ID:", id); // Process or store the ID as 

//       return id;

//       // You can also perform actions based on the ID here
//     } else {
//       console.error("Submit button not found.");
//     }
//   }


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