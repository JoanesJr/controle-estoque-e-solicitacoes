module.exports.index = (application, req, res) => {
    res.render('deposito/index');
}

module.exports.categoria = (application, req, res) => {
    if(!req.session.autenticado) {
        res.redirect('/');
        return;
    }
    let connection = application.config.database();
    let modelCategoria = new application.app.models.Categoria(connection);
    let usuario = req.session.usuario;

    modelCategoria.getAll((error, result) => {
        res.render('deposito/categoria/categorias', {categorias : result, usuario : usuario});
    });
    
}

module.exports.adicionar = (application, req, res) => {
    if(!req.session.autenticado) {
        res.redirect('/');
        return;
    }

    let usuario = req.session.usuario;
    res.render('deposito/categoria/add_categoria', {validacao : {}, usuario : usuario});
}

module.exports.salvar = (application, req, res) => {
    let categoria = req.body;
    req.assert('nome', 'O nome da categoria é obrigatório').notEmpty();
    let errors = req.validationErrors();

    if (errors) {
        res.render('deposito/categoria/add_categoria', {validacao : errors});
        return;
    }

    let connection = application.config.database();
    let modelCategoria = new application.app.models.Categoria(connection);

    modelCategoria.salvar(categoria, (error, result) => {
        res.redirect('/deposito/categorias');
    }); 
}

module.exports.excluir = (application, req, res) => {
    let id = req.query;

    let connection = application.config.database();
    let modelCategoria = new application.app.models.Categoria(connection);

    modelCategoria.excluir(id, (error, result) => {
        res.redirect('/deposito/categorias');
    });
}

module.exports.editar = (application, req, res) => {
    if(!req.session.autenticado) {
        res.redirect('/');
        return;
    }

    let usuario = req.session.usuario;
    let id = req.query;
    let connection = application.config.database();
    let modelCategoria = new application.app.models.Categoria(connection);

    modelCategoria.getCategoria(id, (error, result) => {
        res.render('deposito/categoria/edit_categoria', {categoria : result, usuario : usuario});
    });
    
}

module.exports.update = (application, req, res) => {
    let form = req.body;

    let connection = application.config.database();
    let modelCategoria = new application.app.models.Categoria(connection);

    modelCategoria.editar(form, (error, result) => {
        res.redirect('/deposito/categorias');
    });
    
}