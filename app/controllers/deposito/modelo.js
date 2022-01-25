module.exports.modelo = (application, req, res) => {
    if(!req.session.autenticado) {
        res.redirect('/');
        return;
    }
    let connection = application.config.database();
    let modelModelo = new application.app.models.Modelo(connection);
    let usuario = req.session.usuario;

    modelModelo.getAll((error, result) => {
        res.render('deposito/modelo/modelos', {modelos : result, usuario : usuario});
    });
    
}

module.exports.adicionar = (application, req, res) => {
    if(!req.session.autenticado) {
        res.redirect('/');
        return;
    }

    let usuario = req.session.usuario;
    let connection = application.config.database();
    let modelCategoria = new application.app.models.Categoria(connection);

    modelCategoria.getAll((error, result) => {
        res.render('deposito/modelo/add_modelo', {categorias : result, validacao :  {}, usuario : usuario});
    });
}

module.exports.salvar = (application, req, res) => {
    let modelo = req.body;

    let connection = application.config.database();
    let modelModelo = new application.app.models.Modelo(connection);

    req.assert('nome', 'O nome do modelo é obrigatório').notEmpty();
    let errors = req.validationErrors();

    let modelCategoria = new application.app.models.Categoria(connection);

    modelCategoria.getAll((error, result) => {
        if (errors) {
            res.render('deposito/modelo/add_modelo', {categorias : result, validacao : errors});
            return;
        }

          modelModelo.salvar(modelo, (error, result) => {
            res.redirect('/deposito/modelos');
        }); 
    });

}

module.exports.excluir = (application, req, res) => {
    let id = req.query;

    let connection = application.config.database();
    let modelModelo = new application.app.models.Modelo(connection);

    modelModelo.excluir(id, (error, result) => {
        res.redirect('/deposito/modelos');
    });
}

module.exports.editar = (application, req, res) => {
    let id = req.query;
    let usuario = req.session.usuario;
    let connection = application.config.database();
    let modelModelo = new application.app.models.Modelo(connection);
    let modelCategoria = new application.app.models.Categoria(connection);

    modelModelo.getmodelo(id, (error, resultModelo) => {
        modelCategoria.getAll((error, resultCategoria) => {
            console.log(resultCategoria)
            res.render('deposito/modelo/edit_modelo', {usuario : usuario, modelo : resultModelo, categorias : resultCategoria});
        });
    });
    
}

module.exports.update = (application, req, res) => {
    let form = req.body;

    let connection = application.config.database();
    let modelModelo = new application.app.models.Modelo(connection);

    modelModelo.editar(form, (error, result) => {
        console.log(error)
        res.redirect('/deposito/modelos');
    });
    
}

module.exports.getModeloCategoria = (application, req, res) => {
    let categoria = req.body.categoria;
    
    let connection = application.config.database();
    let modelModelo = new application.app.models.Modelo(connection);

    modelModelo.getModeloCategoria(categoria, (error, result) => {
        res.json(result);
    });
}