// app.js
document.getElementById('usernameForm').addEventListener('submit', function(e) {
    e.preventDefault();
    let username = document.getElementById('username').value.trim();
    if (username === "") {
        document.getElementById('errorMessage').style.display = 'block';
    } else {
        // Kullanıcı adını localStorage'a kaydet ve oyun sayfasına yönlendir
        localStorage.setItem('username', username);
        window.location.href = "game.html";  // Oyun sayfasına yönlendirme
    }
});
