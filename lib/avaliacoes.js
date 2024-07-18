import { pool } from '../../lib/db';

export default async function handler(req, res) {
  const { userId } = req.query;

  if (!userId) {
    return res.status(400).json({ error: 'User ID is required' });
  }

  try {
    const [rows] = await pool.query('SELECT * FROM avaliacoes WHERE id_funcionario = ?', [userId]);
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Database query failed' });
  }
}
