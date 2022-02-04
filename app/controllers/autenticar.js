module.exports.autenticar = (application, req, res) => {
    let usuario = req.body;

    let connection = application.config.database();
    let modelUsuario = new application.app.models.Usuario(connection);

    modelUsuario.validacao(usuario, (error, result) => {
        if(result[0] == undefined) {
            req.session.autenticado = false;
        }else {
            req.session.autenticado = true;
            req.session.usuario = result[0].usuario;
        }
        
        if(req.session.autenticado) {
            res.redirect('/deposito');
            return;
            
        } else {
            let errors = {
                msg : 'Usuario ou Senha incorretos'
            };

           

            res.render('login/index', {validacao : errors, validation : true});
        }
    });
}

module.exports.autenticarAdministrador = (application, req, res) => {
    let administrador = req.body;

    let connection = application.config.database();
    let modelUsuario = new application.app.models.Usuario(connection);

    modelUsuario.autenticarAdministrador(administrador, (error, result) => {
        if(result[0] !=undefined) {
            req.session.autenticado = true;
            req.session.usuario = result.usuario;
        }else {
            req.session.autenticado = false;
        }
        
        if(req.session.autenticado) {
            res.redirect('/administrador/home');
        } else {
            let errors = {
                msg : 'Login ou Senha Incorreto'
            };
            res.render('login/login_administrador', {validacao : errors, validation : true});
        }
    });
}



module.exports.sair = (application, req, res) => {
    req.session.destroy();
    res.redirect('/');
}