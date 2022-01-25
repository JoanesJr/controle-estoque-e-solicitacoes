module.exports.index = (application, req, res) => {
    if(!req.session.autenticado) {
        res.redirect('/');
        return;
    }
    let connection = application.config.database();
    let modelItem = new application.app.models.Item(connection);
   

    modelItem.getAll((error, result) => {
        if(result === undefined) {
            result = {};
        }
        res.render('deposito/index', {itens : result, usuario : req.session.usuario});
    });
}