document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // In a real application, you would send these details to the server for verification
    console.log('Tên đăng nhập:', username);
    console.log('Mật khẩu:', password);

    // Here, we'll just show an alert for demonstration purposes
    alert('Đăng nhập thành công!');
});
