import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Avaliar() {
  const [campos, setCampos] = useState([{ feedback: '', nota: '' }]);
  const router = useRouter();
  const { id } = router.query;

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
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id_funcionario: id,
        id_gestor: localStorage.getItem('userId'), // Ajuste conforme necessário
        campos
      }),
    });

    if (res.ok) {
      alert('Avaliação adicionada com sucesso');
      router.push(`/gestor/avaliacoes/${id}`);
    } else {
      const errorData = await res.json();
      alert(`Erro ao avaliar funcionário: ${errorData.error} - ${errorData.details}`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl mb-4">Avaliar Funcionário</h2>
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
        <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded-lg">Salvar</button>
        <button onClick={() => router.back()} className="bg-gray-500 text-white py-2 px-4 rounded-lg ml-2">Voltar</button>
      </form>
    </div>
  );
}
