let title = document.querySelector('.header');  // Select the header element to display the game status
let turn = 'x';  // Set the initial player to 'x'
let squares = [];  // Array to store the current values of each square
let gameOver = false;  // Variable to track if the game is over

// Retrieve scores from localStorage if available, otherwise set to 0
let xScore = localStorage.getItem('xScore') ? parseInt(localStorage.getItem('xScore')) : 0;
let oScore = localStorage.getItem('oScore') ? parseInt(localStorage.getItem('oScore')) : 0;

// Function to update the scores displayed on the page
function updateScore() {
    document.getElementById('x-score').innerText = xScore;
    document.getElementById('o-score').innerText = oScore;
}

// Function to save the current scores to localStorage
function saveScore() {
    localStorage.setItem('xScore', xScore);
    localStorage.setItem('oScore', oScore);
}

// Function to reset the game, clear the squares and scores
function resetGame() {
    xScore = 0;  // Reset xScore to 0
    oScore = 0;  // Reset oScore to 0
    
    saveScore();  // Save the reset scores
    
    updateScore();  // Update the displayed scores
    
    // Reset the squares (clear their content and reset their background color)
    const squaresElements = document.querySelectorAll('.square');
    squaresElements.forEach(square => {
        square.innerHTML = '';  // Clear the square content
        square.style.backgroundColor = '#42A5F5';  // Reset the background color
    });
    
    turn = 'x';  // Set the turn to 'x' for the next game
    gameOver = false;  // Reset the game over flag
    title.innerHTML = 'X Player Turn';  // Set the initial game status message
}

// Function to handle the winner's logic
function whoWins(num1, num2, num3) {
    title.innerHTML = squares[num1] + ' Player Wins';  // Display the winner
    document.getElementById('item' + num1).style.backgroundColor = 'green';  // Highlight the winning squares
    document.getElementById('item' + num2).style.backgroundColor = 'green';
    document.getElementById('item' + num3).style.backgroundColor = 'green';
    
    gameOver = true;  // Mark the game as over
    
    if (squares[num1] === 'X') {
        xScore++;  // Increment the score for player 'X'
    } else {
        oScore++;  // Increment the score for player 'O'
    }
    
    saveScore();  // Save the updated scores
    updateScore();  // Update the displayed scores
    
    // Display a loading animation for the winner message
    setInterval(function() { title.innerHTML += '.' }, 1000);
    
    // Reload the page after 3 seconds to reset the game
    setTimeout(function() { location.reload() }, 3000);
}

// Function to check if there's a winner
function winner() {
    // Store the current values of each square in the squares array
    for (let i = 1; i <= 9; i++) {
        squares[i] = document.getElementById('item' + i).innerHTML;
    }

    // Check for winning combinations across rows, columns, and diagonals
    if (squares[1] == squares[2] && squares[2] == squares[3] && squares[1] != '') {
        whoWins(1, 2, 3);  // If a row has three identical values, declare a winner
    } 
    else if (squares[4] == squares[5] && squares[5] == squares[6] && squares[4] != '') {
        whoWins(4, 5, 6);
    } 
    else if (squares[7] == squares[8] && squares[8] == squares[9] && squares[7] != '') {
        whoWins(7, 8, 9);
    } 
    else if (squares[1] == squares[4] && squares[4] == squares[7] && squares[1] != '') {
        whoWins(1, 4, 7);
    } 
    else if (squares[2] == squares[5] && squares[5] == squares[8] && squares[2] != '') {
        whoWins(2, 5, 8);
    } 
    else if (squares[3] == squares[6] && squares[6] == squares[9] && squares[3] != '') {
        whoWins(3, 6, 9);
    } 
    else if (squares[1] == squares[5] && squares[5] == squares[9] && squares[1] != '') {
        whoWins(1, 5, 9);
    } 
    else if (squares[3] == squares[5] && squares[5] == squares[7] && squares[3] != '') {
        whoWins(3, 5, 7);
    } 
    else {
        // If all squares are filled and no one wins, it's a draw
        let NonWins = true;
        for (let i = 1; i <= 9; i++) {
            if (squares[i] === '') {
                NonWins = false;  // There are still empty squares
                break;
            }
        }
        if (NonWins) {
            title.innerHTML = "No One Wins";  // Display a draw message
            setInterval(function() { title.innerHTML += '.' }, 1000);
            gameOver = true;  // Mark the game as over
            setTimeout(function() { location.reload(); }, 3000);  // Reload the page after 3 seconds
        }
    } 
}

// Function to handle a player's move
function game(id) {
    if (gameOver) return;  // If the game is over, ignore further moves
    
    let element = document.getElementById(id);
    if (turn === 'x' && element.innerHTML == '') {
        element.innerHTML = 'X';  // Player X places 'X'
        turn = 'o';  // Switch turn to player O
        title.innerHTML = 'O Player Turn';
    } 
    else if (turn === 'o' && element.innerHTML == '') {
        element.innerHTML = 'O';  // Player O places 'O'
        turn = 'x';  // Switch turn to player X
        title.innerHTML = 'X Player Turn';
    }
    winner();  // Check if the current move results in a winner
}

// Initialize the game by updating the score
updateScore();

// Add an event listener to the New Game button to reset the game when clicked
document.getElementById('newGameBtn').addEventListener('click', resetGame);
