const express = require('express');
const consultasController = require('../controllers/consultasController');
const authMiddleware = require('../middleware/authMiddleware'); // Autenticação JWT

const router = express.Router();

router.get('/', authMiddleware, consultasController.getConsultations);
router.post('/', authMiddleware, consultasController.createConsultation);
router.put('/:id', authMiddleware, consultasController.updateConsultation);
router.delete('/:id', authMiddleware, consultasController.deleteConsultation);

module.exports = router;