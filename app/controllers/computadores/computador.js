module.exports.index = (application, req, res) => {
    if(!req.session.autenticado) {
        res.redirect('/');
        return;
    }

    let usuario = req.session.usuario;
    let connection = application.config.database();
    let modelComputador = new application.app.models.Computador(connection);

    let limit = {
        inicio : 0,
        final : 4
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

    modelComputador.getPaginacao(limit, (error, resultComputador) => {
        if(resultComputador === undefined) {
            resultComputador = {};
        }

        modelComputador.getCount((error, result) => {
            let numeroLinhas = result[0].num_rows;
            let quantidadePaginas;

            if (numeroLinhas % 4 == 0) {
                quantidadePaginas = numeroLinhas/4;
            }else {
                quantidadePaginas = Math.floor((numeroLinhas+4) / 4);
            }


            res.render('computadores/index', {computadores : resultComputador, validacao : mensagem, usuario : usuario, numeroLinhas : numeroLinhas,  quantidadePaginas : quantidadePaginas});
        }); 
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
        res.redirect('/computadores?mensagem=0');
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
        res.redirect('/computadores?mensagem=2');
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
        res.redirect('/computadores?mensagem=3');
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

module.exports.pagina = (application, req, res) => {
    let paginaDestino = req.query.pagina;
    let limit = {};
    if (paginaDestino == 1) {
        limit = {
            inicio : 0,
            final : 4
        };
    }else {
        limit = {
            inicio : paginaDestino * 4 - 4,
            final : 4
        };
    
    }
    let connection = application.config.database();
    let modelComputador = new application.app.models.Computador(connection);

    modelComputador.getPaginacao(limit, (error, resultComputadores) => {
        modelComputador.getCount((error, resultCount) => {
            let numeroLinhas = resultCount[0].num_rows;
            let quantidadePaginas;

            if (numeroLinhas % 4 == 0) {
                quantidadePaginas = numeroLinhas/4;
            }else {
                quantidadePaginas = Math.floor((numeroLinhas+4) / 4);
            }

            res.render('computadores/index', {computadores : resultComputadores, usuario : req.session.usuario, numeroLinhas : numeroLinhas, quantidadePaginas : quantidadePaginas});
        });
    });
}