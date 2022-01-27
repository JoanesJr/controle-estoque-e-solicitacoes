module.exports = application => {
    application.get('/computadores/locais', (req, res) => {
        application.app.controllers.computadores.local.index(application, req, res);
    })

    application.get('/computadores/locais/adicionar', (req, res) => {
        application.app.controllers.computadores.local.adicionar(application, req, res);
    })

    application.post('/computadores/locais/salvar', (req, res) => {
        application.app.controllers.computadores.local.salvar(application, req, res);
    })

    application.get('/computadores/locais/editar', (req, res) => {
        application.app.controllers.computadores.local.editar(application, req, res);
    })

    application.post('/computadores/locais/update', (req, res) => {
        application.app.controllers.computadores.local.update(application, req, res);
    })

    application.get('/computadores/locais/excluir', (req, res) => {
        application.app.controllers.computadores.local.excluir(application, req, res);
    })

    application.get('/computadores/locais/pagina', (req, res) => {
        application.app.controllers.computadores.local.pagina(application, req, res);
    });
};