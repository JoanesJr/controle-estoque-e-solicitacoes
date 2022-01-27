module.exports.index = (application, req, res) => {
    if(!req.session.autenticado) {
        res.redirect('/');
        return;
    }
    let connection = application.config.database();
    let modelItem = new application.app.models.Item(connection);

    let limit = {
        inicio : 0,
        final : 4
    };

    modelItem.getPaginacao(limit, (error, resultItens) => {
        if(resultItens === undefined) {
            resultItens = {};
        }

        let connection = application.config.database();
        let modelItem = new application.app.models.Item(connection);
        
        modelItem.getCount((error, result) => {
            let numeroLinhas = result[0].num_rows;
            let quantidadePaginas;

            if (numeroLinhas % 4 == 0) {
                quantidadePaginas = numeroLinhas/4;
            }else {
                quantidadePaginas = Math.floor((numeroLinhas+4) / 4);
            }

            res.render('deposito/index', {itens : resultItens, usuario : req.session.usuario, numeroLinhas : numeroLinhas, quantidadePaginas : quantidadePaginas});
        });
        
    });
}