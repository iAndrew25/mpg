import {BOARD} from '../commons/constants';
import {randomBetween} from '../commons/utils';

const generatePlayer = {
	x: randomBetween(BOARD.WIDTH),
	y: randomBetween(BOARD.HEIGHT),
	speed: 5
}

const drawPlayer = function(ctx, img, player) {
	ctx.drawImage(img, player.x, player.y, 50, 50);
}

export default {
	generatePlayer,
	drawPlayer
}