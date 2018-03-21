const BOARD = require('./board');
const TOOLS = require('./tools');

const generatePlayer = () => ({
	id: TOOLS.getId(),
	x: TOOLS.randomBetween(BOARD.WIDTH),
	y: TOOLS.randomBetween(BOARD.HEIGHT),
	speed: 5
});

module.exports = generatePlayer;