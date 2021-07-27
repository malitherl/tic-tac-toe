//this will contain the scripting behavior for the tic tac toe game and will be linked to the index webpage

/** okay so the idea here is that we'll use a module to create a game board
 * 
 * and we'll also want another to display the board through the DOM itself 
 * 
 * as for the players, we'll want to use a factory function 
 * 
 * 
 */

//our first module pattern? 

//let's create something that can store the logic of the game and then we can link it up with the DOM 
//only thing left really is the ability to win the game 
//and if we can avoid checking the same box twice
//also reset button 
const myBoard =(function(){
    'use strict'; 
   
    let row1 = ["1", "2", "3"];
    let row2 = ["4", "5", "6"];
    let row3 = ["7", "8", "9"];

    let entireBoard = [
        row1, 
        row2, 
        row3
    ] 
    const getOriginal = () => {
        return [ ["1", "2" , "3"], ["4", "5", "6"], ["7", "8", "9"]];
    }


    //we need the entire board as well to be able to display it 
    const getBoard = () => {
        return entireBoard;
    }
    const getClone = () => {
        
        return [ "1", "2" , "3", "4", "5", "6", "7", "8", "9"];

    }

    const reset = () => {
        let original = getOriginal();
        for(let i=0; i < entireBoard[0].length;i++){
            for(let j=0; j < entireBoard[0].length; j++){
                entireBoard[i][j] = original[i][j];
            }
        }
        return entireBoard;
    }

    let userCharacter= "unset";
    let rowSelection = 0;
    let columnSelect = 0;
    
    //we kind of want a certain function to go off when we set a button, but the first step feels like we want to set 'x' or 'o' 
    //i'm fairly certain we'll wind up doing this in the factory function we use to make players but for now we're just storing it here
    
    //now for a function to choose where our character goes....
    function setPlace(a, b, board, playerChar, playerName){
        if(entireBoard[a][b] != playerChar){
            rowSelection= a;
            columnSelect = b;
            userCharacter = playerChar;
            
            board[rowSelection][columnSelect] = userCharacter;
            entireBoard[rowSelection][columnSelect] = userCharacter;

            if(checkForWinner(rowSelection, columnSelect) === true){
                return true;
            } else {
                return false;
            }
        } 
         
    }


    function checkForWinner(row,col){
        let isWinner = false;
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
            isWinner = true;
        }
    
        return isWinner;
    
    }


           return {
               
            getBoard, setPlace, getClone, reset
        
        };
          

})();

// we need to create players and some how add theem into the module pattern
//so, let's make the factory function and go from there 

const player = () => {
    let playerName;
    const setName = a => {
        playerName = a;
        return playerName;
    }
    const getName = () => playerName;
    
    let playerCharacter = "x";
    
    
    const getChar = () => playerCharacter; 

    return { getName, getChar, setName };

};
//now for the HTML DOM 

const displayBoard =(function (){
    'use strict';
    //you can have a module pattern object inside another module pattern??
    let boardData = myBoard.getBoard();  
    
   
    
    function generate (){
        const container = document.querySelector("#container");
        /** 
         * first, we want to create a 3x3 grid 
         * and each square corresponds to a different index in the gameboard
         * we use a loop to attach an event listener to each 
         * and the event listener will modify different values in the array 
         * 
         * and we may have to use data attributes to hook the array indices up to the HTML DOM elements 
         */

        //alright so what we need to do here is create the player characters through a form and also give them the ability to chose which character they'd like
        //to use 
        //after that we append onto the container 
        //and we'll also want to create a reset function
        let player1 = player();
        const playerPiece = player1.getChar();

        const board = document.createElement("DIV");
        board.setAttribute("class", "boardContainer");
        let playerForm = document.createElement("FORM");
        playerForm.setAttribute("id", "playerForm");


        for(let i =0; i < boardData[0].length ; i++){
            for(let j =0; j < boardData[0].length ; j++){
                let boardElem = document.createElement("DIV");
                boardElem.setAttribute("id", "boardElement");
                boardElem.textContent = boardData[i][j];
                boardElem.addEventListener("click", function(e){
                    if( myBoard.setPlace(i,j,boardData, playerPiece) == true) {
                        if(player1.getName !== undefined){
                            alert("You win, " + player1.getName() + "! Game over!");
                        } else {
                            alert("You win, player! Game over!");
                        }
                        boardElem.textContent = boardData[i][j];
                    } else {
                        
                         boardElem.textContent = boardData[i][j];
                    }
                    
                })
                board.appendChild(boardElem);
            }
        }
        container.appendChild(board);   

        let playerTitle = document.createElement("LABEL");
        playerTitle.textContent = "Player Name: ";
        let playerNameInput = document.createElement("INPUT");
        playerNameInput.setAttribute("type", "text");
        playerNameInput.setAttribute("id", "input");
        let submit = document.createElement("BUTTON");
        submit.setAttribute("type", "button");
        submit.textContent = "Submit Name";
        submit.addEventListener("click", function(e){
            player1.setName(document.getElementById("input").value);
        })

        let clear = document.createElement("BUTTON");
        clear.setAttribute("type", "button");
        clear.textContent = "Clear Board";
        clear.addEventListener("click", function(e){
             reset();
        })

        container.appendChild(playerForm);
        container.appendChild(playerTitle);
        container.appendChild(playerNameInput);
        container.appendChild(submit);
        container.appendChild(clear);
        
    }
    //alright now we want to create a function that will take a nodelist of all the elements here and add an event listener to each 
    //because after all, the indices of the array above and on the board are the exact same 
    function reset(){
        const board = document.querySelector(".boardContainer");
        let boardElem = board.querySelectorAll("DIV");
        const clonedBoardData = myBoard.getClone();
        for(let i =0; i < boardElem.length; i++){
            boardElem[i].textContent = clonedBoardData[i];    
        }
        myBoard.reset();
    }


    return {
        generate
    };

})();


displayBoard.generate();
