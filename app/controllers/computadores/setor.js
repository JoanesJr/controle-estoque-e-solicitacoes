module.exports.index = (application, req, res) => {
    if(!req.session.autenticado) {
        res.redirect('/');
        return;
    }

    let usuario = req.session.usuario;
    let connection = application.config.database();
    let modelSetor = new application.app.models.Setor(connection);

    let limit = {
        inicio : 0,
        final : 8
    };

    modelSetor.getPaginacao(limit, (error, resultPaginacao) => {
        if(resultPaginacao === undefined) {
            resultPaginacao = {};
        }

        modelSetor.getCount((error, result) => {
            let numeroLinhas = result[0].num_rows;
            let quantidadePaginas;

            if (numeroLinhas % 8 == 0) {
                quantidadePaginas = numeroLinhas/8;
            }else {
                quantidadePaginas = Math.floor((numeroLinhas+8) / 8);
            }

            res.render('computadores/setor/index', {setores : resultPaginacao, usuario : usuario, numeroLinhas : numeroLinhas,  quantidadePaginas : quantidadePaginas});
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

    modelLocal.getAll( (error, result) => {
        res.render('computadores/setor/adicionar', {usuario : usuario, validacao : {}, locais : result});
    });
}

module.exports.salvar = (application, req, res) => {
    if(!req.session.autenticado) {
        res.redirect('/');
        return;
    }

    let connection = application.config.database();
    let modelSetor = new application.app.models.Setor(connection);
    let setor = req.body;
    modelSetor.getNomeSetor(setor, (error, resultSetor) => {
        req.assert('nome', 'O nome do setor é obrigatório').notEmpty();
        let errors = req.validationErrors();
        if (resultSetor[0] != undefined) {
            errors = [
                {
                    msg : 'O setor já existe nesta localidade'
                }
            ];
        }

        if (errors) {
            let modelLocal = new application.app.models.Local(connection);
            modelLocal.getAll((error, resultLocal) => {
                res.render('computadores/setor/adicionar', {validacao : errors, usuario : req.session.usuario, locais : resultLocal});
                return;
            }); 
            return;
        };
    
        modelSetor.salvar(setor, (error, result) => {
            res.redirect('/computadores/setores');
        }); 
    });
};

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
    
    let connection = application.config.database();
    let modelSetor = new application.app.models.Setor(connection);

    modelSetor.getNomeSetor(form, (error, resultSetor) => {
        req.assert('nome', 'O nome do setor é obrigatório').notEmpty();
        let errors = req.validationErrors();
        if (resultSetor[0] != undefined) {
            errors = [
                {
                    msg : 'O setor já existe nesta localidade'
                }
            ];
        }

        if (errors) {
            let modelLocal = new application.app.models.Local(connection);
            modelLocal.getAll((error, resultLocal) => {
                res.render('computadores/setor/adicionar', {validacao : errors, usuario : req.session.usuario, locais : resultLocal});
                return;
            }); 
            return;
        };

        modelSetor.editar(form, (error, result) => {
            res.redirect('/computadores/setores');
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
    let modelSetor = new application.app.models.Setor(connection);

    modelSetor.excluir(id, (error, result) => {
        res.redirect('/computadores/setores');
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
    let modelSetor = new application.app.models.Setor(connection);
    let usuario = req.session.usuario;

    modelSetor.getPaginacao(limit, (error, resultPaginacao) => {
        modelSetor.getCount((error, resultCount) => {
            let numeroLinhas = resultCount[0].num_rows;
            let quantidadePaginas;

            if (numeroLinhas % 8 == 0) {
                quantidadePaginas = numeroLinhas/8;
            }else {
                quantidadePaginas = Math.floor((numeroLinhas+8) / 8);
            }

            res.render('computadores/setor/index', {setores : resultPaginacao, usuario : req.session.usuario, numeroLinhas : numeroLinhas, quantidadePaginas : quantidadePaginas});
        });
    });
}