module.exports.index = (application, req, res) => {
    if(!req.session.autenticado) {
        res.redirect('/');
        return;
    }

    let usuario = req.session.usuario;
    let connection = application.config.database();
    let modelComputador = new application.app.models.Computador(connection);

    modelComputador.getAll((error, result) => {
        res.render('computadores/index', {computadores : result, validation : {}, usuario : usuario});
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

    modelLocal.getAll( (error, resultLocal) => {
        res.render('computadores/adicionar', {usuario : usuario, validacao : {}, localizacao : resultLocal, dados : {}});
    });
    
};
module.exports.salvar = (application, req, res) => {
    if(!req.session.autenticado) {
        res.redirect('/');
        return;
    }

    let form = req.body;
    req.assert('modelo_gabinete', "Modelo do Gabinete obrigatório").notEmpty();
    req.assert('ram', "Memória RAM é obrigatório").notEmpty();
    req.assert('setor', "O setor é obrigatório").notEmpty();
    req.assert('localizacao', "A Localização obrigatória").notEmpty();
    req.assert('armazenamento', "O Armazenamento é obrigatório").notEmpty();

    let errors = req.validationErrors();
    let connection = application.config.database();
    if(errors) {
        let modelLocal = new application.app.models.Local(connection);
        modelLocal.getAll( (error, result) => {
            res.render('computadores/adicionar', {validacao : errors, dados : form, localizacao : result});
        });
        
        return;
    }

    let modelComputador = new application.app.models.Computador(connection);

    modelComputador.salvar(form, (error, result) => {
        res.redirect('/computadores');
    }); 
};

module.exports.editar = (application, req, res) => {
    if(!req.session.autenticado) {
        res.redirect('/');
        return;
    }

    let usuario = req.session.usuario;
    let id = req.query.id

    let connection = application.config.database();
    let modelComputador = new application.app.models.Computador(connection);
    let modelLocalizacao = new application.app.models.Local(connection);

    modelComputador.getComputador(id, (error, resultComputador) => {
        modelLocalizacao.getAll((error, resultLocal) => {
            res.render('computadores/editar', {usuario : usuario, computador : resultComputador, localizacao : resultLocal});
        });
    });
}

module.exports.update = (application, req, res) => {
    let form = req. body;

    let connection = application.config.database();
    let modelComputador = new application.app.models.Computador(connection);

    modelComputador.update(form, (error, result) => {
        console.log(error);
        res.redirect('/computadores');
    });
}

module.exports.excluir = (application, req, res) => {
    if(!req.session.autenticado) {
        res.redirect('/');
        return;
    }

    let form = req.query.id;
    let connection = application.config.database();
    let modelComputador = new application.app.models.Computador(connection);

    modelComputador.excluir(form, (error, result) => {
        res.redirect('/computadores');
    });
};

module.exports.getSetorLocalizacao = (application, req, res) => {
    let localizacao = req.body.localizacao;
    let connection = application.config.database();
    let modelSetor = new application.app.models.Setor(connection);

    modelSetor.getSetorLocalizacao(localizacao, (error, result) => {
        res.json(result);
    });
}

