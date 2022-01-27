module.exports = application => {
    application.get('/computadores', (req, res) => {
        application.app.controllers.computadores.computador.index(application, req, res);
    });

    application.get('/computadores/adicionar', (req, res) => {
        application.app.controllers.computadores.computador.adicionar(application, req, res);
    });

    application.post('/computadores/setores/get', (req, res) => {
        application.app.controllers.computadores.computador.getSetorLocalizacao(application, req, res);
    });

    application.get('/computadores/editar', (req, res) => {
        application.app.controllers.computadores.computador.editar(application, req, res);
    });

    application.post('/computadores/update', (req, res) => {
        application.app.controllers.computadores.computador.update(application, req, res);
    });

    application.get('/computadores/excluir', (req, res) => {
        application.app.controllers.computadores.computador.excluir(application, req, res);
    });

    application.post('/computadores/salvar', (req, res) => {
        application.app.controllers.computadores.computador.salvar(application, req, res);
    });

    application.get('/computadores/pagina', (req, res) => {
        application.app.controllers.computadores.computador.pagina(application, req, res);
    });
}