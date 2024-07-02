// REST - client server (get -> yeu cau dl server, post -> gui yeu cau len server, update -> yeu cau update len server, delete)

function login() {
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;

    fetch('http://localhost:8989/login', {
        method: 'post',

        headers: {
            "Content-type": "application/json; charset=UTF-8"
            },
        body: JSON.stringify({
            //username and password are parameters, which declared above
            username: username,
            password: password
        })
    })

    .then(res => res.json()) //parse data send from BE to JSON format - the line that receives the data (JSON object) 
    
    // loginRespond -> data after being parsed by JSON 
    .then(loginRespond => {

        console.log(loginRespond);   // test JSON file in console - for debug ONLY !!!
        if (loginRespond.agency_id === username && loginRespond.pass_word === password) {
            
            window.location.href = '../LoginSuccess/Dashboard/Dashboard.html'; // Chuyển hướng nếu đăng nhập thành công
        } 
        else {
            alert("Đăng nhập không thành công, vui lòng kiểm tra lại thông tin đăng nhập của bạn.");
        }
    });
}