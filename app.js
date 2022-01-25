const application = require('./config/server');

application.listen(80, (req, res) => {
    console.log("Servidor ON");
});