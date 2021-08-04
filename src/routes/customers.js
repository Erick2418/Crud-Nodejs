const express= require('express');
const customerController = require('../controllers/customerController');
const router = express.Router(); //devuelve un objeto en js en el cual se pueden agregar rutas

// aqui colocmos las rutas del server
router.get('/',customerController.list);
router.post('/add',customerController.save);
router.get('/delete/:id',customerController.delete);
router.get('/update/:id',customerController.edit);
router.post('/update/:id',customerController.update);

module.exports= router;








