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

let myBoard =(function(){
    'use strict'; 
    //okay thank goodness 
    let row1 = ["unset", "unset", "unset"];
    let row2 = ["unset", "unset", "unset"];
    let row3 = ["unset", "unset", "unset"];

    let entireBoard = [
        row1, 
        row2, 
        row3
    ]

    let userCharacter= "unset";
    let rowSelection = 0;
    let columnSelect = 0;
    //we kind of want a certain function to go off when we set a button, but the first step feels like we want to set 'x' or 'o' 
    //i'm fairly certain we'll wind up doing this in the factory function we use to make players but for now we're just storing it here
    function setCharacter(){
        console.log("Please select which character you would like (x/o):");
        //take our first input 
        userCharacter= prompt("please select 'x' or 'o': ");
        if(userCharacter!== 'x' && userCharacter !== 'o'){
            setCharacter();
        }
        setPlace(userCharacter);
    }
    //now for a function to choose where our character goes....
    function setPlace(userCharacter){
        console.log("please select which row you would like to place a character: ");
        rowSelection= prompt("please select 1-3");
        if(rowSelection < 1 && rowSelection >3){
            console.log("invalid row");
            setPlace();
        }
        console.log("now choose a column: ");
        columnSelect = prompt("please select 1-3");
        columnSelect--;
        if(columnSelect < 0 && column > 3){
            console.log("invalid column");
            setPlace(); 
        }

        entireBoard[rowSelection][columnSelect] = userCharacter;

        checkForWinner();
    }

    function checkForWinner(){
        let isWinner = false; 
        //we can use the properties of multidimensional arrays to help us 

        for (let i =0; i < row1.length; i++){
            for(let j =0; j < row1.length ; j++){
                console.log(entireBoard[i][j]);
            }

        }
    }

    return {

        start: function(){
           return setCharacter();
        }   
    };


})();

myBoard.start();
