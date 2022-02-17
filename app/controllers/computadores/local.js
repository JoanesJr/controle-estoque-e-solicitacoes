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
        final : 6
    };

    let mensagem = {};

    if (req.query != undefined) {
        let number = parseInt(req.query.mensagem);

        switch(number) {
            case 0:
                mensagem = [{
                    msg : "Adicionado com Sucesso",
                    alert : 'alert alert-success'
                }];
                break;
            case 1:
                mensagem = [{
                    msg : "Item não pode ser excluido, pois esta relacionado a algum cadastro",
                    alert : 'alert alert-warning'
                }];
                break;
            case 2:
                mensagem = [{
                    msg : "Edição realizada com sucesso",
                    alert : 'alert alert-success'
                }];
                break;
            case 3:
                mensagem = [{
                    msg : "Exclusão realizada com sucesso",
                    alert : 'alert alert-success'
                }];
                break;
            case 4:
                mensagem = [{
                    msg : "Local ja Existe",
                    alert : 'alert alert-warning'
                }];
                break;
        }
    }

    modelLocal.getPaginacao(limit, (error, resultPaginacao) => {
        if(resultPaginacao === undefined) {
            resultPaginacao = {};
        }

        modelLocal.getCount((error, result) => {
            let numeroLinhas = result[0].num_rows;
            let quantidadePaginas;

            if (numeroLinhas % 6 == 0) {
                quantidadePaginas = numeroLinhas/6;
            }else {
                quantidadePaginas = Math.floor((numeroLinhas+6) / 6);
            }

            res.render('computadores/local/index', {validacao : mensagem, locais : resultPaginacao, usuario : usuario, numeroLinhas : numeroLinhas,  quantidadePaginas : quantidadePaginas});
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
    local.nome = local.nome.toUpperCase();
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
            res.redirect('/computadores/locais?mensagem=0');
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
    form.nome = form.nome.toUpperCase();
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
            res.redirect('/computadores/locais?mensagem=4');
            return;
        }
    
        modelLocal.editar(form, (error, result) => {
            res.redirect('/computadores/locais?mensagem=2');
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
        res.redirect('/computadores/locais?mensagem=3');
    });
}

module.exports.pagina = (application, req, res) => {
    let paginaDestino = req.query.pagina;
    let limit = {};
    if (paginaDestino == 1) {
        limit = {
            inicio : 0,
            final : 6
        };
    }else {
        limit = {
            inicio : paginaDestino * 6 - 6,
            final : 6
        };
    
    }
    let connection = application.config.database();
    let modelLocal = new application.app.models.Local(connection);
    let usuario = req.session.usuario;

    modelLocal.getPaginacao(limit, (error, resultPaginacao) => {
        modelLocal.getCount((error, resultCount) => {
            let numeroLinhas = resultCount[0].num_rows;
            let quantidadePaginas;

            if (numeroLinhas % 6 == 0) {
                quantidadePaginas = numeroLinhas/6;
            }else {
                quantidadePaginas = Math.floor((numeroLinhas+6) / 6);
            }

            res.render('computadores/local/index', {validacao : {}, locais : resultPaginacao, usuario : req.session.usuario, numeroLinhas : numeroLinhas, quantidadePaginas : quantidadePaginas});
        });
    });
}