import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function EditUsuario() {
  const [form, setForm] = useState({
    nome: '',
    email: '',
    cpf: '',
    data_nascimento: '',
    cargo: '',
    area_atuacao: 'tecnologia',
  });

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const fetchUsuario = async () => {
      const res = await fetch(`/api/usuarios/${id}`);
      const data = await res.json();
      setForm(data);
    };

    if (id) {
      fetchUsuario();
    }
  }, [id]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`/api/usuarios/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      router.push('/admin');
    } else {
      alert('Erro ao atualizar usuário');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl mb-4">Editar Usuário</h2>
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
        {form.tipo_usuario === 'funcionario' && (
          <>
            <div className="mb-4">
              <label htmlFor="cpf" className="block mb-2">CPF</label>
              <input
                type="text"
                id="cpf"
                name="cpf"
                className="border p-2 w-full"
                value={form.cpf}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="data_nascimento" className="block mb-2">Data de Nascimento</label>
              <input
                type="date"
                id="data_nascimento"
                name="data_nascimento"
                className="border p-2 w-full"
                value={form.data_nascimento}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="cargo" className="block mb-2">Cargo</label>
              <input
                type="text"
                id="cargo"
                name="cargo"
                className="border p-2 w-full"
                value={form.cargo}
                onChange={handleChange}
                required
              />
            </div>
          </>
        )}
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
