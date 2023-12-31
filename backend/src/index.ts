import http from 'http';
const bcrypt = require('bcrypt');
import { Server, Socket } from 'socket.io';
import * as query from './db/queries';


const server = http.createServer();
const io = new Server(server, {
  cors: {
    origin: ['https://szyjar.github.io', 'http://localhost:3000'],
  }
});

const PORT = 5000;
const saltRounds = 12;

interface Player {
  player_id: number
  name: string
  socket_id: string
}

interface PlayersMap {
  [socket_id: string]: Player
}

const players: PlayersMap = {
  // Active players go here
}

io.on('connect', (socket: Socket): void => {
  console.log(`\n\x1b[32mNew client connected!\x1b[0m\nClient ID: ${socket.id}`);

  socket.on('login', async (name: string, password: string): Promise<void> => {
    // Check db
    const user = await query.selectUser(name);
    if (user !== null){
      const isValidPassword = await bcrypt.compareSync(password, user.password);
      if (isValidPassword) {
        // Push to active player list
        if(!players.hasOwnProperty(socket.id)) {
          const newPlayer: Player = { player_id: user.id, name: user.name, socket_id: socket.id };
          players[newPlayer.socket_id] = newPlayer;
        }
        socket.emit('logged-in', user.name);
      } else {
        socket.emit('log-in-fail');
      }
    } else {
      socket.emit('log-in-fail');
    }
  })

  socket.on('register', async (name: string, password: string): Promise<void> => {
    // Check db
    const user = await query.selectUser(name);
    // Insert into db
    if(!user) {
      try {
        const hash = await bcrypt.hash(password, saltRounds);
        const new_user_id = await query.createUser(name, hash);
        // Push to active users
        const newPlayer: Player = { player_id: new_user_id, name: name, socket_id: socket.id };
        players[newPlayer.socket_id] = newPlayer;
        socket.emit('logged-in', name);
      } catch (error) {
        console.log('Error in register: ', error);
        socket.emit('fail');
      }
    } else {
      socket.emit('register-fail');
    }
  })

  socket.on('new-achievement', async (achiev_id: number): Promise<void | boolean> => {
    try {
      let player: Player = {
        player_id: 0,
        name: 'Anonymous',
        socket_id: '0'
      }
      if(players.hasOwnProperty(socket.id)) {
        player = players[socket.id];
        const already_exist = await query.getOneAchievment(player.player_id, achiev_id);
        if(already_exist) {
          // Achievement already scored, stop here
          return false;
        }
        const scored = await query.scoreAchievement(player.player_id, achiev_id);
      }
      const achiev_name = await query.getAchievName(achiev_id);
      socket.broadcast.emit('new-achievement', player.name, achiev_name);
      socket.emit('new-achievement', player.name, achiev_name);
    } catch (error) {
      console.log('Error in new-achievement: ', error);
      socket.emit('fail');
    }
  });

  socket.on('get-achievements', async (): Promise<void> => {
    if(players.hasOwnProperty(socket.id)) {
      const player = players[socket.id];
      const achievements = await query.getAchievements(player.player_id)
      socket.emit('achievements', achievements);
    } else {
      socket.emit('fail');
    }
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