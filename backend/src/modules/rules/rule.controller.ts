import { Request, Response } from 'express';
import { supabase } from '../../config/supabase';

export const createRule = async (req: Request, res: Response) => {
  try {
    const { name, logic, priority, weight } = req.body;

    const { data, error } = await supabase
      .from('rules')
      .insert([{ name, logic, priority, weight, isActive: true }])
      .select();

    if (error) throw error;

    res.status(201).json(data[0]);
  } catch (error) {
    res.status(400).json({ error: error instanceof Error ? error.message : String(error) });
  }
};

export const getAllRules = async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabase
      .from('rules')
      .select('*');

    if (error) throw error;

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : String(error) });
  }
};

export const updateRule = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const { data, error } = await supabase
      .from('rules')
      .update(updates)
      .eq('id', id)
      .select();

    if (error) throw error;

    res.status(200).json(data[0]);
  } catch (error) {
    res.status(400).json({ error: error instanceof Error ? error.message : String(error) });
  }
};

export const deleteRule = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const { error } = await supabase
      .from('rules')
      .delete()
      .eq('id', id);

    if (error) throw error;

    res.status(200).json({ message: 'Rule deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error instanceof Error ? error.message : String(error) });
  }
};
