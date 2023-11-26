function rectangularCollision ({ rectangle1,  rectangle2}){
    return (
        rectangle1.attackBox.position.x + rectangle1.attackBox.width>=rectangle2.position.x  && 
        rectangle1.attackBox.position.x <= rectangle2.position.x + rectangle2.width && 
        rectangle1.attackBox.position.y + rectangle1.attackBox.height >= rectangle2.position.y && 
        rectangle1.attackBox.position.y <= rectangle2.position.y + rectangle2.height 
    )
}

function determineWinner({player,enemy,timerId}){

    clearTimeout(timerId)

    document.querySelector(".displayText").style.display = " flex"
    document.querySelector("#myButton").style.display = " flex"
    document.querySelector("#scoreDisplay").style.display = " flex"


    document.getElementById("myButton").addEventListener("click", function () {
        if (enemy.health<=0){
            location.href = "../LechariousLevel/lecharious.html"
        } else {
            document.querySelector("#myButton").innerHTML = "Go Home";
            location.href = "../HomePage/Homepage.html"
        }

    })


    const storedNickname = localStorage.getItem("nickname");

    if (enemy.health<=0){
        document.querySelector("#displayText").innerHTML = `Bravo, ${storedNickname}! You survived The Deadly Vale of Echoes`;
        document.querySelector("#myButton").innerHTML = "Next";
        document.querySelector("#scoreDisplay").innerHTML = "Final Score: " + score;
    }else if (player.health<=0){
        document.querySelector("#displayText").innerHTML = "You failed to avenge your dead Prince! It's all over"
        document.querySelector("#myButton").innerHTML = "Go Home";
        document.querySelector("#scoreDisplay").innerHTML = "Final Score: " + score;

    } else if (timer==0 && enemy.health>0){
        document.querySelector("#displayText").innerHTML = "You failed to avenge your dead Prince! It's all over"
        document.querySelector("#myButton").innerHTML = "Go Home";
        document.querySelector("#scoreDisplay").innerHTML = "Final Score: " + score;

    }
}

let timer = 30;
let timerId;
function decreaseTimer(){
    timerId = setTimeout(decreaseTimer, 1000)
    if (timer>0){
        timer--
        document.querySelector("#timer").innerHTML = timer
    }
    if (timer === 0){
        player.switchSprite('death')
        document.querySelector("#displayText").style.display = " flex"
        determineWinner({player,enemy,timerId})      
    }
}