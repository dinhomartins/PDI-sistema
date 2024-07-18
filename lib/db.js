import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: 'localhost',     // Substitua pelo seu host do MySQL
  user: 'root',          // Substitua pelo seu usuário do MySQL
  password: '02121985',  // Substitua pela sua senha do MySQL
  database: 'sistema_avaliacao', // Substitua pelo seu banco de dados
});

export { pool };