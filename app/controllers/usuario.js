const application = require("../../config/server");

module.exports.index = (application, req, res) => {
    res.render('login/index', {validacao : {}, validation : false});
}

module.exports.registrar = (application, req, res) => {
    res.render('login/registrar');
}

module.exports.salvar = (application, req, res) => {
    let usuario = req.body;
    let connection = application.config.database();

    let modelUsuario = new application.app.models.Usuario(connection);

    modelUsuario.salvarUsuario(usuario, (error, result) => {
        res.redirect('/');
    });
}

module.exports.administrador = (application, req, res) => {
    res.render('login/login_administrador', {validacao : {}, validation : false});
}