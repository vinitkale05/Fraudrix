import { Request, Response } from 'express';
import Transaction from '../../models/Transaction';
import { getActiveRules } from '../modules/rules/rule.service';
import { calculateRiskScore } from '../../utils/riskEngine';
import { io } from '../../index';

export const createTransaction = async (req: Request, res: Response) => {
  try {
    const txData = req.body;
    
    // 1. Fetch active rules
    const rules = await getActiveRules();

    // 2. Calculate Risk Score
    const riskScore = calculateRiskScore(txData, rules);

    // 3. Determine Status
    let status: 'SAFE' | 'FLAGGED' | 'SUSPICIOUS' = 'SAFE';
    if (riskScore > 80) status = 'FLAGGED';
    else if (riskScore > 40) status = 'SUSPICIOUS';

    // 4. Save to MongoDB
    const transaction = new Transaction({
      ...txData,
      riskScore,
      status
    });

    await transaction.save();

    // 5. If High Risk, emit WebSocket Alert
    if (status === 'FLAGGED') {
      io.emit('new_alert', {
        message: 'High Risk Transaction Detected',
        transactionId: transaction.transactionId,
        riskScore,
        amount: transaction.amount,
        location: transaction.location
      });
    }

    res.status(201).json({
      success: true,
      transactionId: transaction.transactionId,
      riskScore,
      status
    });

  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : String(error) });
  }
};

export const getTransactions = async (req: Request, res: Response) => {
  try {
    const { status } = req.query;
    const filter = status ? { status } : {};
    const transactions = await Transaction.find(filter).sort({ createdAt: -1 }).limit(100);
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : String(error) });
  }
};

export const updateTransactionStatus = async (req: Request, res: Response) => {
  try {
    const { transactionId } = req.params;
    const { status } = req.body;

    const allowedStatuses = ['FLAGGED', 'SAFE', 'SUSPICIOUS', 'CONFIRMED_FRAUD', 'FALSE_POSITIVE', 'RESOLVED', 'UNDER_INVESTIGATION'];
    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({ error: 'Invalid status value.' });
    }

    const transaction = await Transaction.findOneAndUpdate(
      { transactionId },
      { status },
      { new: true }
    );

    if (!transaction) {
      return res.status(404).json({ error: 'Transaction not found.' });
    }

    res.status(200).json({ success: true, transaction });
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : String(error) });
  }
};

export const generateInvestigationReport = async (req: Request, res: Response) => {
  try {
    const { transactionId } = req.params;
    const transaction = await Transaction.findOne({ transactionId });

    if (!transaction) {
      return res.status(404).json({ error: 'Transaction not found.' });
    }

    // Generate dynamic mock report data based on transaction properties
    const triggers = [
      transaction.amount > 50000 ? "High value transaction anomaly detected" : "Typical transaction value for entity",
      transaction.riskScore > 70 ? "Critical deviation from historical behavioral profile" : "Slight variation in usage pattern",
      "IP Geolocation inconsistency (Mismatch between login and checkout)",
      "Velocity Check: Multiple attempts within 60-second window"
    ];

    const verdict = transaction.riskScore > 70 
      ? "HIGH RISK: The transaction patterns strongly suggest a non-human agent or a sophisticated account takeover. Immediate isolation of the account and funds is mandatory."
      : "MEDIUM RISK: While some signals are abnormal, the historical context of the user provides a baseline. Manual verification of the shipping address is recommended.";

    const report = {
      transactionId: transaction.transactionId,
      timestamp: new Date().toISOString(),
      riskScore: transaction.riskScore,
      amount: transaction.amount,
      triggers,
      verdict,
      analysisTime: "482ms",
      engineVersion: "4.2.0-core"
    };

    res.status(200).json(report);
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : String(error) });
  }
};

