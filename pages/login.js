import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, senha }),
    });

    const data = await res.json();
    if (data.success) {
      localStorage.setItem('userId', data.userId);  // Armazenando o ID do usuário
      localStorage.setItem('userType', data.tipo_usuario);  // Armazenando o tipo de usuário
      if (data.tipo_usuario === 'funcionario') {
        router.push('/funcionario');
      } else if (data.tipo_usuario === 'gestor') {
        router.push('/gestor');
      } else if (data.tipo_usuario === 'administrador') {
        router.push('/admin');
      }
    } else {
      alert('Credenciais inválidas');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl mb-4">Sistema PDI</h2>
        <div className="mb-4">
          <label htmlFor="email" className="block mb-2">Email</label>
          <input
            type="email"
            id="email"
            className="border p-2 w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="senha" className="block mb-2">Senha</label>
          <input
            type="password"
            id="senha"
            className="border p-2 w-full"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">Entrar</button>
      </form>
    </div>
  );
}
