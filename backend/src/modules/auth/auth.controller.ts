import { Request, Response } from 'express';
import { supabase } from '../../config/supabase';
import jwt from 'jsonwebtoken';

export const signup = async (req: Request, res: Response) => {
  try {
    const { email, password, fullName, company } = req.body;

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { 
          full_name: fullName,
          company: company
        }
      }
    });

    if (error) throw error;

    res.status(201).json({
      message: 'User registered successfully. Please check your email for verification.',
      user: data.user
    });
  } catch (error) {
    res.status(400).json({ error: error instanceof Error ? error.message : String(error) });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) throw error;

    // Generate our own JWT if needed for internal microservices, 
    // or just return the Supabase session
    const token = jwt.sign(
      { userId: data.user.id, email: data.user.email },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: '24h' }
    );

    res.status(200).json({
      message: 'Login successful',
      token,
      user: data.user,
      session: data.session
    });
  } catch (error) {
    res.status(401).json({ error: error instanceof Error ? error.message : String(error) });
  }
};
