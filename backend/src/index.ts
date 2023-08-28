import http from 'http';
const bcrypt = require('bcrypt');
import { Server, Socket } from 'socket.io';
import { selectUser, createUser } from './db/queries';


const server = http.createServer();
const io = new Server(server);

const PORT = 5000;
const saltRounds = 12;

interface Player {
  name: string;
  socket_id: string
}

interface PlayersMap {
  [socket_id: string]: Player;
}

const players: PlayersMap = {
  // Active players goes here
}

io.on('connect', (socket: Socket): void => {
  console.log(`\n\x1b[32mNew client connected!\x1b[0m\nClient ID: ${socket.id}`);

  socket.on('login', async (name: string, password: string): Promise<void> => {
    // Check db
    const user = await selectUser(name);
    if (user !== null){
      const isValidPassword = await bcrypt.compareSync(password, user.password);
      if (isValidPassword) {
        // Push to active player list
        if(!players.hasOwnProperty(socket.id)) {
          const newPlayer: Player = { name: user.name, socket_id: socket.id };
          players[newPlayer.socket_id] = newPlayer;
        }
        socket.emit('success');
      }
    } else {
      socket.emit('fail');
    }
  })

  socket.on('register', async (name: string, password: string): Promise<void> => {
    // Check db
    const user = await selectUser(name);
    // Insert into db
    if(!user) {
      try {
        const hash = await bcrypt.hash(password, saltRounds);
        const new_user_id = await createUser(name, hash);
        // Push to active users
        const newPlayer: Player = { name: name, socket_id: socket.id };
        players[newPlayer.socket_id] = newPlayer;
        socket.emit('success');
      } catch (error) {
        console.log('Error in register: ', error);
        socket.emit('fail');
      }
    } else {
      socket.emit('fail');
    }
  })

  socket.on('new-achievement', (achiev_id: number): void => {
    // save to db
    // 
    const player_name = players[socket.id]
    socket.emit('new-achievment', player_name, achiev_id);
  });

  socket.on('disconnect', (): void => {
    console.log(`\n\x1b[31mClient disconnected!\x1b[0m\nClient ID: ${socket.id}`);
    if(players.hasOwnProperty(socket.id)) {
      delete players[socket.id];
    }
  });

});

server.listen(PORT, (): void => {
  console.log(`WebSocket server is running on port ${PORT}`);
});