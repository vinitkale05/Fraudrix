import http from 'http';
import { Server } from 'socket.io';
import app from './app';
import connectDB from './config/db';

const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

const server = http.createServer(app);

// Socket.io Setup
const io = new Server(server, {
  cors: {
    origin: '*', // In production, replace with your frontend URL
    methods: ['GET', 'POST']
  }
});

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// --- SIMULATION MODE ---
// Generate a random transaction every 5 seconds to keep the dashboard "alive"
import Transaction from './models/Transaction';
setInterval(async () => {
  try {
    const isFraud = Math.random() > 0.8;
    const newTx = new Transaction({
      transactionId: 'TX-' + Math.floor(Math.random() * 1000000),
      userId: 'USR-' + Math.floor(Math.random() * 1000),
      amount: Math.floor(Math.random() * 200000) + 1000, // INR 1,000 to 200,000
      status: isFraud ? 'FLAGGED' : 'SAFE',
      riskScore: isFraud ? Math.floor(Math.random() * 40) + 60 : Math.floor(Math.random() * 20),
      location: { country: 'India', city: ['Mumbai', 'Delhi', 'Bangalore', 'Pune'][Math.floor(Math.random() * 4)], ip: '192.168.1.1' }
    });
    await newTx.save();
    
    // Broadcast to all connected clients
    io.emit('new_transaction', newTx);
    
    if (isFraud) {
      io.emit('new_alert', {
        message: 'High Risk Transaction Detected (SIMULATED)',
        transactionId: newTx.transactionId,
        riskScore: newTx.riskScore
      });
    }
  } catch (e) {
    // Silence simulation errors
  }
}, 5000);
// ------------------------

// Export io to be used in other modules
export { io };

server.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
