let firstColor;
let secondColor;
let bgColor;
let word = "_______";
/*
const allCapsAlpha = [..."ABCDEFGHIJKLMNOPQRSTUVWXYZ"]; 
const allCapsRussian = [..."АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ"];*/
//let base = [...allCapsAlpha];
function setup() {
  createCanvas(1000, 850);
  newWord();
  firstColor = color(0,0,0);
  secondColor = color(220,220,220);
  bgcolor = secondColor;
  document.body.style.background = firstColor;
  pink = color(230, 90, 130);
}
function preload(){
  eatsound = loadSound("bop.mp3");
  wrong = loadSound("wrong.mp3");
  winS = loadSound("yes.mp3");
}
moves = ["_","_","_","_","_","_","_"];
function newWord(){
  lastword = word;
  /*

const generator = (base, len) => {
   return [...Array(len)]
     .map(i => base[Math.random()*base.length|0])
     .join('');
};
  word = generator(base,7);*/
  /*new*/
 
  if (lang){
    sumprobs = [10.983, 19.466, 27.464, 34.831, 41.531, 47.849, 53.322, 58.068, 62.601, 66.944, 70.43, 73.633, 76.61, 79.414, 82.029, 84.03, 85.928, 87.663, 89.35, 90.991, 92.583, 94.033, 95.241, 96.207, 97.147, 97.865, 98.504, 98.99, 99.351, 99.682, 99.949, 99.986, 100];
  mykeys = ["О", "Е", "А", "И", "Н", "Т", "С", "Р", "В", "Л", "К", "М", "Д", "П", "У", "Я", "Ы", "Ь", "Г", "З", "Б", "Ч", "Й", "Х", "Ж", "Ш", "Ю", "Ц", "Щ", "Э", "Ф", "Ъ", "Ё"];
   }
  else
  {
    sumprobs = [12.02, 21.12, 29.24, 36.92, 44.23, 51.18, 57.46, 63.48, 69.40, 73.72, 77.70, 80.58, 83.29, 85.90, 88.20, 90.31, 92.40, 94.43, 96.25, 97.74, 98.85, 99.54, 99.71, 99.82, 99.92, 100]
    mykeys = ["E", "T", "A", "O", "I", "N", "S", "R", "H", "D", "L", "U", "C", "M", "F", "Y", "W", "G", "P", "B", "V", "K", "X", "Q", "J", "Z"];
   }
    myNewWord = "";
    for (let j=0;j<=7-1;j++){
      randomNum = Math.random()*100;
      id = -1;
      for (let i=0;i<=sumprobs.length-1;i++){
        if (randomNum <= sumprobs[i]){
          id = i;
          i=100;
        }
      }
      myNewWord += mykeys[id];
    }
    word = myNewWord;
  }

function draw() {
  background(firstColor);
  fill(secondColor);
  if(ongoing){
    timer = (new Date() - startTime)/1000; 
  }
  textSize(80);
  textAlign(CENTER,CENTER);

  if (!ongoing){ 
    fill(bgcolor);
  }
  text(timer.toFixed(3),500,500);
  
  
  for (let i = 1; i<=word.length;i++){
    if (ongoing){
    if (i-1 < lC){
    fill(50,200,50);
    }else{
    fill(pink);
    }}else{
    fill(pink);
    }
    text(word.charAt(i-1),100*i+100,200);
  }
  //text([...word].join(" "),500,150);
  fill(secondColor);
  textSize(80);
  //text(moves.join(" "),500,350);
  /*for (let i = 1; i<=lC; i++){
    text("_",(i+1)*50+150,160);
  }*/
  textSize(30);
  text("Write these letters as fast as possible", 500, 80);
  text("[Timer starts with the first letter, you can't backspace]",500,300);
  
  
  text("Last word: " + [...lastword].join(" "), 250,650);
  

  text("Best time: " + bestTime, 750, 650);
  text("Corrent: " + gameCount +" of " + (gameCount+fails),250,700);
  text("Fails: " + fails + " [" + (fails*100/(fails+gameCount)).toFixed(2) + "%]",250,750);
  text("Average time: " + averageTime.toFixed(3),750,700);
  text("Streak: " + streak,250,800);
  text("Best streak: " + bestStreak + " [" + bsa.toFixed(3) + "]", 750,750);
  text("Streak average: " + streakAverage.toFixed(3) , 750,800);
  fill(pink);
  textSize(20);
  text("[Mouse Click to change colors, CTRL to change language]",500,350);
}
lastword = "<NAN>";
bsa = 0;
times = [];
streakTimes = [];
solvedTime = "<NAN>";
bestTime = "<NAN>";
timer = 0;
startTime = 0;
ongoing = false;
lC=1;
gameCount = 0;
fails = 0;
averageTime = 0;
streakAverage = 0;
streak = 0;
bestStreak = 0;
function mousePressed(){
 tmp = firstColor;
  firstColor = secondColor;
  secondColor = tmp;
  bgcolor = secondColor;
  document.body.style.background = firstColor;
  //bgcolor = secondColor;
}
lang = false;
function keyPressed(){
  print(word);
  print([... moves]);
  if (keyCode == CONTROL){
    /*if (lang){
      base = [...allCapsAlpha];
    }
    else{
      base = [...allCapsRussian];
    }*/
    lang = !lang;
    newWord();
    if (ongoing){
      stopGame(false);
    }
  }
  if (key.length == 1){
    moves = moves.splice(1);
    moves.push(key.toUpperCase());
    m2 = [... moves];
    m3 = m2.splice(5).join('');
     if (ongoing == true){
      lC++;
    }
    if (lC > 1){
      //print(m3);
      if (word.indexOf(m3) == -1){
        stopGame(false);
        wrong.play();
      }else{
        if(ongoing){
          eatsound.play();
        }
      }
    } 
    if (key.toUpperCase() == word.charAt(0) && ongoing == false){
      timer = 0;
      eatsound.play();
      ongoing = true;
      startTime = new Date();
    };
    if (moves.join('') == word && ongoing == true){
      stopGame(true)
    }
    }
  
}
function stopGame(win){
  ongoing = false;
  lC = 1;
  newWord();
  
  if (win){
    winS.play();
    bgcolor = color(50,150,50);
    solvedTime=timer;
    gameCount++;
    streak++;
    times.push(solvedTime);
    streakTimes.push(solvedTime);
      let average = (array) => array.reduce((a, b) => a + b) / array.length;
      averageTime = average(times);
    streakAverage = average(streakTimes);
    if (solvedTime < bestTime || bestTime == "<NAN>"){
      bestTime = solvedTime;
      bgcolor = color(50,50,255);
      
    }
    
  }
  else{
    
    streak = 0;
    streakAverage = 0;
    streakTimes.length = 0;
    fails++;
    bgcolor=color(255,0,0);
  }
  if (bestStreak < streak){
      bestStreak = streak;
      bsa = streakAverage;
    }
  moves = ["_","_","_","_","_","_","_"];
}