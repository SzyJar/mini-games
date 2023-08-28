import http from 'http';
import { Server, Socket } from 'socket.io';


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

io.on('connection', (socket: Socket) => {
  console.log(`\x1b[32mNew client connected!\x1b[0m\nClient ID: ${socket.id}\n`);

  socket.on('new-achievement', (id: number) => {
    // save to db
    // 
    const player_name = players.find((p) => p.socket_id === socket.id);
    io.emit('new-achievment', player_name, id);
  });

  socket.on('disconnect', () => {
    console.log(`\x1b[31mClient disconnected!\x1b[0m\nClient ID: ${socket.id}\n`);
  });
});

server.listen(PORT, () => {
  console.log(`WebSocket server is running on port ${PORT}`);
});