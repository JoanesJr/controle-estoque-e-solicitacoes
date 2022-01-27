module.exports.retirada = (application, req, res) => {
    if(!req.session.autenticado) {
        res.redirect('/');
        return;
    }
    let connection = application.config.database();
    let modelRetirada = new application.app.models.Retirada(connection);
    let usuario = req.session.usuario;

    let limit = {
        inicio : 0,
        final : 10
    };

    modelRetirada.getPaginacao(limit, (error, resultPaginacao) => {
        if(resultPaginacao === undefined) {
            resultPaginacao = {};
        }
        modelRetirada.getCount((error, result) => {
            let numeroLinhas = result[0].num_rows;
            let quantidadePaginas;

            if (numeroLinhas % 10 == 0) {
                quantidadePaginas = numeroLinhas/10;
            }else {
                quantidadePaginas = Math.floor((numeroLinhas+10) / 10);
            }
            res.render('retirada/index', {itens : resultPaginacao, usuario : usuario, numeroLinhas : numeroLinhas,  quantidadePaginas : quantidadePaginas});
        });
    });
}

module.exports.addRetirada = (application, item) => {
    let connection = application.config.database();
    let modelRetirada = new application.app.models.Retirada(connection);

    modelRetirada.adicionar(item, (error, result) => {});
}

module.exports.pagina = (application, req, res) => {
    let paginaDestino = req.query.pagina;
    let limit = {};
    if (paginaDestino == 1) {
        limit = {
            inicio : 0,
            final : 10
        };
    }else {
        limit = {
            inicio : paginaDestino * 10 - 10,
            final : 10
        };
    
    }

    let usuario = req.session.usuario;
    let connection = application.config.database();
    let modelRetirada = new application.app.models.Retirada(connection);

    modelRetirada.getPaginacao(limit, (error, resultRetiradas) => {
        modelRetirada.getCount((error, resultCount) => {
            let numeroLinhas = resultCount[0].num_rows;
            let quantidadePaginas;

            if (numeroLinhas % 10 == 0) {
                quantidadePaginas = numeroLinhas/10;
            }else {
                quantidadePaginas = Math.floor((numeroLinhas+10) / 10);
            }

            res.render('retirada/index', {itens : resultRetiradas, usuario : usuario, numeroLinhas : numeroLinhas,  quantidadePaginas : quantidadePaginas});
        });
    });
}