const mongoose = require('mongoose');

const db = "mongodb://root:1234@ds129004.mlab.com:29004/cdc_form"
mongoose.connect(db);
mongoose.connection
.once('connected',()=>{console.log('connected')})
.on('error',(err)=>{console.log(err)});

mongoose.Promise = global.Promise;

module.exports =  mongoose;
