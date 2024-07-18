import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function EditarAvaliacao() {
  const [campos, setCampos] = useState([{ feedback: '', nota: '' }]);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const fetchAvaliacao = async () => {
      const res = await fetch(`/api/avaliacoes/${id}`);
      const data = await res.json();
      setCampos(data.campos);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`/api/avaliacoes/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(campos),
    });

    if (res.ok) {
      router.push('/gestor');
    } else {
      const errorData = await res.json();
      alert(`Erro ao atualizar avaliação: ${errorData.error} - ${errorData.details}`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl mb-4">Editar Avaliação</h2>
        {campos.map((campo, index) => (
          <div key={index} className="mb-4 flex items-center space-x-2">
            <div className="flex-1">
              <label htmlFor={`feedback-${index}`} className="block mb-2">Feedback</label>
              <input
                type="text"
                id={`feedback-${index}`}
                name="feedback"
                className="border p-2 w-full"
                value={campo.feedback}
                onChange={(event) => handleChange(index, event)}
                required
              />
            </div>
            <div className="flex-1">
              <label htmlFor={`nota-${index}`} className="block mb-2">Nota</label>
              <input
                type="number"
                id={`nota-${index}`}
                name="nota"
                className="border p-2 w-full"
                value={campo.nota}
                onChange={(event) => handleChange(index, event)}
                required
              />
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddFields}
          className="bg-blue-500 text-white py-2 px-4 rounded-lg mb-4"
        >
          Adicionar Campo
        </button>
        <button type="submit" className="bg-yellow-500 text-white py-2 px-4 rounded-lg">Salvar</button>
        <button onClick={() => router.push('/gestor')} className="bg-gray-500 text-white py-2 px-4 rounded-lg ml-2">Voltar</button>
      </form>
    </div>
  );
}
