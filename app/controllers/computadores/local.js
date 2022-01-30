module.exports.index = (application, req, res) => {
    if(!req.session.autenticado) {
        res.redirect('/');
        return;
    }

    let usuario = req.session.usuario;
    let connection = application.config.database();
    let modelLocal = new application.app.models.Local(connection);

    let limit = {
        inicio : 0,
        final : 8
    };

    modelLocal.getPaginacao(limit, (error, resultPaginacao) => {
        if(resultPaginacao === undefined) {
            resultPaginacao = {};
        }

        modelLocal.getCount((error, result) => {
            let numeroLinhas = result[0].num_rows;
            let quantidadePaginas;

            if (numeroLinhas % 8 == 0) {
                quantidadePaginas = numeroLinhas/8;
            }else {
                quantidadePaginas = Math.floor((numeroLinhas+8) / 8);
            }

            res.render('computadores/local/index', {locais : resultPaginacao, usuario : usuario, numeroLinhas : numeroLinhas,  quantidadePaginas : quantidadePaginas});
        }); 
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
    let connection = application.config.database();
    let modelLocal = new application.app.models.Local(connection);
    req.assert('nome', 'O nome do local é obrigatório').notEmpty();
    let errors = req.validationErrors();
    modelLocal.getNomeLocal(local.nome, (error, resultLocal) => {
        if (resultLocal[0] != undefined) {
            errors = [
                {
                    msg : 'Local já existe'
                }
            ];
        }

        if (errors) {
            res.render('computadores/local/adicionar', {validacao : errors, usuario : req.session.usuario});
            return;
        }
    
        modelLocal.salvar(local, (error, result) => {
            res.redirect('/computadores/locais');
        }); 
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

    let connection = application.config.database();
    let modelLocal = new application.app.models.Local(connection);

    let form = req.body;

    req.assert('nome', 'O nome do local é obrigatório').notEmpty();
    let errors = req.validationErrors();
    modelLocal.getNomeLocal(form.nome, (error, resultLocal) => {
        if (resultLocal[0] != undefined) {
            errors = [
                {
                    msg : 'Local já existe'
                }
            ];
        }
        if (errors) {
            res.redirect('/computadores/locais?error=error');
            return;
        }
    
        modelLocal.editar(form, (error, result) => {
            res.redirect('/computadores/locais');
        });
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
    let connection = application.config.database();
    let modelLocal = new application.app.models.Local(connection);
    let usuario = req.session.usuario;

    modelLocal.getPaginacao(limit, (error, resultPaginacao) => {
        modelLocal.getCount((error, resultCount) => {
            let numeroLinhas = resultCount[0].num_rows;
            let quantidadePaginas;

            if (numeroLinhas % 8 == 0) {
                quantidadePaginas = numeroLinhas/8;
            }else {
                quantidadePaginas = Math.floor((numeroLinhas+8) / 8);
            }

            res.render('computadores/local/index', {locais : resultPaginacao, usuario : req.session.usuario, numeroLinhas : numeroLinhas, quantidadePaginas : quantidadePaginas});
        });
    });
}