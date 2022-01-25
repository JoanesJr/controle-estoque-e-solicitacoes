module.exports = (application) => {
    application.get('/retiradas', (req, res) => {
        application.app.controllers.retiradas.retirada.retirada(application, req, res);
    });
}