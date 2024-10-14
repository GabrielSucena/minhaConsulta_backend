const express = require('express');
const router = express.Router();
const consultationsController = require('../controllers/ConsultationsController');

// Rota para obter todas as consultas
router.get('/consultations', consultationsController.getConsultations);

// Rota para criar uma nova consulta
router.post('/consultations', consultationsController.createConsultation);

module.exports = router;