module.exports = application => {
    application.get('/deposito/add_item', (req, res) => {
        application.app.controllers.deposito.item.addItem(application, req, res);
    });

    application.post('/deposito/add_item/salvar', (req, res) => {
        application.app.controllers.deposito.item.salvarItem(application, req, res);
    });

    application.post('/deposito/reduzir_item', (req, res) => {
        application.app.controllers.deposito.item.reduzirItem(application, req, res);
    });

    application.post('/deposito/aumentar_item', (req, res) => {
        application.app.controllers.deposito.item.aumentarItem(application, req, res);
    });

    application.post('/deposito/add_item/getModeloCategoria', (req, res) => {
        application.app.controllers.deposito.modelo.getModeloCategoria(application, req, res);
    });

    application.get('/deposito/excluir', (req, res) => {
        application.app.controllers.deposito.item.excluir(application, req, res);
    });

    application.get('/deposito/editar', (req, res) => {
        application.app.controllers.deposito.item.editar(application, req, res);
    });

    application.post('/deposito/update', (req, res) => {
        application.app.controllers.deposito.item.update(application, req, res);
    });
}