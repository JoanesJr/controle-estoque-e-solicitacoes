module.exports = (application) => {
     application.get('/administrador/deposito', (req, res) => {
        application.app.controllers.administrador.administrador(application, req, res);
    });
    
     application.get('/administrador/add_usuario', (req, res) => {
        application.app.controllers.administrador.addUsuario(application, req, res);
    });

     application.post('/administrador/criar_usuario', (req, res) => {
        application.app.controllers.administrador.criarUsuario(application, req, res);
    });

     application.post('/administrador/excluir', (req, res) => {
        application.app.controllers.administrador.excluir(application, req, res);
    });
}