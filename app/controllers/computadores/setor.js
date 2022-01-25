module.exports.index = (application, req, res) => {
    if(!req.session.autenticado) {
        res.redirect('/');
        return;
    }

    let usuario = req.session.usuario;
    let connection = application.config.database();
    let modelSetor = new application.app.models.Setor(connection);

    modelSetor.getAll( (error, result) => {
        res.render('computadores/setor/index', {setores : result, usuario : usuario});
    });
}

module.exports.adicionar = (application, req, res) => {
    if(!req.session.autenticado) {
        res.redirect('/');
        return;
    }

    let usuario = req.session.usuario;
    let connection = application.config.database();
    let modelLocal = new application.app.models.Local(connection);

    modelLocal.getAll( (error, result) => {
        res.render('computadores/setor/adicionar', {usuario : usuario, validacao : {}, locais : result});
    });
}

module.exports.salvar = (application, req, res) => {
    if(!req.session.autenticado) {
        res.redirect('/');
        return;
    }

    let Setor = req.body;
    req.assert('nome', 'O nome do setor é obrigatório').notEmpty();
    let errors = req.validationErrors();

    if (errors) {
        res.render('computadores/setor/adicionar', {validacao : errors});
        return;
    }

    let connection = application.config.database();
    let modelSetor = new application.app.models.Setor(connection);

    modelSetor.salvar(Setor, (error, result) => {
        res.redirect('/computadores/setores');
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
    let modelSetor = new application.app.models.Setor(connection);
    let modelLocal = new application.app.models.Local(connection);

    modelSetor.getSetor(id, (error, resultSetor) => {
        modelLocal.getAll( (error, resultLocal) => {
            res.render('computadores/setor/editar', {usuario : usuario, setor : resultSetor, validacao : {}, locais: resultLocal});
        });
    });
}

module.exports.update = (application, req, res) => {
    if(!req.session.autenticado) {
        res.redirect('/');
        return;
    }

    let form = req.body;

    req.assert('nome', 'O nome do setor é obrigatório').notEmpty();
    let errors = req.validationErrors();

    if (errors) {
        res.redirect('/computadores/setor');
        return;
    }

    let connection = application.config.database();
    let modelSetor = new application.app.models.Setor(connection);

    modelSetor.editar(form, (error, result) => {
        res.redirect('/computadores/setores');
    });
}

module.exports.excluir = (application, req, res) => {
    if(!req.session.autenticado) {
        res.redirect('/');
        return;
    }
    
    let id = req.query;

    let connection = application.config.database();
    let modelSetor = new application.app.models.Setor(connection);

    modelSetor.excluir(id, (error, result) => {
        res.redirect('/computadores/setores');
    });
}
