import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Gestor() {
  const [funcionarios, setFuncionarios] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchFuncionarios = async () => {
      const userId = localStorage.getItem('userId');
      const res = await fetch(`/api/gestor?userId=${userId}`);
      const data = await res.json();
      setFuncionarios(data);
    };

    fetchFuncionarios();
  }, []);

  const handleAvaliar = (id) => {
    router.push(`/gestor/avaliar/${id}`);
  };

  const handleVerAvaliacoes = (id) => {
    router.push(`/gestor/avaliacoes/${id}`);
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-3xl mx-auto">
        <h2 className="text-2xl mb-4">Meus Funcionários</h2>
        {funcionarios.length === 0 ? (
          <p>Você ainda não tem funcionários para avaliar.</p>
        ) : (
          <ul>
            {funcionarios.map((funcionario) => (
              <li key={funcionario.id} className="mb-4 p-4 border rounded flex justify-between">
                <span>{funcionario.nome}</span>
                <div>
                  <button onClick={() => handleAvaliar(funcionario.id)} className="bg-blue-500 text-white p-2 rounded mr-2">
                    Avaliar
                  </button>
                  <button onClick={() => handleVerAvaliacoes(funcionario.id)} className="bg-green-500 text-white p-2 rounded">
                    Ver Avaliações
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
