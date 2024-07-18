import { pool } from '../../lib/db';

export default async function handler(req, res) {
  const { email, senha } = req.body;

  const [rows] = await pool.query('SELECT * FROM usuarios WHERE email = ?', [email]);

  if (rows.length === 0) {
    return res.status(401).json({ success: false, message: 'Credenciais inválidas' });
  }

  const user = rows[0];
  const validPassword = senha === user.senha;

  if (!validPassword) {
    return res.status(401).json({ success: false, message: 'Credenciais inválidas' });
  }

  res.status(200).json({ success: true, userId: user.id, tipo_usuario: user.tipo_usuario });
}
