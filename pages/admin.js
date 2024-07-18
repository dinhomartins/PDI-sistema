import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Admin() {
  const [usuarios, setUsuarios] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchUsuarios = async () => {
      const res = await fetch('/api/usuarios');
      const data = await res.json();
      setUsuarios(data);
    };

    fetchUsuarios();
  }, []);

  const handleDelete = async (id) => {
    const res = await fetch(`/api/usuarios/${id}`, {
      method: 'DELETE',
    });

    if (res.ok) {
      setUsuarios(usuarios.filter((usuario) => usuario.id !== id));
    } else {
      alert('Erro ao excluir usuário');
    }
  };

  const handleEdit = (id) => {
    router.push(`/admin/edit/${id}`);
  };

  const handleAddFuncionario = () => {
    router.push('/admin/add/funcionario');
  };

  const handleAddGestor = () => {
    router.push('/admin/add/gestor');
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <div className="flex justify-between mb-4">
        <button onClick={handleAddFuncionario} className="bg-blue-500 text-white p-2 rounded">
          Cadastrar Funcionário
        </button>
        <button onClick={handleAddGestor} className="bg-green-500 text-white p-2 rounded">
          Cadastrar Gestor
        </button>
      </div>
      <div className="bg-white p-6 rounded shadow-md">
        <h2 className="text-2xl mb-4">Lista de Usuários</h2>
        <div className="flex justify-between">
          <div>
            <h3 className="text-xl mb-2">Funcionários</h3>
            <ul>
              {usuarios.filter(u => u.tipo_usuario === 'funcionario').map((usuario) => (
                <li key={usuario.id} className="mb-2 p-2 border rounded flex justify-between">
                  <span>{usuario.nome}</span>
                  <div>
                    <button onClick={() => handleEdit(usuario.id)} className="bg-yellow-500 text-white p-1 rounded mr-2">
                      Editar
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xl mb-2">Gestores</h3>
            <ul>
              {usuarios.filter(u => u.tipo_usuario === 'gestor').map((usuario) => (
                <li key={usuario.id} className="mb-2 p-2 border rounded flex justify-between">
                  <span>{usuario.nome}</span>
                  <div>
                    <button onClick={() => handleEdit(usuario.id)} className="bg-yellow-500 text-white p-1 rounded mr-2">
                      Editar
                    </button>
                    <button onClick={() => handleDelete(usuario.id)} className="bg-red-500 text-white p-1 rounded">
                      Excluir
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
