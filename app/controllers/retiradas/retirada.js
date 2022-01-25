module.exports.retirada = (application, req, res) => {
    if(!req.session.autenticado) {
        res.redirect('/');
        return;
    }
    let connection = application.config.database();
    let modelRetirada = new application.app.models.Retirada(connection);
    let usuario = req.session.usuario;

    modelRetirada.getAll((error, result) => {
        res.render('retirada/index', {itens : result, usuario : usuario});
    });
}

module.exports.addRetirada = (application, item) => {
    let connection = application.config.database();
    let modelRetirada = new application.app.models.Retirada(connection);

    modelRetirada.adicionar(item, (error, result) => {});
}