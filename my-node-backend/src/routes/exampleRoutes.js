const express = require('express');
const ExampleController = require('../controllers/exampleController');

const setExampleRoutes = (app) => {
    const router = express.Router();
    const exampleController = new ExampleController();

    router.get('/example', exampleController.getExample.bind(exampleController));
    router.post('/example', exampleController.createExample.bind(exampleController));

    app.use('/api', router);
};

module.exports = setExampleRoutes;