let boxes = document.querySelectorAll(".box");
let btn = document.querySelector(".btn");
let btn1 = document.querySelector(".btn1");
let msgContainer = document.querySelector(".msgContainer");
let para = document.querySelector("#para");
let Gametime = new Audio("Background.mp3");
let Gamedraw = new Audio("Drawgame.mp3");
let GameWinner = new Audio("Winner.mp3");
let turn1 = new Audio("move1.mp3");
let turn2 = new Audio("move2.mp3");

let turn0 = true;
let turn = "X";
let cnt = 0;
let isgameover = false;
const WinSenario = [
    [0,1,2,0,-9,0],
    [3,4,5,0,0,0],
    [6,7,8,0,9,0],
    [0,3,6,-9,0,90],
    [1,4,7,0,0,90],
    [2,5,8,9,0,90],
    [0,4,8,0,0,45],
    [2,4,6,0,0,135],
];
const resetgame = () => {
    turn0 = true;
    cnt = 0;
    enablebox();
    msgContainer.classList.add("hide");
    GameWinner.pause();
    turn = "X";
    document.querySelector(".line").style.width = "0vw";
    document.getElementsByClassName("info")[0].innerText  = "Turn for " + turn;
};

boxes.forEach((box) => {
    box.addEventListener("click",() => {
        console.log("Box was Clicked");
        Gametime.play();
        turn = changeTurn();
        if (!isgameover){
            document.getElementsByClassName("info")[0].innerText  = "Turn for " + turn;
        } 
if(turn0){
    box.innerText = "X";
    turn0 = false;
    turn1.play();
}
else{
    box.innerText = "0";
    turn0 = true;
    turn2.play();
   }
   box.disabled = true;
   cnt++;
    //CheckWinner();
    let isWinner = CheckWinner();
    if(cnt === 9 && !isWinner){
    gamedraw();
    Gamedraw.play();
}
});
});
//Function to change Turn-
const changeTurn = () =>{
   return turn === "X"? "0" : "X";
}
//Function for Game Draw
const gamedraw = () => {
    para.innerText = "Game Was Draw";
    msgContainer.classList.remove("hide");
    msgContainer.classList.add("blink");
    disableBox();
    para.classList.remove("backgrd");
    GameWinner.pause();
    Gametime.pause();
    document.querySelector(".info").innerText = "Game Completed ";
}
//Disable Boxes after we get Winner
const disableBox = () =>{
    for(let box of boxes ){
        box.disabled = true;
    }
};
//Boxes are enable when Inner text is Empty
const enablebox = () => {
     for(let box of boxes){
        box.disabled = false;
        box.innerText = "";
     }
};
// Show the Winner
const ShowWinner = (winner) =>{
    para.innerText = `Congratulation Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBox();
    para.classList.add("backgrd");
    GameWinner.play();
    Gametime.pause();
    document.querySelector(".info").innerText = "Game Completed";
    document.querySelector(".line").style.width = "25vw";
    turn = "X";
};
//Check the Winner of the Game - 
const CheckWinner = () => {
    for(let pattern of WinSenario){

   let val1 = boxes[pattern[0]].innerText;
   let val2 = boxes[pattern[1]].innerText;
   let val3 = boxes[pattern[2]].innerText;
   document.querySelector(".line").style.transform = `translate(${pattern[3]}vw, ${pattern[4]}vw) rotate(${pattern[5]}deg)`
  
    console.log(val1,val2,val3);
     if(val1 !== "" && val2 !== "" && val3 !== ""){
           if(val1 === val2 && val2 === val3){
            ShowWinner(val1); 
            return true;
           }
       }
    }
};
//Game is Reset when we Click the Reset button or New Game button
btn.addEventListener("click",resetgame);
btn1.addEventListener("click",resetgame);