const express = require('express');
	http = require('http'),
	WebSocket = require('ws');
	path = require('path');

const app = express(),
	port = 8082,
	server = http.createServer(app),
	wss = new WebSocket.Server({ server });

app.use(express.static(path.join(__dirname)));
app.get('/', (req, res) => res.sendFile(path.join(__dirname + 'index.html')));

const getId = () => Math.random().toString(36).substring(7);

let noticeAllClients = () => {},
	clients = {},
	id = 0,
	players = [];

wss.on('connection', (ws, req) => {
	let randomId = getId(); 
	ws.id = randomId;
	clients[randomId] = ws;



	noticeAllClients = message => {
		wss.clients.forEach(client => {
			if(client.readyState === WebSocket.OPEN) {
				client.send(JSON.stringify(message));
			}
		})
	}

	noticeAllClients({type: 'ONLINE_CLIENTS', message: `New client in town. Currently there are ${wss.clients.size} clients online.`})
	
	ws.on('error', err => {
		if (err.code !== 'ECONNRESET') {
			throw err
		}
	});

	ws.on('close', function close() {
		delete clients[ws.id];
		players = players.filter(player => player.id !== ws.id);
		console.log('Closing', ws.id);
		console.log("players", players);

		noticeAllClients({type: 'GET_PLAYERS', payload: players});

		noticeAllClients({type: 'ONLINE_CLIENTS', message: `One client left the town. Currently there are ${wss.clients.size} clients online.`});
	});

	ws.on('message', message => {
		const parsedData = typeof message === 'string' ? JSON.parse(message) : message;
		switch(parsedData.type) {
			case 'NEW_PLAYER':
				console.log("parsedData", parsedData);
				let newPlayer = {...parsedData.payload, id: ws.id};
				console.log("newPlayer", newPlayer);
				players.push(newPlayer);
				ws.send(JSON.stringify({type: 'GET_ME', payload: newPlayer}))
				noticeAllClients({type: 'GET_PLAYERS', payload: players});
				break;
			case 'PLAYER_MOVE':

						console.log("parsedData.payload", parsedData.payload);
					console.log("players", players);
				players = players.map(player => {
					if(player.id === parsedData.payload.id) {
						player = parsedData.payload;
					}
					return player;
				})

				noticeAllClients({type: 'GET_PLAYERS', payload: players});
			default:
		}
	});
});

server.listen(port, () => console.log(`Listening on port ${port}`));