import { pool } from '../../../lib/db';

export default async function handler(req, res) {
  const { nome, email, senha, cpf, data_nascimento, cargo, area_atuacao, tipo_usuario } = req.body;

  try {
    await pool.query(
      'INSERT INTO usuarios (nome, email, senha, cpf, data_nascimento, cargo, area_atuacao, tipo_usuario) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [nome, email, senha, cpf, data_nascimento, cargo, area_atuacao, tipo_usuario]
    );
    res.status(200).json({ message: 'Usuário adicionado com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Database insertion failed' });
  }
}
