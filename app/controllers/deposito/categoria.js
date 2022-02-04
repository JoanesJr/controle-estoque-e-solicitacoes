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

            res.render('deposito/categoria/categorias', {categorias : resultPaginacao, usuario : usuario, numeroLinhas : numeroLinhas,  quantidadePaginas : quantidadePaginas, validacao : mensagem});
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

    let connection = application.config.database();
    let modelCategoria = new application.app.models.Categoria(connection);

    modelCategoria.getNomeCategoria(categoria.nome, (error, resultNome) => {
        req.assert('nome', 'O nome da categoria é obrigatório').notEmpty();
        categoria.nome = categoria.nome.toUpperCase();
        let errors = req.validationErrors();
        if (resultNome[0] != undefined) {
            errors = [
                {
                    msg : 'A Categoria já existe'
                }
            ];
        }
        
        if (errors) {
            res.render('deposito/categoria/add_categoria', {validacao : errors, usuario : req.session.usuario});
            return;
        }

        modelCategoria.salvar(categoria, (error, result) => {
            res.redirect('/deposito/categorias?mensagem=0');
        }); 
    });

}

module.exports.excluir = (application, req, res) => {
    let id = req.query;

    let connection = application.config.database();
    let modelCategoria = new application.app.models.Categoria(connection);
    let modelModelo = new application.app.models.Modelo(connection);

    modelModelo.getModeloCategoria(id.id, (error, resultCategoria) => {
        let errors = false;
        if(resultCategoria[0] != undefined) {
            errors = true;
        }

        if (errors) {
            res.redirect('/deposito/categorias?mensagem=1');
            return;
        }
        modelCategoria.excluir(id, (error, result) => {
            res.redirect('/deposito/categorias?mensagem=3');
        });
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

    modelCategoria.getNomeCategoria(form.nome, (error, resultNome) => {
        req.assert('nome', 'O nome da categoria é obrigatório').notEmpty();
        form.nome = form.nome.toUpperCase();
        let errors = req.validationErrors();
        if (resultNome[0] != undefined) {
            errors = [
                {
                    msg : 'A Categoria já existe'
                }
            ];
        }
         
        if (errors) {
            res.render('deposito/categoria/add_categoria', {validacao : errors, usuario : req.session.usuario});
            return;
        }
        modelCategoria.editar(form, (error, result) => {
            res.redirect('/deposito/categorias?mensagem=2');
        });
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

            res.render('deposito/categoria/categorias', {validacao : {}, categorias : resultPaginacao, usuario : usuario, numeroLinhas : numeroLinhas,  quantidadePaginas : quantidadePaginas});
        });
    });
}