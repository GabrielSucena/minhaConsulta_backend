const db = require('../db/database');
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'seu-segredo-aqui';

exports.getConsultations = (req, res) => {
  // Extrair o token do cabeçalho da requisição
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
      return res.status(401).json({ error: 'Token não fornecido' });
  }

  // Verificar e decodificar o token JWT
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
          return res.status(403).json({ error: 'Falha na autenticação do token' });
      }

      const userId = decoded.id;
      const userRole = decoded.role;

      // Query diferente com base no papel do usuário
      let query = '';
      let params = [];

      if (userRole === 'admin') {
          // Administradores podem visualizar todas as consultas
          query = `SELECT * FROM consultations`;
      } else if (userRole === 'user') {
          // Usuários comuns só podem visualizar suas próprias consultas
          query = `SELECT * FROM consultations WHERE userId = ?`;
          params = [userId];
      }

      db.all(query, params, (err, rows) => {
          if (err) {
              return res.status(500).json({ error: err.message });
          }
          res.json({ consultations: rows });
      });
  });
};

exports.createConsultation = (req, res) => {
  const { userId, date, doctor, specialty, status } = req.body;
  db.run(`INSERT INTO consultations (userId, date, doctor, specialty, status) VALUES (?, ?, ?, ?, ?)`,
    [userId, date, doctor, specialty, status],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(201).json({ id: this.lastID });
    }
  );
};