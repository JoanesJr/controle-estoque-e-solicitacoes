module.exports.index = (application, req, res) => {
    if(!req.session.autenticado) {
        res.redirect('/');
        return;
    }

    let usuario = req.session.usuario;
    let connection = application.config.database();
    let modelLocal = new application.app.models.Local(connection);

    modelLocal.getAll( (error, result) => {
        res.render('computadores/local/index', {locais : result, usuario : usuario});
    });
}

module.exports.adicionar = (application, req, res) => {
    if(!req.session.autenticado) {
        res.redirect('/');
        return;
    }

    let usuario = req.session.usuario;
    res.render('computadores/local/adicionar', {usuario : usuario, validacao : {}});
}

module.exports.salvar = (application, req, res) => {
    if(!req.session.autenticado) {
        res.redirect('/');
        return;
    }

    let local = req.body;
    req.assert('nome', 'O nome do local é obrigatório').notEmpty();
    let errors = req.validationErrors();

    if (errors) {
        res.render('computadores/local/adicionar', {validacao : errors});
        return;
    }

    let connection = application.config.database();
    let modelLocal = new application.app.models.Local(connection);

    modelLocal.salvar(local, (error, result) => {
        res.redirect('/computadores/locais');
    }); 
}

module.exports.editar = (application, req, res) => {
    if(!req.session.autenticado) {
        res.redirect('/');
        return;
    }

    let id = req.query;
    let usuario = req.session.usuario;
    let connection = application.config.database();
    let modelLocal = new application.app.models.Local(connection);

    modelLocal.getLocal(id, (error, result) => {
        res.render('computadores/local/editar', {usuario : usuario, local : result, validacao : {}});
    });
}

module.exports.update = (application, req, res) => {
    if(!req.session.autenticado) {
        res.redirect('/');
        return;
    }

    let form = req.body;

    req.assert('nome', 'O nome do local é obrigatório').notEmpty();
    let errors = req.validationErrors();

    if (errors) {
        res.redirect('/computadores/locais');
        return;
    }

    let connection = application.config.database();
    let modelLocal = new application.app.models.Local(connection);

    modelLocal.editar(form, (error, result) => {
        res.redirect('/computadores/locais');
    });
}

module.exports.excluir = (application, req, res) => {
    if(!req.session.autenticado) {
        res.redirect('/');
        return;
    }
    
    let id = req.query;

    let connection = application.config.database();
    let modelLocal = new application.app.models.Local(connection);

    modelLocal.excluir(id, (error, result) => {
        console.log(error)
        res.redirect('/computadores/locais');
    });
}
