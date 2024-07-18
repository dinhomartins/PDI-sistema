import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function DetalhesAvaliacao() {
  const [avaliacao, setAvaliacao] = useState(null);
  const [campos, setCampos] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const fetchAvaliacao = async () => {
      const res = await fetch(`/api/avaliacoes/${id}`);
      const data = await res.json();
      if (res.ok) {
        setAvaliacao(data.avaliacao);
        setCampos(data.campos);
      } else {
        console.error(data.error);
      }
    };

    if (id) {
      fetchAvaliacao();
    }
  }, [id]);

  const handleChange = (index, event) => {
    const values = [...campos];
    values[index][event.target.name] = event.target.value;
    setCampos(values);
  };

  const handleAddFields = () => {
    setCampos([...campos, { feedback: '', nota: '' }]);
  };

  const handleSave = async () => {
    const res = await fetch(`/api/avaliacoes/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(campos),
    });

    if (res.ok) {
      alert('Avaliação alterada com sucesso');
      setIsEditing(false);
    } else {
      const errorData = await res.json();
      alert(`Erro ao atualizar avaliação: ${errorData.error} - ${errorData.details}`);
    }
  };

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
            {campos.map((campo, index) => (
              <div key={index} className="mb-4">
                <label className="block mb-2">Feedback</label>
                {isEditing ? (
                  <input
                    type="text"
                    name="feedback"
                    className="border p-2 w-full mb-2"
                    value={campo.feedback}
                    onChange={(event) => handleChange(index, event)}
                  />
                ) : (
                  <p>{campo.feedback}</p>
                )}
                <label className="block mb-2">Nota</label>
                {isEditing ? (
                  <input
                    type="number"
                    name="nota"
                    className="border p-2 w-full"
                    value={campo.nota}
                    onChange={(event) => handleChange(index, event)}
                  />
                ) : (
                  <p>{campo.nota}</p>
                )}
              </div>
            ))}
            {isEditing && (
              <button
                type="button"
                onClick={handleAddFields}
                className="bg-blue-500 text-white py-2 px-4 rounded-lg mb-4"
              >
                Adicionar Campo
              </button>
            )}
            {isEditing ? (
              <button
                onClick={handleSave}
                className="bg-green-500 text-white py-2 px-4 rounded-lg"
              >
                Salvar
              </button>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="bg-yellow-500 text-white py-2 px-4 rounded-lg"
              >
                Editar
              </button>
            )}
            <button
              onClick={() => router.back()}
              className="bg-gray-500 text-white py-2 px-4 rounded-lg ml-2"
            >
              Voltar
            </button>
          </>
        ) : (
          <p>Carregando...</p>
        )}
      </div>
    </div>
  );
}
