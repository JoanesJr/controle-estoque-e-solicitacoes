module.exports = application => {
    application.get('/', (req, res) => {
        application.app.controllers.usuario.index(application, req, res);
    })

    application.get('/registrar', (req, res) => {
        application.app.controllers.usuario.registrar(application, req, res);
    })

    application.post('/registrar/salvar', (req, res) => {
        application.app.controllers.usuario.salvar(application, req, res);
    })
}