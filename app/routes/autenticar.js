module.exports = application => {
    application.post('/autenticar', (req, res) => {
        application.app.controllers.autenticar.autenticar(application, req, res);
    });

    application.get('/sair', (req, res) => {
        application.app.controllers.autenticar.sair(application, req, res);
    });

    application.get('/administrador', (req, res) => {
        application.app.controllers.usuario.administrador(application, req, res);
    });

     application.post('/administrador/autenticar', (req, res) => {
        application.app.controllers.autenticar.autenticarAdministrador(application, req, res);
    });
}