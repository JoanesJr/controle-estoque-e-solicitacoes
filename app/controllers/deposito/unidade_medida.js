module.exports.index = (application, req, res) => {
    if(!req.session.autenticado) {
        res.redirect('/');
        return;
    }
    let connection = application.config.database();
    let unidadeMedidaModel = new application.app.models.UnidadeMedida(connection);
    let usuario = req.session.usuario;

    unidadeMedidaModel.getAll((error, result) => {
        res.render('deposito/unidade_medida/unidade_medida', {unidadeMedidas : result, usuario : usuario});
    });
}

module.exports.addUnidadeMedida = (application, req, res) => {
    if(!req.session.autenticado) {
        res.redirect('/');
        return;
    }

    let usuario = req.session.usuario;
    res.render('deposito/unidade_medida/add_unidade_medida', {validacao : {}, usuario : usuario});
}

module.exports.salvarUnidadeMedida = (application, req, res) => {
    let unidadeMedida = req.body;
    let connection = application.config.database();
    let unidadeMedidaModel = new application.app.models.UnidadeMedida(connection);

    req.assert('nome', 'O nome da unidade de medida é obrigatório').notEmpty();
    let errors = req.validationErrors();

    if (errors) {
        res.render('deposito/unidade_medida/add_unidade_medida', {validacao : errors});
        return;
    }

    unidadeMedidaModel.salvar(unidadeMedida, (error, result) => {
        res.redirect('/deposito/unidade_medida');
    });
}

module.exports.excluir = (application, req, res) => {
    let id = req.query;
    let connection = application.config.database();
    let unidadeMedidaModel = new application.app.models.UnidadeMedida(connection);

    unidadeMedidaModel.excluir(id, (error, result) => {
        res.redirect('/deposito/unidade_medida');
    });
}

module.exports.editar = (application, req, res) => {
    let id = req.query;
    let usuario = req.session.usuario;
    let connection = application.config.database();
    let modelUnidadeMedida = new application.app.models.UnidadeMedida(connection);

    modelUnidadeMedida.getUnidadeMedida(id, (error, result) => {
        res.render('deposito/unidade_medida/edit_unidade_medida', {unidadeMedida : result, usuario : usuario});
    });
}

module.exports.update = (application, req, res) => {
    let form = req.body;

    let connection = application.config.database();
    let modelUnidadeMedida = new application.app.models.modelUnidadeMedida(connection);

    modelUnidadeMedida.editar(form, (error, result) => {
        res.redirect('/deposito/unidade_medida');
    }); 
}
