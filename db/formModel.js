const mongoose =  require('mongoose');
const {Schema}  = mongoose;

const formSchema = new Schema({
    name:{
        type:String,
        required:true,
    },
    sex:{
        type:String,
        required:true,
    },
    ans1:String,
    ans2:String,
    ans3:String,
})

module.exports = mongoose.model('cdcForm',formSchema);