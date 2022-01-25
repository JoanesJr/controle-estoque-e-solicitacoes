module.exports = (application) => {
    application.get('/deposito/unidade_medida', (req, res) => {
        application.app.controllers.deposito.unidade_medida.index(application, req, res);
    })

    application.get('/deposito/unidade_medida/adicionar', (req, res) => {
        application.app.controllers.deposito.unidade_medida.addUnidadeMedida(application, req, res);
    });

    application.post('/deposito/add_unidade_medida/salvar', (req, res) => {
        application.app.controllers.deposito.unidade_medida.salvarUnidadeMedida(application, req, res);
    });

    application.get('/deposito/unidade_medida/excluir', (req, res) => {
        application.app.controllers.deposito.unidade_medida.excluir(application, req, res);
    });

    application.get('/deposito/unidade_medida/editar', (req, res) => {
        application.app.controllers.deposito.unidade_medida.editar(application, req, res);
    });

    application.post('/deposito/unidade_medida/editar/editar', (req, res) => {
        application.app.controllers.deposito.unidade_medida.update(application, req, res);
    });
}