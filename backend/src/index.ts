import http from 'http';
import { Server, Socket } from 'socket.io';
import { test } from './db/queries'


const server = http.createServer();
const io = new Server(server);

const PORT = 5000;

interface Player {
  name: string;
  socket_id: string
}

const players: Player[] = [
  // active players go here
];

test()

function findPlayerNameBySocketId(socketId: string): string {
  const player = players.find((p) => p.socket_id === socketId);
  return player ? player.name : 'Anonymous';
}

io.on('connect', (socket: Socket) => {
  console.log(`\x1b[32mNew client connected!\x1b[0m\nClient ID: ${socket.id}\n`);

  socket.on('login', (name: String, password: String) => {
    // check db 
    // push to active users
  })

  socket.on('register', (name: String, password: String) => {
    // check db 
    // insert into db
    // push to active users
  })

  socket.on('new-achievement', (achiev_id: number) => {
    // save to db
    // 
    const player_name = findPlayerNameBySocketId(socket.id);
    socket.emit('new-achievment', player_name, achiev_id);
  });

  socket.on('disconnect', () => {
    console.log(`\x1b[31mClient disconnected!\x1b[0m\nClient ID: ${socket.id}\n`);
  });

});

server.listen(PORT, () => {
  console.log(`WebSocket server is running on port ${PORT}`);
});