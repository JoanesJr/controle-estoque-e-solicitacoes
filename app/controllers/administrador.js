module.exports.administrador = (application, req, res) => {
    if(!req.session.autenticado) {
        res.redirect('/administrador');
        return;
    }

    let connection = application.config.database();
    let modelUsuario = new application.app.models.Usuario(connection);
    let usuario = req.session.usuario;
    
    let limit = {
        inicio : 0,
        final : 7
    };

    modelUsuario.getPaginacao(usuario, limit, (error, resultPaginacao) => {
        if(resultPaginacao === undefined) {
            resultPaginacao = {};
        }

        modelUsuario.getCount((error, result) => {
            let numeroLinhas = result[0].num_rows;
            let quantidadePaginas;

            if (numeroLinhas % 8 == 0) {
                quantidadePaginas = numeroLinhas/8;
            }else {
                quantidadePaginas = Math.floor((numeroLinhas+8) / 8);
            }

            res.render('administrador/index', {usuarios : resultPaginacao, usuario : req.session.usuario, validacao : {}, validation : false, numeroLinhas : numeroLinhas,  quantidadePaginas : quantidadePaginas});
        });     
    });
    
}

module.exports.addUsuario = (application, req, res) => {
    if(!req.session.autenticado) {
        res.redirect('/administrador');
        return;
    }

    let usuario = req.session.usuario;
    res.render('administrador/add_usuario', {usuario : usuario, validacao : {}});
}

module.exports.criarUsuario = (application, req, res) => {
    let form = req.body;
    
    let connection = application.config.database();
    let modelUsuario = new application.app.models.Usuario(connection);
    modelUsuario.getUsuario(form.usuario, (error, resultUsuario) => {
        req.assert('nome', 'O nome é obrigatório').notEmpty();
        req.assert('usuario', 'O usuário é obrigatório').notEmpty();
        req.assert('senha', 'A senha é obrigatória').notEmpty();
        let errors = req.validationErrors();

        if (resultUsuario[0] != undefined) {
            errors = [
                {
                    msg : 'Usuario já existe'
                }
            ];
        }

        if(errors) {
            res.render('administrador/add_usuario', {validacao : errors, usuario : req.session.usuario});
            return;
        }
    
        modelUsuario.criarUsuario(form, (error, result) => {
            res.redirect('/administrador/home');
        });
    });
}

module.exports.editar = (application, req, res) => {
    if(!req.session.autenticado) {
        res.redirect('/administrador');
        return;
    }

    let usuario = req.session.usuario;
    let id = req.query.id;
    res.render('administrador/editar', {usuario : usuario, id : id, validacao : {}});
}

module.exports.update = (application, req, res) => {
    let usuario = {};
    usuario.id = req.query.id;
    usuario.senha = req.body.senha;

    req.assert('senha', "A senha não pode ser nula").notEmpty();
    let errors = req.validationErrors();

    if(errors) {
        res.render('administrador/editar', {usuario : usuario, id : usuario.id, validacao : errors});
        return;
    }

    let connection = application.config.database();
    let modelUsuario = new application.app.models.Usuario(connection);

    modelUsuario.editar(usuario, (error, result) => {
        console.log(usuario);
        res.redirect('/administrador/home');
    });

}

module.exports.excluir = (application, req, res) => {
    let id = req.query.id;

    let connection = application.config.database();
    let modelUsuario = new application.app.models.Usuario(connection);

    modelUsuario.excluir(id, (error, result) => {
        res.redirect('/administrador/home');
    });
}

module.exports.pagina = (application, req, res) => {
    let paginaDestino = req.query.pagina;
    let limit = {};
    if (paginaDestino == 1) {
        limit = {
            inicio : 0,
            final : 7
        };
    }else {
        limit = {
            inicio : paginaDestino * 7 - 7,
            final : 7
        };
    
    }

    let usuario = req.session.usuario;
    let connection = application.config.database();
    let modelUsuario = new application.app.models.Usuario(connection);

    modelUsuario.getPaginacao(usuario, limit, (error, resultPaginacao) => {
        modelUsuario.getCount((error, resultCount) => {
            let numeroLinhas = resultCount[0].num_rows;
            let quantidadePaginas;

            if (numeroLinhas % 8 == 0) {
                quantidadePaginas = numeroLinhas/8;
            }else {
                quantidadePaginas = Math.floor((numeroLinhas+8) / 8);
            }

            res.render('administrador/index', {usuarios : resultPaginacao, usuario : usuario, numeroLinhas : numeroLinhas,  quantidadePaginas : quantidadePaginas});
        });
    });
}