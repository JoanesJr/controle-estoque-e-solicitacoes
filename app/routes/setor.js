module.exports = application => {
    application.get('/computadores/setores', (req, res) => {
        application.app.controllers.computadores.setor.index(application, req, res);
    })

    application.get('/computadores/setores/adicionar', (req, res) => {
        application.app.controllers.computadores.setor.adicionar(application, req, res);
    })

    application.post('/computadores/setores/salvar', (req, res) => {
        application.app.controllers.computadores.setor.salvar(application, req, res);
    })

    application.get('/computadores/setores/editar', (req, res) => {
        application.app.controllers.computadores.setor.editar(application, req, res);
    })

    application.post('/computadores/setores/update', (req, res) => {
        application.app.controllers.computadores.setor.update(application, req, res);
    })

    application.get('/computadores/setores/excluir', (req, res) => {
        application.app.controllers.computadores.setor.excluir(application, req, res);
    })
};