import {BOARD} from './commons/constants';
import plyr from './modules/player';
import socket from './commons/socket';

const CANVAS = document.getElementById('game');

const sw = socket.getInstance();
let players = [],
	me = plyr.generatePlayer,
	onMove;

sw.onopen = () => {
	sw.send(JSON.stringify({type: 'NEW_PLAYER', payload: me}));
}

sw.onmessage = ({data}) => {
	const parsedData = typeof data === 'string' ? JSON.parse(data) : data;
	//console.log("parsedData", parsedData);

	switch(parsedData.type) {
		case 'GET_PLAYERS':
			players = parsedData.payload;
			break;
		case 'GET_ME':
			me = parsedData.payload;
			console.log("me", me);
		default:
	}

	//console.log('Socket type -', parsedData);
}

let ctx, img;

let MOVEMENT = {
	LEFT: false,
	RIGHT: false,
	TOP: false,
	BOTTOM: false
}


const move = () => {
		console.log("me", me);
	if(MOVEMENT.LEFT && me.x > 0) {
		me.x -= me.speed;
	}
	if(MOVEMENT.RIGHT && me.x < BOARD.WIDTH - 50) {
		me.x += me.speed;
	}
	if(MOVEMENT.TOP && me.y > 0) {
		console.log('top');
		me.y -= me.speed;
	}
	if(MOVEMENT.BOTTOM && me.y < BOARD.HEIGHT - 50) {
		console.log('bottom');
		me.y += me.speed;
	}

	if(sw.readyState === sw.OPEN && (MOVEMENT.LEFT || MOVEMENT.RIGHT || MOVEMENT.TOP || MOVEMENT.BOTTOM)) {
		//console.log('opened');
		sw.send(JSON.stringify({type:'PLAYER_MOVE', payload: me}));
	} else {
		//console.log('not opened');
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
	if(e.keyCode === 37) MOVEMENT.LEFT = true;
	if(e.keyCode === 39) MOVEMENT.RIGHT = true;
	if(e.keyCode === 40) MOVEMENT.BOTTOM = true;
	if(e.keyCode === 38) MOVEMENT.TOP = true;
}

document.onkeyup = function(e) {
	if(e.keyCode === 37) MOVEMENT.LEFT = false;
	if(e.keyCode === 39) MOVEMENT.RIGHT = false;
	if(e.keyCode === 40) MOVEMENT.BOTTOM = false;
	if(e.keyCode === 38) MOVEMENT.TOP = false;
}


function drawPlayers() {
		//console.log("players", players);
	players.forEach(player => {
		plyr.drawPlayer(ctx, img, player);
	})
}

const update = () => {

//console.log("players", players);
	clearScreen();
	//draw();
	drawPlayers();
	move();
	requestAnimationFrame(update);
}




const clearScreen = () => ctx.clearRect(0, 0, CANVAS.width, CANVAS.height);