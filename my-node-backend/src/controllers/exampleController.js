class ExampleController {
    getExample(req, res) {
        // Logic to retrieve an example resource
        res.send('Example resource retrieved');
    }

    createExample(req, res) {
        // Logic to create a new example resource
        res.send('Example resource created');
    }
}

module.exports = ExampleController;