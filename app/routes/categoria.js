module.exports = application => {
    application.get('/deposito/categorias', (req, res) => {
        application.app.controllers.deposito.categoria.categoria(application, req, res);
    });

    application.get('/deposito/categorias/adicionar', (req, res) => {
        application.app.controllers.deposito.categoria.adicionar(application, req, res);
    });

    application.post('/deposito/categorias/adicionar/salvar', (req, res) => {
        application.app.controllers.deposito.categoria.salvar(application, req, res);
    });

    application.get('/deposito/categorias/excluir', (req, res) => {
        application.app.controllers.deposito.categoria.excluir(application, req, res);
    });

    application.get('/deposito/categorias/editar', (req, res) => {
        application.app.controllers.deposito.categoria.editar(application, req, res);
    });

    application.post('/deposito/categorias/editar/editar', (req, res) => {
        application.app.controllers.deposito.categoria.update(application, req, res);
    });
}