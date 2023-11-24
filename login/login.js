document.getElementById('backgroundMusic').play(); // Start playing background music
document.getElementById('backgroundMusic').volume = 0.5;
 
 
 document.getElementById('submit').addEventListener('click', function(event) {
    // event.preventDefault(); 
    let username = document.getElementById('username').value;
    let nickname = document.getElementById('nickname').value;
    if (username && nickname) {
        const button = document.getElementById("submit")
        button.onclick=()=>{
            location.href = "../HomePage/Homepage.html"
            }
    } else {
        alert('Please fill in both fields');
    }
});

