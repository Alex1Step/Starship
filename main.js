"use strict";
var RAF=
        window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function(callback) { window.setTimeout(callback, 1000 / 60); };

//ЗВУКИ
// var tankEngine = new Audio("stuff/tankengine.mp3");
// tankEngine.volume = 0.1;

// cx`nxbr - для генерации случайных событий и появлений объектов
var frameN = 0;
//хранение очков
var userPoints = 0;
//количество здоровья
var userHealth = 6;
//уровень игры: лёгкий / средний / тяжелый   -   выставляет начальное количество жизней у врагов
var level = "2"  //сюда передать выбор игрока!!!
//это для увеличения количества врагов в секунду через каждый интервал количества очков
var startN = 120;
var flag1 = 0;

// определяем размеры окна
var userDisplayHeight = document.documentElement.clientHeight;
var userDisplayWidth = document.documentElement.clientWidth;
var displaySettings = {
  color: "white",
  height: userDisplayHeight,
  width: userDisplayWidth,
  top: 0,
  left: 0,
};

//инициализируем массивы для учёта врагов, выстрелов, взрывов
var enemyArray = [];
var shotArray = [];
var explosion = [];

// инициализация размеров объектов в зависимости от размеров пользовательского экрана
//для удобства все объекты пока - квадратные

var heroDimension = (userDisplayHeight + userDisplayWidth)/2/12;
var enemyDimension = (userDisplayHeight + userDisplayWidth)/2/12;
var shotDimension = (userDisplayHeight + userDisplayWidth)/60;


// СОЗДАЁМ НУЖНЫЕ ОБЪЕКТЫ КЛАССОВ
//это спрайт взрыва
var expl = new Image();
expl.src = "stuff/explosion.png";
//это бэкграунд игры
var backGround = new Image();
backGround.src = "stuff/bg.png";
// этот класс и изображение - герой
var heroDisplay = new Image();
heroDisplay.src = "stuff/hero.png";
var hero = new Hero();
// этот класс и эти изображения - враги
var enemy1Display = new Image();
enemy1Display.src = "stuff/enemy1.png"
var enemy2Display = new Image();
enemy2Display.src = "stuff/enemy2.png"
var enemy3Display = new Image();
enemy3Display.src = "stuff/enemy3.png"
var newEnemy = new Enemy();
// этот класс и изображение - снаряд
var bulletDisplay = new Image();
bulletDisplay.src = "stuff/bullet.png"
var newShot = new Bullet();
//класс для управления объектами
var controller = new Controller();


// находим canvas
var canvasArea = document.querySelector(".canv");
canvasArea.setAttribute("height", displaySettings.height);
canvasArea.setAttribute("width", displaySettings.width);
let ctx = canvasArea.getContext('2d');

function runTheGame() {
    // sndStart(tankEngine);
    controller.heroHandler();
    startGame();
}

//запуск игры
function startGame() {
    document.body.style.overflow = "hidden";
    updateGameState(); //обновление состояния
    drawGame(); //обновление отрисовки
    return RAF(startGame);
  };

  function updateGameState() {

    frameN++;
  
    //сброс счётчика
    if (frameN > 1000) frameN = 0;
    
    //создаём врагов 
    if (frameN % startN === 0) {
      newEnemy.create();
    }
    //постепенное увеличение количества появляющихся врагов в секунду в зависимости от набранных очков
    if (userPoints ===20 && flag1===0) {
      startN+=-30;
      flag1 += 1;
    }
    if (userPoints === 50 && flag1===1) {
      startN+=-20;
      flag1 += 1;
    }
    if (userPoints === 70 && flag1===2) {
      startN+=-30;
      flag1 += 1;
    }
    if (userPoints === 85 && flag1===3) {
      startN+=-10;
      flag1 += 1;
    }
    if (userPoints === 100 && flag1===4) {
      startN = startN - 10 + 1;
      flag1 += 1;
    }

    newShot.move();
    newEnemy.move();
    // двигаем корабль со скоротью 0, при ажатии на клавишу скорость увеличиваем
    hero.moveHero();
  }

  function drawGame() {

    // ПЕРВЫМ ДЕЛОМ закрашиваем весь экран в фон и рисуем линию фронта
    ctx.drawImage(backGround, 0, 0, displaySettings.width, displaySettings.height, 0, 0, displaySettings.width, displaySettings.height);
    ctx.fillStyle = "red";
    ctx.fillRect(displaySettings.top, displaySettings.left, displaySettings.width/300, displaySettings.height);
    explosionView();
    newShot.draw();
    newEnemy.draw();
    //отображаем героя
    hero.drawHero();
  }
    //запуск звуковых эффектов
  function sndStart(audio) {
    audio.currentTime = 0; // в секундах
    audio.play();
  }

  // случайное число
  function randomNumber(i, j) {
    return Math.floor(Math.random() * (j - i + 1)) + i;
  }

  runTheGame();