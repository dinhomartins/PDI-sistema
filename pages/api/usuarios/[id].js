import { pool } from '../../../lib/db';

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'PUT') {
    const { nome, email, cpf, data_nascimento, cargo, area_atuacao } = req.body;
    try {
      await pool.query(
        'UPDATE usuarios SET nome = ?, email = ?, cpf = ?, data_nascimento = ?, cargo = ?, area_atuacao = ? WHERE id = ?',
        [nome, email, cpf, data_nascimento, cargo, area_atuacao, id]
      );
      res.status(200).json({ message: 'Usuário atualizado com sucesso' });
    } catch (error) {
      res.status(500).json({ error: 'Database update failed' });
    }
  } else if (req.method === 'DELETE') {
    try {
      await pool.query('DELETE FROM usuarios WHERE id = ?', [id]);
      res.status(200).json({ message: 'Usuário excluído com sucesso' });
    } catch (error) {
      res.status(500).json({ error: 'Database deletion failed' });
    }
  }
}
