const playGame = document.getElementById("PlayGame")

playGame.onclick = () => {
    location.href = "../level1/level1.html"
}


document.getElementById('backgroundMusic').play(); // Start playing background music
// document.getElementById('backgroundMusic').pause(); // Pause background music
document.getElementById('backgroundMusic').volume = 0.5; // Set background music volume to 50%

// enterButton.onclick = () => {

//     location.href = "index.html"
// }

// document.getElementById('myForm').addEventListener('submit', function(event) {
//     event.preventDefault(); // Prevent form submission
//     var form = document.getElementById('myForm');
    
//     var player = {
//         username: form.elements["username"].value,
//         nickname: form.elements["nickname"].value
//     };
//     location.href = "./index.html"
//     // You can now use the 'player' object in your game logic
//     console.log(player);
// });