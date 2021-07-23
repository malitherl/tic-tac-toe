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

const myBoard =(function(){
    'use strict'; 
   
    let row1 = ["unset", "sadf", "x"];
    let row2 = ["unset", "x", "unset"];
    let row3 = ["x", "unset", "asf"];

    let entireBoard = [
        row1, 
        row2, 
        row3
    ]
    //we need the entire board as well to be able to display it 
    const getBoard = () => {
        return entireBoard;
    }


    let userCharacter= "unset";
    let rowSelection = 0;
    let columnSelect = 0;
    //we kind of want a certain function to go off when we set a button, but the first step feels like we want to set 'x' or 'o' 
    //i'm fairly certain we'll wind up doing this in the factory function we use to make players but for now we're just storing it here
    
    //now for a function to choose where our character goes....
    function setPlace(userCharacter){
        console.log("please select which row you would like to place a character: ");
        rowSelection= prompt("please select 1-3");
        rowSelection--;
        if(rowSelection < 1 && rowSelection >3){
            console.log("invalid row");
            setPlace();
        }
        console.log("now choose a column: ");
        columnSelect = prompt("please select 1-3");
        columnSelect--;
        if(columnSelect < 0 && columnSelect > 3){
            console.log("invalid column");
            setPlace(); 
        }

        entireBoard[rowSelection][columnSelect] = userCharacter;

       if(checkForWinner(rowSelection, columnSelect) === true){
           console.log("game over!");
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
           // console.log(entireBoard[i][row]);
            if(entireBoard[i][row] !== userCharacter){
                verticalMatch = false;
            }
        }
        //check for a row/horizontal match
        for(let i=0; i< row1.length; i++){
            //console.log(entireBoard[col][i]);
            if(entireBoard[col][i] !== userCharacter){
                horizontalMatch = false;
            }
        }

        //and now for the diagonals 

        for(let i=0; i< row1.length; i++){
            if(entireBoard[i][i] !== userCharacter){
                diagonalMatchL=false;
            }
        }
        
        if(entireBoard[2][0] && entireBoard[1][1] && entireBoard[0][2] !== userCharacter){
            diagonalMatchR = false;
            console.log(diagonalMatchR);
        }
        if(diagonalMatchR || diagonalMatchL || verticalMatch || horizontalMatch == true){
            isWinner = true;
        }
    
        return isWinner;
    
    }


           return {
               
            getBoard, setPlace
        
        };
          

})();

// we need to create players and some how add theem into the module pattern
//so, let's make the factory function and go from there 

const Player = (playerName, playerCharacter) => {

    const getName = () => playerName;
    
    const setChar = () => function(){

        let userInput = prompt("please select 'x' or 'o': ");
        
        playerCharacter = userInput; 
    }
    
    const getChar = () => playerCharacter; 

    return { getName, setChar, getChar };

}
//now for the HTML DOM 

const displayBoard =(function (){
    'use strict';
    //you can have a module pattern object inside another module pattern??

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

        for(let i = 0 ; i <  9 ; i++){
            let boardPiece = document.createElement("DIV");
            container.appendChild(boardPiece);
        }
    }





})();



