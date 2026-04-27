import { Request, Response } from 'express';
import Transaction from '../../models/Transaction';

export const getDashboardSummary = async (req: Request, res: Response) => {
  try {
    const totalTransactions = await Transaction.countDocuments();
    const flaggedTransactions = await Transaction.countDocuments({ status: 'FLAGGED' });
    
    // Calculate fraud rate
    const fraudRate = totalTransactions > 0 
      ? ((flaggedTransactions / totalTransactions) * 100).toFixed(2) + '%'
      : '0.00%';

    // Mock saved revenue logic in INR
    const savedRevenue = `₹${(flaggedTransactions * 85000).toLocaleString('en-IN')}`;

    // Get latest 3 transactions for the queue
    const latestTransactions = await Transaction.find().sort({ createdAt: -1 }).limit(3);

    res.status(200).json({
      totalTransactions: totalTransactions.toLocaleString(),
      fraudRate,
      savedRevenue,
      criticalAlerts: flaggedTransactions,
      latestTransactions
    });
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : String(error) });
  }
};

export const getRiskTrends = async (req: Request, res: Response) => {
  try {
    // Basic aggregation for risk trends over the last 7 days
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const trends = await Transaction.aggregate([
      { $match: { createdAt: { $gte: sevenDaysAgo } } },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          averageRisk: { $avg: "$riskScore" },
          count: { $sum: 1 }
        }
      },
      { $sort: { "_id": 1 } }
    ]);

    res.status(200).json(trends);
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : String(error) });
  }
};

export const exportTransactions = async (req: Request, res: Response) => {
  try {
    const transactions = await Transaction.find().sort({ createdAt: -1 }).limit(100);
    
    let csv = 'Transaction ID,User ID,Amount,Risk Score,Status,Date\n';
    transactions.forEach(tx => {
      csv += `${tx.transactionId},${tx.userId},${tx.amount},${tx.riskScore},${tx.status},${tx.createdAt}\n`;
    });

    res.header('Content-Type', 'text/csv');
    res.attachment('transactions.csv');
    res.status(200).send(csv);
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : String(error) });
  }
};
