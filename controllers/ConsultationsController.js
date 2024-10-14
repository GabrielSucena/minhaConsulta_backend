const db = require('../db/database');

exports.getConsultations = (req, res) => {
  db.all(`SELECT * FROM consultations`, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
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