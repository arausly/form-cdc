const mongoose =  require('mongoose');
const {Schema}  = mongoose;

const formSchema = new Schema({
    name:String,
    sex:String,
    ans1:String,
    ans2:String,
    ans3:String,
})

module.exports = mongoose.model('cdcForm',formSchema);