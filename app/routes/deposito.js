module.exports = (application) => {
    application.get('/deposito', (req, res) => {
        application.app.controllers.deposito.deposito.index(application, req, res);
    });
}