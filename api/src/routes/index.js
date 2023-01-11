const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const dogsRoutes = require('./Dog')
const temperamentsRoutes = require('./Temperaments')

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/dogs', dogsRoutes)
router.use('/temperaments', temperamentsRoutes)

module.exports = router;
