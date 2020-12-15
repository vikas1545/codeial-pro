const mongoose = require('mongoose');

const multer = require('multer');
const path = require('path');

const AVTAR_PATH = path.join('/uploads/users/avatars');
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    avatar : {
        type:String
    }
}, {
    timestamps: true
});

let storage = multer.diskStorage({
    destination:function(req,file,cb) {
        //Here 1st argument of cb'null'specify no error,2nd specify the directory where uploded file will be stored  
        cb(null,path.join(__dirname,'..',AVTAR_PATH));
    },
    filename:function(req,file,cb) {
        //Here 1st argument of cb'null'specify no error,2nd filename is being modified by concatinating time for uniqueness 
        cb(null,file.filename+'-'+Date.now());
        //Saving with original file extention
        // cb(null,file.filename+'-'+Date.now() + path.extname(file.originalname));
    }
}); 
// static methods can be accessed from anywhere within the project ,No need of routing configuration 
// avatar is input field name in user_profile.ejs file
userSchema.statics.uploadedAvatar = multer ({storage:storage}).single('avatar');  
userSchema.statics.avatarPath = AVTAR_PATH;
const User = mongoose.model('User', userSchema);
module.exports = User;
