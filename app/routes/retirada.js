module.exports = (application) => {
    application.get('/retiradas', (req, res) => {
        application.app.controllers.retiradas.retirada.retirada(application, req, res);
    });

    application.get('/retiradas/pagina', (req, res) => {
        application.app.controllers.retiradas.retirada.pagina(application, req, res);
    });
}