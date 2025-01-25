document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const aadhar = document.getElementById('aadhar').value;
    const phone = document.getElementById('phone').value;
    const otp = document.getElementById('otp').value;

    if (aadhar==521769012867 && phone==7306922451 && otp==123456) {
        window.location.href = 'index1.html';
    } else {
        alert('Incorrect credintials!');
    }
});
