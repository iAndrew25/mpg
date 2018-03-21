import {BOARD} from './commons/constants';
import socketSubscribe from './commons/socket-subscribe';
import socket from './commons/socket';

let players = [],
	currentUser,
	onMove;

const updatePlayers = users => players = users;
const updateCurrentUser = user => currentUser = user;
let ctx, img;

socketSubscribe.subscribe('app.js', {
	GET_PLAYERS: users => updatePlayers(users),
	NEW_PLAYER: users => updatePlayers(users),
	PLAYER_MOVE: users => updatePlayers(users),
	PLAYER_LEFT: users => updatePlayers(users),
	GET_ME: user => updateCurrentUser(user),
})

const CANVAS = document.getElementById('game');

const sw = socket.getInstance();

let KEYS = {
	LEFT: false,
	RIGHT: false,
	TOP: false,
	BOTTOM: false
}

const move = () => {
	if(KEYS.LEFT && currentUser.x > 0) {
		currentUser.x -= currentUser.speed;
	}
	if(KEYS.RIGHT && currentUser.x < BOARD.WIDTH - 50) {
		currentUser.x += currentUser.speed;
	}
	if(KEYS.TOP && currentUser.y > 0) {
		currentUser.y -= currentUser.speed;
	}
	if(KEYS.BOTTOM && currentUser.y < BOARD.HEIGHT - 50) {
		currentUser.y += currentUser.speed;
	}

	if(KEYS.LEFT || KEYS.RIGHT || KEYS.TOP || KEYS.BOTTOM) {
		sw.send(JSON.stringify({type:'PLAYER_MOVE', payload: currentUser}));
	}
}

window.onload = () => {
	CANVAS.width = BOARD.WIDTH;
	CANVAS.height = BOARD.HEIGHT;
	ctx = CANVAS.getContext('2d');

	img = new Image();
	img.src = 'assets/images/player.png';
	img.onload = function() {
		update();
	}
}

document.onkeydown = function(e) {
	if(e.keyCode === 37) KEYS.LEFT = true;
	if(e.keyCode === 39) KEYS.RIGHT = true;
	if(e.keyCode === 40) KEYS.BOTTOM = true;
	if(e.keyCode === 38) KEYS.TOP = true;
}

document.onkeyup = function(e) {
	if(e.keyCode === 37) KEYS.LEFT = false;
	if(e.keyCode === 39) KEYS.RIGHT = false;
	if(e.keyCode === 40) KEYS.BOTTOM = false;
	if(e.keyCode === 38) KEYS.TOP = false;
}

function drawPlayers() {
	//console.log("players", players);
	players.forEach(player => {
		drawPlayer(ctx, img, player);
	});

	move();
}

const update = () => {
	clearScreen();
	drawPlayers();
	requestAnimationFrame(update);
}

const clearScreen = () => ctx.clearRect(0, 0, CANVAS.width, CANVAS.height);

const drawPlayer = (ctx, img, player) => ctx.drawImage(img, player.x, player.y, 50, 50);