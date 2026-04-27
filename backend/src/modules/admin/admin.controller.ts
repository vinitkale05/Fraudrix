import { Request, Response } from 'express';
import { supabase } from '../../config/supabase';
import jwt from 'jsonwebtoken';
import Transaction from '../../models/Transaction';

// Hardcoded admin credentials (for demo; in production use a DB table)
const ADMIN_CREDENTIALS = {
  email: 'admin@fraudrix.ai',
  password: 'Admin@123'
};

export const adminLogin = async (req: Request, res: Response) => {
  console.log(`[Admin] Login attempt for: ${req.body.email}`);
  try {
    const { email, password } = req.body;

    if (email !== ADMIN_CREDENTIALS.email || password !== ADMIN_CREDENTIALS.password) {
      return res.status(401).json({ error: 'Invalid admin credentials.' });
    }

    const token = jwt.sign(
      { userId: 'admin-001', email, role: 'admin' },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: '8h' }
    );

    res.status(200).json({
      message: 'Admin login successful',
      token,
      user: {
        id: 'admin-001',
        email,
        role: 'admin',
        user_metadata: { full_name: 'System Administrator' }
      }
    });
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : String(error) });
  }
};

export const getAdminStats = async (req: Request, res: Response) => {
  try {
    const totalTransactions = await Transaction.countDocuments({});
    const flagged = await Transaction.countDocuments({ status: 'FLAGGED' });
    const safe = await Transaction.countDocuments({ status: 'SAFE' });
    const confirmedFraud = await Transaction.countDocuments({ status: 'CONFIRMED_FRAUD' });
    const resolved = await Transaction.countDocuments({ status: 'RESOLVED' });
    const falsePositive = await Transaction.countDocuments({ status: 'FALSE_POSITIVE' });
    const investigating = await Transaction.countDocuments({ status: 'UNDER_INVESTIGATION' });

    // Revenue stats
    const allTx = await Transaction.find({}).select('amount riskScore createdAt status');
    const totalVolume = allTx.reduce((sum, tx) => sum + tx.amount, 0);
    const avgRisk = allTx.length ? Math.round(allTx.reduce((sum, tx) => sum + tx.riskScore, 0) / allTx.length) : 0;
    const fraudRate = totalTransactions > 0 ? ((flagged + confirmedFraud) / totalTransactions * 100).toFixed(1) : '0';

    // Last 24h
    const yesterday = new Date(Date.now() - 86400000);
    const last24h = await Transaction.countDocuments({ createdAt: { $gte: yesterday } });
    const last24hFlagged = await Transaction.countDocuments({ status: 'FLAGGED', createdAt: { $gte: yesterday } });

    // Recent transactions (last 10)
    const recent = await Transaction.find({}).sort({ createdAt: -1 }).limit(10);

    // Registered users (from Supabase)
    let totalUsers = 0;
    try {
      const { data } = await supabase.auth.admin.listUsers();
      totalUsers = data?.users?.length || 0;
    } catch {
      totalUsers = 0; // If Supabase admin API fails
    }

    res.status(200).json({
      overview: {
        totalTransactions,
        totalVolume,
        avgRisk,
        fraudRate: parseFloat(fraudRate as string),
        totalUsers
      },
      statusBreakdown: {
        flagged,
        safe,
        confirmedFraud,
        resolved,
        falsePositive,
        investigating
      },
      activity: {
        last24h,
        last24hFlagged
      },
      recentTransactions: recent
    });
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : String(error) });
  }
};

export const listUsers = async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabase.auth.admin.listUsers();
    if (error) throw error;
    const users = (data?.users || []).map(u => ({
      id: u.id,
      email: u.email,
      fullName: u.user_metadata?.full_name || '',
      company: u.user_metadata?.company || '',
      createdAt: u.created_at,
      lastSignIn: u.last_sign_in_at
    }));
    res.status(200).json(users);
  } catch (error) {
    res.status(200).json([]); // Graceful fallback
  }
};

export const deleteAllTransactions = async (req: Request, res: Response) => {
  try {
    await Transaction.deleteMany({});
    res.status(200).json({ success: true, message: 'All transactions purged.' });
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : String(error) });
  }
};
