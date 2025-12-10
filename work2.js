const resultDisplay = document.getElementById("resultDisplay");

const Choice = {
	ROCK: "rock",
	PAPER: "paper",
	SCISSORS: "scissors",
};

function getComputerChoice() {
	const randomNum = Math.random() * 10;

	if (randomNum < 10 / 3) return Choice.ROCK;
	if (randomNum < (10 / 3) * 2) return Choice.PAPER;
	return Choice.SCISSORS;
}

function playGame(playerChoice) {
	const computerChoice = getComputerChoice();

	const isPlayerWinner = determineWinner(playerChoice, computerChoice);

	if (isPlayerWinner === -1) {
		console.log("Result : DRAW");
		resultDisplay.value = "DRAW";
	} else if (isPlayerWinner) {
		console.log("player wins!");
		score.playerWins++;
		resultDisplay.value = "Player Wins!";
	} else {
		console.log("computer wins!");
		score.computerWins++;
		resultDisplay.value = "Computer Wins!";
	}

	localStorage.setItem("score", JSON.stringify(score));
	console.log(score);
	displayScore();

	return;
}

const score = localStorage.getItem("score")
	? JSON.parse(localStorage.getItem("score"))
	: { computerWins: 0, playerWins: 0 };

displayScore();

console.log(localStorage.getItem("score"));

const button = {
	rock: document.getElementById(Choice.ROCK),
	paper: document.getElementById(Choice.PAPER),
	scissors: document.getElementById(Choice.SCISSORS),

	resetScore: document.getElementById("resetScore"),
};
button.rock.addEventListener("click", () => playGame(Choice.ROCK));
button.paper.addEventListener("click", () => playGame(Choice.PAPER));
button.scissors.addEventListener("click", () => playGame(Choice.SCISSORS));

button.resetScore.addEventListener("click", () => {
	score.computerWins = 0;
	score.playerWins = 0;
	console.log(score);
	displayScore();
});

function determineWinner(playerChoice, computerChoice) {
	if (playerChoice === computerChoice) return -1;

	if (
		(playerChoice === Choice.ROCK && computerChoice === Choice.SCISSORS) ||
		(playerChoice === Choice.PAPER && computerChoice === Choice.ROCK) ||
		(playerChoice === Choice.SCISSORS && computerChoice === Choice.PAPER)
	) {
		return 1;
	}

	return 0;
}

function displayScore() {
	document.getElementById("resultDisplay").innerHTML = `
        <p>Player: ${score.playerWins}</p>
        <p>Computer: ${score.computerWins}</p>
    `;
}
