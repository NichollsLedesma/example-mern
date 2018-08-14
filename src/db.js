const mongoose = require('mongoose');

const URI = 'mongodb://localhost:27017/test';

mongoose.connect(URI, { useNewUrlParser: true })
    .then(db=> console.log('Connected mongodb'))
    .catch(err=> console.log('Error al conectar', err));

module.exports  = mongoose;