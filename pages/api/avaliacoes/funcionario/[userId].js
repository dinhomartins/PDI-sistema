import { pool } from '../../../../lib/db';

export default async function handler(req, res) {
  const { userId } = req.query;

  if (req.method === 'GET') {
    try {
      const [avaliacoes] = await pool.query('SELECT * FROM avaliacoes WHERE id_funcionario = ?', [userId]);

      if (avaliacoes.length === 0) {
        return res.status(200).json([]);
      }

      const avaliacoesComMedia = await Promise.all(avaliacoes.map(async (avaliacao) => {
        const [campos] = await pool.query('SELECT * FROM campos_avaliacao WHERE id_avaliacao = ?', [avaliacao.id]);
        const mediaNota = campos.length > 0 ? (campos.reduce((acc, campo) => acc + campo.nota, 0) / campos.length).toFixed(2) : null;
        return { ...avaliacao, mediaNota };
      }));

      res.status(200).json(avaliacoesComMedia);
    } catch (error) {
      console.error('Erro ao buscar avaliações no banco de dados:', error);
      res.status(500).json({ error: 'Database query failed', details: error });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
