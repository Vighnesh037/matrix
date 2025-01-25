document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const aadhar = document.getElementById('aadhar').value;
    const phone = document.getElementById('phone').value;
    const otp = document.getElementById('otp').value;

    if (aadhar && phone && otp) {
        window.location.href = 'index1.html';
    } else {
        alert('Please fill all fields!');
    }
});