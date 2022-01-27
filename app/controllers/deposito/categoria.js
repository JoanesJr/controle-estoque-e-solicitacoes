module.exports.categoria = (application, req, res) => {
    if(!req.session.autenticado) {
        res.redirect('/');
        return;
    }
    let connection = application.config.database();
    let modelCategoria = new application.app.models.Categoria(connection);
    let usuario = req.session.usuario;

    let limit = {
        inicio : 0,
        final : 8
    };

    modelCategoria.getPaginacao(limit, (error, resultPaginacao) => {
        if(resultPaginacao === undefined) {
            resultPaginacao = {};
        }

        modelCategoria.getCount((error, result) => {
            let numeroLinhas = result[0].num_rows;
            let quantidadePaginas;

            if (numeroLinhas % 8 == 0) {
                quantidadePaginas = numeroLinhas/8;
            }else {
                quantidadePaginas = Math.floor((numeroLinhas+8) / 8);
            }

            res.render('deposito/categoria/categorias', {categorias : resultPaginacao, usuario : usuario, numeroLinhas : numeroLinhas,  quantidadePaginas : quantidadePaginas});
        }); 
        
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

module.exports.pagina = (application, req, res) => {
    let paginaDestino = req.query.pagina;
    let limit = {};
    if (paginaDestino == 1) {
        limit = {
            inicio : 0,
            final : 8
        };
    }else {
        limit = {
            inicio : paginaDestino * 8 - 8,
            final : 8
        };
    
    }

    let usuario = req.session.usuario;
    let connection = application.config.database();
    let modelCategoria = new application.app.models.Categoria(connection);

    modelCategoria.getPaginacao(limit, (error, resultPaginacao) => {
        modelCategoria.getCount((error, resultCount) => {
            let numeroLinhas = resultCount[0].num_rows;
            let quantidadePaginas;

            if (numeroLinhas % 8 == 0) {
                quantidadePaginas = numeroLinhas/8;
            }else {
                quantidadePaginas = Math.floor((numeroLinhas+8) / 8);
            }

            res.render('deposito/categoria/categorias', {categorias : resultPaginacao, usuario : usuario, numeroLinhas : numeroLinhas,  quantidadePaginas : quantidadePaginas});
        });
    });
}