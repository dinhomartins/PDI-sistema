import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Avaliacoes() {
  const [avaliacoes, setAvaliacoes] = useState([]);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const fetchAvaliacoes = async () => {
      const res = await fetch(`/api/avaliacoes/funcionario/${id}`);
      const data = await res.json();
      if (res.ok) {
        setAvaliacoes(data);
      } else {
        console.error(data.error);
      }
    };

    if (id) {
      fetchAvaliacoes();
    }
  }, [id]);

  const handleVerDetalhes = (avaliacaoId) => {
    router.push(`/gestor/avaliacoes/detalhes/${avaliacaoId}`);
  };

  const handleExcluir = async (avaliacaoId) => {
    if (confirm("Realmente deseja excluir essa avaliação?")) {
      const res = await fetch(`/api/avaliacoes/${avaliacaoId}`, {
        method: 'DELETE'
      });

      if (res.ok) {
        alert('Avaliação excluída com sucesso');
        setAvaliacoes(avaliacoes.filter(avaliacao => avaliacao.id !== avaliacaoId));
      } else {
        const errorData = await res.json();
        alert(`Erro ao excluir avaliação: ${errorData.error} - ${errorData.details}`);
      }
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-3xl mx-auto">
        <h2 className="text-2xl mb-4">Avaliações do Funcionário</h2>
        {avaliacoes.length === 0 ? (
          <p>Este funcionário ainda não tem avaliações.</p>
        ) : (
          <ul>
            {avaliacoes.map((avaliacao) => (
              <li key={avaliacao.id} className="mb-4 p-4 border rounded flex justify-between items-center">
                <div>
                  <p><strong>Data:</strong> {new Date(avaliacao.data_avaliacao).toLocaleDateString()}</p>
                  <p><strong>Nota Média:</strong> {avaliacao.mediaNota !== 'N/A' ? parseFloat(avaliacao.mediaNota).toFixed(2) : 'N/A'}</p>
                </div>
                <div>
                  <button
                    onClick={() => handleVerDetalhes(avaliacao.id)}
                    className="bg-blue-500 text-white py-2 px-4 rounded-lg mr-2"
                  >
                    Ver Detalhes
                  </button>
                  <button
                    onClick={() => handleExcluir(avaliacao.id)}
                    className="bg-red-500 text-white py-2 px-4 rounded-lg"
                  >
                    Excluir
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
        <button onClick={() => router.push('/gestor')} className="bg-gray-500 text-white py-2 px-4 rounded-lg mt-4">Voltar</button>
      </div>
    </div>
  );
}
