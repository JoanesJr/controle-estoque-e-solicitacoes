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
                    msg : "Entrada adiciona com sucesso",
                    alert : 'alert alert-success'
                }];
                break;
            case 5:
                mensagem = [{
                    msg : "Retirada adiciona com sucesso",
                    alert : 'alert alert-success'
                }];
                break;
            case 6:
                mensagem = [{
                    msg : "Ocorreu um erro ao editar ao editar: Todos os campos são obrigatórios",
                    alert : 'alert alert-danger'
                }];
                break;
        }
    }

    modelItem.getPaginacao(limit, (error, resultItens) => {
        console.log("error: " + error)
        console.log("result: " + resultItens)
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

            res.render('deposito/index', {validacao : mensagem, itens : resultItens, usuario : req.session.usuario, numeroLinhas : numeroLinhas, quantidadePaginas : quantidadePaginas});
        });
        
    });
}