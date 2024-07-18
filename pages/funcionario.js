import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Funcionario() {
  const [avaliacoes, setAvaliacoes] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchAvaliacoes = async () => {
      const userId = localStorage.getItem('userId');
      const res = await fetch(`/api/avaliacoes/funcionario/${userId}`);
      const data = await res.json();
      setAvaliacoes(data);
    };

    fetchAvaliacoes();
  }, []);

  const handleVerDetalhes = (id) => {
    router.push(`/funcionario/avaliacoes/detalhes/${id}`);
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-3xl mx-auto">
        <h2 className="text-2xl mb-4">Minhas Avaliações</h2>
        {avaliacoes.length === 0 ? (
          <p>Você ainda não tem nenhuma avaliação de desempenho.</p>
        ) : (
          <ul>
            {avaliacoes.map((avaliacao) => (
              <li key={avaliacao.id} className="mb-4 p-4 border rounded flex justify-between items-center">
                <div>
                  <p><strong>Data:</strong> {new Date(avaliacao.data_avaliacao).toLocaleDateString()}</p>
                  <p><strong>Nota Média:</strong> {avaliacao.mediaNota !== 'N/A' ? parseFloat(avaliacao.mediaNota).toFixed(2) : 'N/A'}</p>
                </div>
                <button
                  onClick={() => handleVerDetalhes(avaliacao.id)}
                  className="bg-blue-500 text-white py-2 px-4 rounded-lg"
                >
                  Ver Detalhes
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
