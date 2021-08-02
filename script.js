//this will contain the scripting behavior for the tic tac toe game and will be linked to the index webpage

/** we use a module to create a game board
 * 
 * and we'll also want another to display the board through the DOM itself 
 * 
 * as for the players, we'll want to use a factory function 
 * 
 */
 console.log("e");
 const myBoard =(function(){
     'use strict'; 
     //variable declarations and initializations 
     let row1 = [" ", " ", " "];
     let row2 = [" ", " ", " "];
     let row3 = [" ", " ", " "];
 
     let entireBoard = [
         row1, 
         row2, 
         row3
     ] 

    
     let determinant =0;
 
     let userCharacter= "unset";
     let rowSelection = 0;
     let columnSelect = 0;
 
     //factory function to create players 
     const player = (name, piece, winStatus) => {
         let playerName;
         playerName = name;
         let playerCharacter = piece;
         let isWinner = winStatus;
         const setName = a => {
             if(a == ""){
                 a = name;
             }
             playerName = a;
             return playerName;
         }
         const winner = () => {
             isWinner = true;
         }
     
        
         const getName = () => playerName;
         const getChar = () => playerCharacter; 
   
         return { getName, getChar, setName, winner };   
     };
     let players = [ player("Player 1", "x", false), player("Player 2", "o", false)];
     
     const getOriginal = () => {
         return [ [" ", " " , " "], [" ", " ", " "], [" ", " ", " "]];
     }
 
     const getBoard = () => {
         return entireBoard;
     }
     const getClone = () => {      
         return [ " ", " " , " ", " ", " ", " " , " ", " ", " "];
     }
 
     const reset = () => {
         let original = getOriginal();
         console.log(original);
         for(let i=0; i < entireBoard[0].length;i++){
             for(let j=0; j < entireBoard[0].length; j++){
                 entireBoard[i][j] = original[i][j];
             }
         }
         console.log(entireBoard);
         players =[];
         players.push(player("Player 1", "X", false));
         players.push(player("Player 2", "O", false));
         determinant=0;
     }
 
     function setName(input){
         player1.setName(input);
     }
   
     function setPlace(a, b, board, player){
         let currentPlayer = player;
         let playerChar = currentPlayer.getChar();
         
             if(entireBoard[a][b] != playerChar){
                 rowSelection= a;
                 columnSelect = b;
                 userCharacter = playerChar; 
                 board[rowSelection][columnSelect] = userCharacter;
                 if(checkForWinner(rowSelection, columnSelect) === true){
                     let message = document.querySelector(".gameMessage");
                     message.textContent = `${currentPlayer.getName()} wins!`;
                 } 
                           
             }
     }
 
     function checkForWinner(row,col){
         let w = false;
         //we can use the properties of multidimensional arrays to help us 
         //it's easier to prove something false than true 
         let horizontalMatch= true;
         let verticalMatch = true;
         let diagonalMatchL= true;
         let diagonalMatchR= true;
 
         //check for a column/vertical match
         for(let i =0; i < row1.length; i++){
              
             if(entireBoard[i][col] !== userCharacter){
                 verticalMatch = false;
             }
         }
         //check for a row/horizontal match
         for(let i=0; i< row1.length; i++){
             if(entireBoard[row][i] !== userCharacter){
                 horizontalMatch = false;
             }
             
         }
         //and now for the diagonals 
         for(let i=0; i< row1.length; i++){
             if(entireBoard[i][i] !== userCharacter){
                 diagonalMatchL=false;
             }
            
         }
        
         if((entireBoard[2][0] || entireBoard[1][1] || entireBoard[0][2]) !== userCharacter){
             diagonalMatchR = false;
         } 
         if(diagonalMatchR || diagonalMatchL || verticalMatch || horizontalMatch == true){
             w = true;
         }
         return w;  
     }
         
         function makeMove(a,b, board){
 
             let player = turn(determinant);
             let message = document.querySelector(".gameMessage");
                 if(determinant ==0){
                     message.textContent = "It is currently your turn"; 
                 } else {
                     message.textContent = "It is currently Player 2's turn";
                 }
             
             setPlace(a,b, board,player);             
         }
     
         function turn(place){
             
             //determines who's turn it is 
             let currentPlayer; 
             if(determinant ==0){
                 currentPlayer = players[0];
                 place++;
             } 
             else if (determinant == 1){
                 currentPlayer = players[1];
                 place--;
             }
             determinant = place;
     
             return currentPlayer;
     
         }
         return {               
             getBoard, makeMove, getClone, setName, reset     
         };
 })();
 
 
 
 //now for the HTML DOM 
 const displayBoard =(function (){
     'use strict';
 
     
     
 
     function generate (){
        let boardData = myBoard.getBoard();  
  
        const container = document.createElement("DIV");
        container.setAttribute("id", "container");
         /** 
          * first, we want to create a 3x3 grid 
          * and each square corresponds to a different index in the gameboard
          * we use a loop to attach an event listener to each 
          * and the event listener will modify different values in the array 
          * 
          * 
          */     
        
            //this is mostly for player1, the user 
            let playerForm = document.createElement("FORM");
            playerForm.setAttribute("id", "playerForm");
    
            let playerTitle = document.createElement("LABEL");
            playerTitle.textContent = "Player Name:  ";
            let playerNameInput = document.createElement("INPUT");
            playerNameInput.setAttribute("type", "text");
            playerNameInput.setAttribute("id", "input");
            let submit = document.createElement("BUTTON");
            submit.setAttribute("type", "button");
            submit.setAttribute("class", "formButtons");
            submit.textContent = "Submit Name";
            submit.addEventListener("click", function(e){
                myBoard.setName(document.getElementById("input").value);
            })
            
            playerForm.appendChild(playerTitle);
            playerForm.appendChild(playerNameInput);
            playerForm.appendChild(submit);
       
            container.appendChild(playerForm);
    


         const gameMessage = document.createElement("h2");
         gameMessage.setAttribute("class" , "gameMessage");
 
         gameMessage.textContent = "It is currently your turn"; 
         container.appendChild(gameMessage);
 
         const board = document.createElement("DIV");
         board.setAttribute("class", "boardContainer");
        
         for(let i =0; i < boardData[0].length ; i++){
             for(let j =0; j < boardData[0].length ; j++){
                 let boardElem = document.createElement("DIV");
                 boardElem.setAttribute("id", "boardElement");
                 boardElem.addEventListener("click", function(e){ 
                    myBoard.makeMove(i,j, boardData);
                     boardElem.textContent = boardData[i][j];
                     
                 })
                 board.appendChild(boardElem);
             }
         }
         container.appendChild(board);   
         let clear = document.createElement("BUTTON");
         clear.setAttribute("class", "formButtons");
         clear.setAttribute("id", "reset");
         clear.setAttribute("type", "button");
         clear.textContent = "Clear Board";
         clear.addEventListener("click", function(e){
              reset();
              myBoard.reset();
         })
     
         playerForm.appendChild(clear);  
         container.appendChild(playerForm);  
         document.body.appendChild(container);

         function reset(){
            document.querySelector("#container");
            document.body.removeChild(container);
            generate();
         }




     }
     //alright now we want to create a function that will take a nodelist of all the elements here and add an event listener to each 
     //because after all, the indices of the array above and on the board are the exact same 
    




     return {
         generate
     };
 
 })();
 
 
 displayBoard.generate();
 
 /**
  * 
  * 
  */