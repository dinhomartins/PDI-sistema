import { pool } from '../../../lib/db';

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      const [avaliacao] = await pool.query('SELECT * FROM avaliacoes WHERE id = ?', [id]);
      if (avaliacao.length === 0) {
        return res.status(404).json({ error: 'Avaliação não encontrada' });
      }

      const [campos] = await pool.query('SELECT * FROM campos_avaliacao WHERE id_avaliacao = ?', [id]);
      res.status(200).json({ avaliacao: avaliacao[0], campos });
    } catch (error) {
      console.error('Erro ao buscar avaliação no banco de dados:', error);
      res.status(500).json({ error: 'Database query failed', details: error });
    }
  } else if (req.method === 'POST') {
    const { id_funcionario, id_gestor, campos } = req.body;
    try {
      const [result] = await pool.query(
        'INSERT INTO avaliacoes (id_funcionario, id_gestor) VALUES (?, ?)',
        [id_funcionario, id_gestor]
      );
      const avaliacaoId = result.insertId;

      for (const campo of campos) {
        await pool.query(
          'INSERT INTO campos_avaliacao (id_avaliacao, feedback, nota) VALUES (?, ?, ?)',
          [avaliacaoId, campo.feedback, campo.nota]
        );
      }
      res.status(200).json({ message: 'Avaliação adicionada com sucesso' });
    } catch (error) {
      console.error('Erro ao adicionar avaliação no banco de dados:', error);
      res.status(500).json({ error: 'Database insertion failed', details: error });
    }
  } else if (req.method === 'PUT') {
    const campos = req.body;
    try {
      await pool.query('DELETE FROM campos_avaliacao WHERE id_avaliacao = ?', [id]);

      for (const campo of campos) {
        await pool.query(
          'INSERT INTO campos_avaliacao (id_avaliacao, feedback, nota) VALUES (?, ?, ?)',
          [id, campo.feedback, campo.nota]
        );
      }
      res.status(200).json({ message: 'Avaliação atualizada com sucesso' });
    } catch (error) {
      console.error('Erro ao atualizar avaliação no banco de dados:', error);
      res.status(500).json({ error: 'Database update failed', details: error });
    }
  } else if (req.method === 'DELETE') {
    try {
      await pool.query('DELETE FROM campos_avaliacao WHERE id_avaliacao = ?', [id]);
      await pool.query('DELETE FROM avaliacoes WHERE id = ?', [id]);
      res.status(200).json({ message: 'Avaliação excluída com sucesso' });
    } catch (error) {
      console.error('Erro ao excluir avaliação no banco de dados:', error);
      res.status(500).json({ error: 'Database deletion failed', details: error });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
