import mongoose, { Schema, Document } from 'mongoose';

export interface ITransaction extends Document {
  transactionId: string;
  userId: string;
  amount: number;
  currency: string;
  location: {
    city: string;
    country: string;
    ip: string;
  };
  deviceInfo: {
    deviceId: string;
    type: string;
    os: string;
  };
  status: 'PENDING' | 'SAFE' | 'FLAGGED' | 'SUSPICIOUS';
  riskScore: number;
  metadata: any;
  createdAt: Date;
}

const TransactionSchema: Schema = new Schema({
  transactionId: { type: String, required: true, unique: true },
  userId: { type: String, required: true },
  amount: { type: Number, required: true },
  currency: { type: String, default: 'USD' },
  location: {
    city: String,
    country: String,
    ip: String,
  },
  deviceInfo: {
    deviceId: String,
    type: String,
    os: String,
  },
  status: { type: String, enum: ['PENDING', 'SAFE', 'FLAGGED', 'SUSPICIOUS'], default: 'PENDING' },
  riskScore: { type: Number, default: 0 },
  metadata: { type: Object },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<ITransaction>('Transaction', TransactionSchema);
