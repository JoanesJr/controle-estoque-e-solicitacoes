module.exports.administrador = (application, req, res) => {
    if(!req.session.autenticado) {
        res.redirect('/administrador');
        return;
    }

    let connection = application.config.database();
    let modelUsuario = new application.app.models.Usuario(connection);

    modelUsuario.getAll(req.session.usuario, (error, result) => {
        res.render('administrador/index', {usuarios : result, usuario : req.session.usuario, validacao : {}, validation : false});
    });
    
}

module.exports.addUsuario = (application, req, res) => {
    if(!req.session.autenticado) {
        res.redirect('/administrador');
        return;
    }

    let usuario = req.session.usuario;
    res.render('administrador/add_usuario', {usuario : usuario, validacao : {}});
}

module.exports.criarUsuario = (application, req, res) => {
    let form = req.body;
    req.assert('nome', 'O nome é obrigatório').notEmpty();
    req.assert('usuario', 'O usuário é obrigatório').notEmpty();
    req.assert('senha', 'A senha é obrigatória').notEmpty();

    let errors = req.validationErrors();

    if(errors) {
        res.render('administrador/add_usuario', {validacao : errors});
        return;
    }


    let connection = application.config.database();
    let modelUsuario = new application.app.models.Usuario(connection);

    modelUsuario.criarUsuario(form, (error, result) => {
        res.redirect('/administrador/home');
    });
}

module.exports.excluir = (application, req, res) => {
    let id = req.query.id;

    let connection = application.config.database();
    let modelUsuario = new application.app.models.Usuario(connection);

    modelUsuario.excluir(id, (error, result) => {
        res.redirect('/administrador/home');
    });
}