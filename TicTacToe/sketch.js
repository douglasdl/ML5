let board = [
	['', '', ''],
	['', '', ''],
	['', '', '']
];

let players = ['X', 'O'];

let currentPlayer;
let available = [];

let labelP;
let label = "Teste";

function setup() {
	createCanvas(400, 400);
	frameRate(1);
	labelP = createP("Tic-Tac-Toe");
	labelP.style("font-size", "32pt");
	labelP.style('color', '#FFF');
	currentPlayer = floor(random(players.length));
	for (let i = 0; i < 3; i++) {
		for (let j = 0; j < 3; j++) {
			available.push([i, j]);
		}
	}
}

function equals3(a, b, c) {
	return (a == b && a == c && a != '');
}

function checkWinner() {
	let winner = null;

	// Horizontal
	for(let i = 0; i < 3; i++) {
		if(equals3(board[i][0], board[i][1], board[i][2])) {
			winner = board[i][0];
		}	
	}
	// Vertical
	for(let i = 0; i < 3; i++) {
		if(equals3(board[0][i], board[1][i], board[2][i])) {
			winner = board[0][i];
		}	
	}
	// Diagonal
	if(equals3(board[0][0], board[1][1], board[2][2])) {
		winner = board[0][0];
	}
	// Other Diagonal
	if(equals3(board[2][0], board[1][1], board[0][2])) {
		winner = board[2][0];
	}

	if(winner == null && available.length == 0) {
		return 'tie';
	} else {
		return winner;
	}
}

function nextTurn() {
	let index = floor(random(available.length));
	let spot = available.splice(index, 1)[0];
	let i = spot[0];
	let j = spot[1];
	//console.log(i, j);
	//console.log(currentPlayer);
	board[i][j] = players[currentPlayer];
	currentPlayer = (currentPlayer + 1) % players.length;
}

// function mousePressed() {
// 	nextTurn();
// }

function draw() {
	background(220);
	let w = width / 3;
	let h = height / 3;

	let j = 2;
	for (let i = 0; i < 3; i++) {
		for (let j = 0; j < 3; j++) {
			let x = w * i + w / 2;
			let y = h * j + h / 2;
			let spot = board[i][j];
			strokeWeight(4);
			if(spot == players[1]) {
				noFill();
				//ellipseMode(CORNER);
				ellipse(x, y, w / 2);
			} else if(spot == players[0]) {
				let xr = w / 4;	// x ratio
				line(x - xr, y - xr, x + xr, y + xr);
				line(x + xr, y - xr, x - xr, y + xr);
			}
		}
	}

	let result = checkWinner();
	if(result != null) {
		noLoop();
		labelP.html(label);;
	}
	nextTurn();

	line(w, 0, w, height);
	line(2 * w, 0, 2 * w, height);
	line(0, h, width, h);
	line(0, 2 * h, width, 2 * h);
}