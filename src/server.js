const express = require('express'),
    logger=require('morgan');
    path=require('path');
    app=express();

const { mongoose } = require('./db');

//config
app.set('port', process.env.PORT || 3000);

//middlewares
app.use(logger('dev'));
app.use(express.json());


//routes
app.use('/api/task', require('./routes/task.routes'));

//statics files
app.use( express.static(path.join(__dirname, 'public')) );

//startting
app.listen(app.get('port'), ()=>{
    console.log('Listenning to port '+app.get('port'));
});