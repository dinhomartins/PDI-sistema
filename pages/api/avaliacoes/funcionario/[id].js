import { pool } from '../../../../lib/db';

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      const [avaliacoes] = await pool.query('SELECT * FROM avaliacoes WHERE id_funcionario = ?', [id]);

      if (avaliacoes.length === 0) {
        return res.status(200).json([]);
      }

      const avaliacaoComMedia = await Promise.all(avaliacoes.map(async (avaliacao) => {
        const [campos] = await pool.query('SELECT * FROM campos_avaliacao WHERE id_avaliacao = ?', [avaliacao.id]);
        const mediaNota = campos.reduce((acc, campo) => acc + campo.nota, 0) / campos.length;
        return {
          ...avaliacao,
          mediaNota: mediaNota.toFixed(2)
        };
      }));

      res.status(200).json(avaliacaoComMedia);
    } catch (error) {
      console.error('Erro ao buscar avaliações no banco de dados:', error);
      res.status(500).json({ error: 'Database query failed', details: error });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
