import mongoose from 'mongoose';
import mongo_info from './connectmongo.js';
const {Schema,model} = mongoose;


mongoose.connect(mongo_info.name_colection);
const profileSchema = new Schema({
    keyword:String,
    urlAuthor:String,
    nameAuthor:String,
    nicknameAuthor:String,
    descriptionAuthor:String,
    follow:Number
}, { versionKey: false })
export default model('authorkeyword',profileSchema);
