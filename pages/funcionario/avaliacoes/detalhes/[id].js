import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function DetalhesAvaliacao() {
  const [avaliacao, setAvaliacao] = useState(null);
  const [campos, setCampos] = useState([]);
  const [mediaNota, setMediaNota] = useState(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const fetchAvaliacao = async () => {
      const res = await fetch(`/api/avaliacoes/${id}`);
      const data = await res.json();
      setAvaliacao(data.avaliacao);
      setCampos(data.campos);
      setMediaNota(data.mediaNota);
    };

    if (id) {
      fetchAvaliacao();
    }
  }, [id]);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        {avaliacao ? (
          <>
            <h2 className="text-2xl mb-4">Detalhes da Avaliação</h2>
            <p><strong>Data:</strong> {formatDate(avaliacao.data_avaliacao)}</p>
            <p><strong>Nota Média:</strong> {mediaNota !== null ? mediaNota : 'N/A'}</p>
            {campos.map((campo, index) => (
              <div key={index} className="mb-4">
                <p><strong>Feedback:</strong> {campo.feedback}</p>
                <p><strong>Nota:</strong> {campo.nota}</p>
              </div>
            ))}
            <button onClick={() => router.push('/funcionario')} className="bg-gray-500 text-white py-2 px-4 rounded-lg mt-4">Voltar</button>
          </>
        ) : (
          <p>Carregando...</p>
        )}
      </div>
    </div>
  );
}
