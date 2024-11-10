let score = document.querySelector(".score")
let startScreen = document.querySelector(".startScreen")
let gameArea = document.querySelector(".gameArea")

let player = {
    start: false,
    speed: 5,
    x: 0,
    y: 0,
    score: 0
}

const keys = {
    ArrowUp: false,
    ArrowRight: false,
    ArrowLeft: false,
    ArrowDown: false
}

let heightOfRoad;

startScreen.addEventListener("click", start)
document.addEventListener("keydown", keyPressed)
document.addEventListener("keyup", keyReleased)

startScreen.innerText = `click here to start the game`

function gamePlay() {
    let car = document.querySelector(".car");
    let road = gameArea.getBoundingClientRect();
    heightOfRoad = road.height;

    moveLines();
    moveEnemies();

    if (player.start) {
        if (keys.ArrowUp && player.y > 0) {
            player.y -= player.speed;
        }
        if (keys.ArrowDown && player.y < road.height - car.offsetHeight) {
            player.y += player.speed;
        }
        if (keys.ArrowLeft && player.x > 0) {
            player.x -= player.speed;
        }
        if (keys.ArrowRight && player.x < road.width - car.offsetWidth) {
            player.x += player.speed;
        }

        car.style.left = player.x + 'px';
        car.style.top = player.y + 'px';

        player.score++;
score.innerText = `Score: ${player.score}`;


        let enemies = document.querySelectorAll(".enemy");
        for (let enemy of enemies) {
            if (isCollide(car, enemy)) {
                player.start = false;
                endGame();
                return; 
            }
        }

        requestAnimationFrame(gamePlay);
    }
}

function isCollide(a, b) {
    let aRect = a.getBoundingClientRect();
    let bRect = b.getBoundingClientRect();

    return !(
        aRect.bottom < bRect.top || 
        aRect.top > bRect.bottom || 
        aRect.right < bRect.left || 
        aRect.left > bRect.right
    );
}

function moveLines() {
    let lines = document.querySelectorAll(".line");
    for (let line of lines) {
        if (line.y >= heightOfRoad) {
            line.y -= heightOfRoad;
        }
        line.y += player.speed;
        line.style.top = line.y + "px";
    }
}

function moveEnemies() {
    let enemies = document.querySelectorAll(".enemy");
    for (let enemy of enemies) {
        if (enemy.y >= heightOfRoad) {
            enemy.y = -200;
            enemy.style.left = Math.floor(Math.random() * (gameArea.offsetWidth - enemy.offsetWidth)) + "px";
        }
        enemy.y += player.speed;
        enemy.style.top = enemy.y + "px";
    }
}

function keyPressed(event) {
    keys[event.key] = true;
}

function keyReleased(event) {
    keys[event.key] = false;
}

function start() {
    startScreen.classList.add('hide');
    gameArea.classList.remove('hide');
    

    player.start = true;
    player.x = 0;
    player.y = 0;
    requestAnimationFrame(gamePlay);

    for (let i = 0; i < 5; i++) {
        let div = document.createElement('div');
        div.className = "line";
        div.y = i * 150;
        div.style.top = div.y + "px";
        gameArea.append(div);
    }

    for (let i = 0; i < 3; i++) {
        let enemy = document.createElement('div');
        enemy.className = 'enemy';
        enemy.y = ((i + 1) * 600) * -1;
        enemy.style.top = enemy.y + "px";
        enemy.style.left = Math.floor(Math.random() * (gameArea.offsetWidth - 50)) + "px";
        enemy.style.backgroundColor = "red";
        enemy.style.width = "50px";
        enemy.style.height = "100px";
        gameArea.append(enemy);
    }

    let car = document.createElement("div");
    car.className = "car";
    car.innerText = "car";
    gameArea.append(car);

    player.x = car.offsetLeft;
    player.y = car.offsetTop;

    
    function endGame() {  
        startScreen.classList.remove('hide');
        startScreen.innerText = `Game Over\nScore: ${player.score}`;
    }
}
