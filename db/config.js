const mongoose = require('mongoose');
const {DB_STORE} = require('../configjs');

const db =DB_STORE;
mongoose.connect(db);
mongoose.connection
.once('connected',()=>{console.log('connected')})
.on('error',(err)=>{console.log(err)});

mongoose.Promise = global.Promise;

module.exports =  mongoose;
