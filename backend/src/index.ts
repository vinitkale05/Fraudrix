import http from 'http';
import app from './app';
import connectDB from './config/db';
import Transaction from './models/Transaction';
import { initSocket } from './utils/socket';

const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

const server = http.createServer(app);

// Socket.io Setup
const io = initSocket(server);

// --- SIMULATION MODE ---
// Generate a random transaction every 5 seconds to keep the dashboard "alive"
setInterval(async () => {
  try {
    const isFraud = Math.random() > 0.8;
    const newTx = new Transaction({
      transactionId: 'TX-' + Math.floor(Math.random() * 1000000),
      userId: 'USR-' + Math.floor(Math.random() * 1000),
      amount: Math.floor(Math.random() * 200000) + 1000, 
      status: isFraud ? 'FLAGGED' : 'SAFE',
      riskScore: isFraud ? Math.floor(Math.random() * 40) + 60 : Math.floor(Math.random() * 20),
      location: { 
        country: 'India', 
        city: ['Mumbai', 'Delhi', 'Bangalore', 'Pune'][Math.floor(Math.random() * 4)], 
        ip: '192.168.1.1' 
      },
      createdAt: new Date()
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

server.listen(PORT, () => {
  console.log(`[Fraudrix] Engine online on port ${PORT}`);
  console.log(`[Fraudrix] Simulation active...`);
});
