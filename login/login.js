document.getElementById('backgroundMusic').play(); // Start playing background music
document.getElementById('backgroundMusic').volume = 1;
 
 

document.getElementById("submit").addEventListener("click", function () {
    // Get values from the form
    const username = document.getElementById("username").value;
    const nickname = document.getElementById("nickname").value;
  
    // Save the nickname to localStorage
    localStorage.setItem("nickname", nickname);
  
    // Optionally, you can also save other user-related data if needed
    localStorage.setItem("username", username);
  
    // Continue with your application logic...
    if (username && nickname) {
        window.location.href = "./HomePage/Homepage.html";
    }else {
                alert('Please fill in both fields');
             }
    
  });
  
