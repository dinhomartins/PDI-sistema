import { useState } from 'react';
import { useRouter } from 'next/router';

export default function AddGestor() {
  const [form, setForm] = useState({
    nome: '',
    email: '',
    senha: '123', // Senha padrão para simplificação
    area_atuacao: 'tecnologia',
  });

  const router = useRouter();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/usuarios/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...form, tipo_usuario: 'gestor' }),
    });

    if (res.ok) {
      router.push('/admin');
    } else {
      alert('Erro ao adicionar gestor');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl mb-4">Cadastrar Gestor</h2>
        <div className="mb-4">
          <label htmlFor="nome" className="block mb-2">Nome</label>
          <input
            type="text"
            id="nome"
            name="nome"
            className="border p-2 w-full"
            value={form.nome}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block mb-2">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            className="border p-2 w-full"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="area_atuacao" className="block mb-2">Área de Atuação</label>
          <select
            id="area_atuacao"
            name="area_atuacao"
            className="border p-2 w-full"
            value={form.area_atuacao}
            onChange={handleChange}
            required
          >
            <option value="tecnologia">Tecnologia</option>
            <option value="atendimento">Atendimento</option>
            <option value="vendas">Vendas</option>
            <option value="criativa">Criativa</option>
          </select>
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">Salvar</button>
        <button onClick={() => router.push('/admin')} className="bg-gray-500 text-white p-2 rounded ml-2">Voltar</button>
      </form>
    </div>
  );
}
