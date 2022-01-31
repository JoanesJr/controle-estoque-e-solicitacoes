module.exports.modelo = (application, req, res) => {
    if(!req.session.autenticado) {
        res.redirect('/');
        return;
    }
    let connection = application.config.database();
    let modelModelo = new application.app.models.Modelo(connection);
    let usuario = req.session.usuario;

    let limit = {
        inicio : 0,
        final : 8
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

    modelModelo.getPaginacao(limit, (error, resultPaginacao) => {
        if(resultPaginacao === undefined) {
            resultPaginacao = {};
        }

        modelModelo.getCount((error, result) => {
            let numeroLinhas = result[0].num_rows;
            let quantidadePaginas;

            if (numeroLinhas % 8 == 0) {
                quantidadePaginas = numeroLinhas/8;
            }else {
                quantidadePaginas = Math.floor((numeroLinhas+8) / 8);
            }

            res.render('deposito/modelo/modelos', {modelos : resultPaginacao, usuario : usuario, numeroLinhas : numeroLinhas,  quantidadePaginas : quantidadePaginas, validacao : mensagem});
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
    modelModelo.getNomeModelo(modelo, (error, resultModelo) => {
        if (resultModelo[0] != undefined) {
            errors = [
                {
                    msg : 'Este modelo já foi cadastrado'
                }
            ];
        }
        if (errors) {
            let modelCategoria = new application.app.models.Categoria(connection);
            modelCategoria.getAll((error, result) => {
                res.render('deposito/modelo/add_modelo', {categorias : result, validacao : errors, usuario : req.session.usuario});
                return;
            });
            return
        }
        modelModelo.salvar(modelo, (error, result) => {
          res.redirect('/deposito/modelos?mensagem=0');
      }); 

    });
}

module.exports.excluir = (application, req, res) => {
    let id = req.query;

    let connection = application.config.database();
    let modelModelo = new application.app.models.Modelo(connection);

    modelModelo.excluir(id, (error, result) => {
        res.redirect('/deposito/modelos?mensagem=3');
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
            res.render('deposito/modelo/edit_modelo', {usuario : usuario, modelo : resultModelo, categorias : resultCategoria});
        });
    });
    
}

module.exports.update = (application, req, res) => {
    let form = req.body;

    let connection = application.config.database();
    let modelModelo = new application.app.models.Modelo(connection);

    modelModelo.getNomeModelo(form, (error, resultModelo) => {
        req.assert('nome', 'O nome do setor é obrigatório').notEmpty();
        let errors = req.validationErrors();
        if (resultModelo[0] != undefined) {
            errors = [
                {
                    msg : 'Este modelo já foi cadastrado'
                }
            ];
        }

        if (errors) {
            let modelCategoria = new application.app.models.Categoria(connection);
            modelCategoria.getAll((error, resultCategoria) => {
                res.render('deposito/modelo/add_modelo', {categorias : resultCategoria, validacao : errors, usuario : req.session.usuario});
                return;
            }); 
            return;
        };

        modelModelo.editar(form, (error, result) => {
            res.redirect('/deposito/modelos?mensagem=2');
        });
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
    let modelModelo = new application.app.models.Modelo(connection);

    modelModelo.getPaginacao(limit, (error, resultPaginacao) => {
        modelModelo.getCount((error, resultCount) => {
            let numeroLinhas = resultCount[0].num_rows;
            let quantidadePaginas;

            if (numeroLinhas % 8 == 0) {
                quantidadePaginas = numeroLinhas/8;
            }else {
                quantidadePaginas = Math.floor((numeroLinhas+8) / 8);
            }

            res.render('deposito/modelo/modelos', {modelos : result, usuario : usuario, numeroLinhas : numeroLinhas,  quantidadePaginas : quantidadePaginas, validacao : {}});
        });
    });
}