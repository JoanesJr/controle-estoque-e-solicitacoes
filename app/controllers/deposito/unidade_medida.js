module.exports.index = (application, req, res) => {
    if(!req.session.autenticado) {
        res.redirect('/');
        return;
    }
    let connection = application.config.database();
    let unidadeMedidaModel = new application.app.models.UnidadeMedida(connection);
    let usuario = req.session.usuario;

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
        }
    }

    unidadeMedidaModel.getPaginacao(limit, (error, resultPaginacao) => {
        if(resultPaginacao === undefined) {
            resultPaginacao = {};
        }

        unidadeMedidaModel.getCount((error, result) => {
            let numeroLinhas = result[0].num_rows;
            let quantidadePaginas;

            if (numeroLinhas % 6 == 0) {
                quantidadePaginas = numeroLinhas/6;
            }else {
                quantidadePaginas = Math.floor((numeroLinhas+6) / 6);
            }

            res.render('deposito/unidade_medida/unidade_medida', {unidadeMedidas : resultPaginacao, usuario : usuario, numeroLinhas : numeroLinhas,  quantidadePaginas : quantidadePaginas, validacao : mensagem});
        }); 
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

    unidadeMedidaModel.getNomeUnidadeMedida(unidadeMedida.nome, (error, resultNome) => {
        req.assert('nome', 'O nome da unidade de medida é obrigatório').notEmpty();
        unidadeMedida.nome = unidadeMedida.nome.toUpperCase();
        let errors = req.validationErrors();

        if (resultNome[0] != undefined) {
            errors = [
                {
                    msg : 'Usuario já existe'
                }
            ];
        }

        if (errors) {
            res.render('deposito/unidade_medida/add_unidade_medida', {validacao : errors, usuario : req.session.usuario});
            return;
        }

        unidadeMedidaModel.salvar(unidadeMedida, (error, result) => {
            res.redirect('/deposito/unidade_medida?mensagem=0');
        });
    });
}

module.exports.excluir = (application, req, res) => {
    let id = req.query;
    let connection = application.config.database();
    let unidadeMedidaModel = new application.app.models.UnidadeMedida(connection);

    unidadeMedidaModel.excluir(id, (error, result) => {
        res.redirect('/deposito/unidade_medida?mensagem=3');
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
    let modelUnidadeMedida = new application.app.models.UnidadeMedida(connection);
    form.nome = form.nome.toUpperCase();

    modelUnidadeMedida.getNomeUnidadeMedida(form.nome, (error, resultNome) => {
        req.assert('nome', 'O nome da unidade de medida é obrigatório').notEmpty();
        let errors = req.validationErrors();
        if (resultNome[0] != undefined) {
            errors = [
                {
                    msg : 'A Unidade de Medida já existe'
                }
            ];
        }

        if (errors) {
            res.render('deposito/unidade_medida/add_unidade_medida', {validacao : errors, usuario : req.session.usuario});
            return;
        }
        modelUnidadeMedida.editar(form, (error, result) => {
            res.redirect('/deposito/unidade_medida?mensagem=2');
        }); 
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

    let usuario = req.session.usuario;
    let connection = application.config.database();
    let modelUnidadeMedida = new application.app.models.UnidadeMedida(connection);

    modelUnidadeMedida.getPaginacao(limit, (error, resultPaginacao) => {
        modelUnidadeMedida.getCount((error, resultCount) => {
            let numeroLinhas = resultCount[0].num_rows;
            let quantidadePaginas;

            if (numeroLinhas % 6 == 0) {
                quantidadePaginas = numeroLinhas/6;
            }else {
                quantidadePaginas = Math.floor((numeroLinhas+6) / 6);
            }

            res.render('deposito/unidade_medida/unidade_medida', {validacao : {}, unidadeMedidas : resultPaginacao, usuario : usuario, numeroLinhas : numeroLinhas,  quantidadePaginas : quantidadePaginas});
        });
    });
}