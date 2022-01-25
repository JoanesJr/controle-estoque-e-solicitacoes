module.exports.addItem = (application, req, res) => {
    if(!req.session.autenticado) {
        res.redirect('/');
        return;
    }

    let usuario = req.session.usuario;
    let connection = application.config.database();
    let modelCategoria = new application.app.models.Categoria(connection);
    let modelUnidadeMedidaModel = new application.app.models.UnidadeMedida(connection);
    let modelModelo = new application.app.models.Modelo(connection);

    modelCategoria.getAll((error, result1) => {
        modelUnidadeMedidaModel.getAll((error, result2) => {
            modelModelo.getAll((error, result3) => {
                res.render('deposito/add_item', {usuario : usuario, categorias : result1, unidadeMedida : result2, modelos : result3, validation : {}, item : {}});
            });
        });  
    });
}

module.exports.salvarItem = (application, req, res) => {
    let item = req.body;
    let connection = application.config.database();
    let modelCategoria = new application.app.models.Categoria(connection);
    let modelUnidadeMedidaModel = new application.app.models.UnidadeMedida(connection);
    let modelModelo = new application.app.models.Modelo(connection);
    let modelItem = new application.app.models.Item(connection);

    req.assert('nome', "O nome é obrigatório").notEmpty();
    req.assert('quantidade', "A quantidade é obrigatória").notEmpty();
    req.assert('categoria', "a Categoria é obrigatório").notEmpty();
    req.assert('unidade_medida', "A unidade de medida é obrigatória").notEmpty();
    req.assert('modelo', "O modelo é obrigatório").notEmpty();

    let errors = req.validationErrors();

    if(errors) {
        modelCategoria.getAll((error, result1) => {
            modelUnidadeMedidaModel.getAll((error, result2) => {
                modelModelo.getAll((error, result3) => {
                    res.render('deposito/add_item', {categorias : result1, unidadeMedida : result2, modelos : result3, validation : errors, item : item});
                });
            });  
        });
        return;
    }

    modelItem.salvarItem(item, (error, result) => {
        res.redirect('/deposito');
    });
};

module.exports.reduzirItem = (application, req, res) => {
    let quantidade = req.body.quantidade;
    let id = req.body.id;

    let connection = application.config.database();
    let modelItem = new application.app.models.Item(connection);

    modelItem.getItem(id, (error, resultItem) => {
        let controle = resultItem[0].quantidade;
        controle -= parseInt(quantidade);
        modelItem.alterarQuantidadeItem(controle, id, (error, result) => {
            let retirada = {
                nome : resultItem[0].nome,
                quantidade : quantidade,
                modelo : resultItem[0].modelo,
                categoria : resultItem[0].categoria,
                unidade_medida : resultItem[0].unidade_medida,
                usuario : req.session.usuario
    
            };
            application.app.controllers.retirada.addRetirada(application, retirada);
            res.redirect('/deposito');
        });
    });
}

module.exports.aumentarItem = (application, req, res) => {
    let quantidade = req.body.quantidade;
    let id = req.body.id;

    let connection = application.config.database();
    let modelItem = new application.app.models.Item(connection);

    modelItem.getItem(id, (error, result) => {
        let controle = result[0].quantidade;
        controle += parseInt(quantidade);

        modelItem.alterarQuantidadeItem(controle, id, (error, result) => {
            res.redirect('/deposito');
        });
    });
};

module.exports.excluir = (application, req, res) => {
    let id = req.query.id;

    let connection = application.config.database();
    let modelItem = new application.app.models.Item(connection);
    
    modelItem.excluir(id, (error, result) => {
        res.redirect('/deposito');
    });
}

module.exports.editar = (application, req, res) => {
    if(!req.session.autenticado) {
        res.redirect('/');
        return;
    }

    let id = req.query.id;
    let usuario = req.session.usuario

    let connection = application.config.database();
    let modelCategoria = new application.app.models.Categoria(connection);
    let modelUnidadeMedidaModel = new application.app.models.UnidadeMedida(connection);
    let modelModelo = new application.app.models.Modelo(connection);
    let modelItem = new application.app.models.Item(connection);

    modelCategoria.getAll((error, resultCategoria) => {
        modelUnidadeMedidaModel.getAll((error, resultUnidadeMedida) => {
            modelModelo.getAll((error, resultModelo) => {
                modelItem.getItem(id, (error, resultItem) => {
                    res.render('deposito/editar', {usuario : usuario, categorias : resultCategoria, unidadeMedida : resultUnidadeMedida, modelos : resultModelo, validation : {}, item : resultItem});
                });
                
            });
        });  
    });
}

module.exports.update = (application, req, res) => {
    let form = req.body;
    form.id = req.query.id;
    console.log(form);

    let connection = application.config.database();
    let modelItem = new application.app.models.Item(connection);

    modelItem.update(form, (error, result) => {
        res.redirect('/deposito');
    });

}