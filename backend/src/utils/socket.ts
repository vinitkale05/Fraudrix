import { Server } from 'socket.io';
import { Server as HttpServer } from 'http';

let io: Server;

export const initSocket = (server: HttpServer) => {
  io = new Server(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST']
    }
  });

  io.on('connection', (socket) => {
    console.log('User connected to forensics stream:', socket.id);
  });

  return io;
};

export const getIO = () => {
  if (!io) {
    // Return a dummy object if not initialized yet to prevent crashes
    return { emit: () => {} } as any;
  }
  return io;
};
