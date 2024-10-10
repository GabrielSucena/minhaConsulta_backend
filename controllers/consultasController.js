const db = require('../db/database');

// Obter todas as consultas
exports.getConsultations = (req, res) => {
    db.all('SELECT * FROM consultations', [], (err, rows) => {
        if (err) {
            console.error(err.message);
            res.status(500).json({ error: 'Erro ao obter consultas' });
        } else {
            res.json(rows);
        }
    });
};

// Criar uma nova consulta
exports.createConsultation = (req, res) => {
    const { doctor, date, status, userId } = req.body;
    db.run('INSERT INTO consultations (doctor, date, status, userId) VALUES (?, ?, ?, ?)', [doctor, date, status, userId], function (err) {
        if (err) {
            console.error(err.message);
            res.status(500).json({ error: 'Erro ao criar consulta' });
        } else {
            res.status(201).json({ message: 'Consulta criada com sucesso', id: this.lastID });
        }
    });
};

// Atualizar consulta
exports.updateConsultation = (req, res) => {
    const { id } = req.params;
    const { doctor, date, status } = req.body;

    db.run('UPDATE consultations SET doctor = ?, date = ?, status = ? WHERE id = ?', [doctor, date, status, id], function (err) {
        if (err) {
            console.error(err.message);
            res.status(500).json({ error: 'Erro ao atualizar consulta' });
        } else {
            res.status(200).json({ message: 'Consulta atualizada com sucesso' });
        }
    });
};

// Deletar consulta
exports.deleteConsultation = (req, res) => {
    const { id } = req.params;

    db.run('DELETE FROM consultations WHERE id = ?', [id], function (err) {
        if (err) {
            console.error(err.message);
            res.status(500).json({ error: 'Erro ao deletar consulta' });
        } else {
            res.status(200).json({ message: 'Consulta deletada com sucesso' });
        }
    });
};