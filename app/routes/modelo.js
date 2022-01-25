module.exports = application => {
    application.get('/deposito/modelos', (req, res) => {
        application.app.controllers.deposito.modelo.modelo(application, req, res);
    });

    application.get('/deposito/modelos/adicionar', (req, res) => {
        application.app.controllers.deposito.modelo.adicionar(application, req, res);
    });

    application.post('/deposito/modelos/adicionar/salvar', (req, res) => {
        application.app.controllers.deposito.modelo.salvar(application, req, res);
    });

    application.get('/deposito/modelos/excluir', (req, res) => {
        application.app.controllers.deposito.modelo.excluir(application, req, res);
    });

    application.get('/deposito/modelos/editar', (req, res) => {
        application.app.controllers.deposito.modelo.editar(application, req, res);
    });

    application.post('/deposito/modelos/editar/editar', (req, res) => {
        application.app.controllers.deposito.modelo.update(application, req, res);
    });
}