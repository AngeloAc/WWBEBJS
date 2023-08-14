const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// require('dotenv').config();

const schema = new Schema({
    name: {
        type: String,
        required: true,
        maxlength: 50,
    },
    email: {
        type: String,
        required: true,
        maxlength: 50,
    },
    password: {
        type: String,
        required: true,
    },
    porta: {
        type: String,
    },
    addons: [
        {
            app: { type: String},
            installed: { type: Boolean, default: false },
            model: { type: String, default: 'business' },
            status: { type: String, default: 'install' },
        }
    ],
    script:[
        {
            title: { type: String, default: null },
            text: { type: String, default: null }
        }
    ]
    ,
    conversations:[
        {
            name: { type: String, default: null },
            description: {type: String, default: null},
            messages: [{
                text: {type: String, default:null},
                isUser: { type: Boolean }
            }],
            lastMessage:{type: String},
        }
    ]
    ,
    tokens:[
        {
            token: { type: String, required: true }
        }
    ],   
},
    {
        timestamps: true,
        collection: 'users'
    }
);

// Methodo responsavel por fazer o hash da senha antes que seja savo no database.
// schema.pre('save', async function(next) {
//     const user = this;
    
//     if (user.isModified('password')) {
//         user.password = await bcrypt.hash(user.password, 8);
//     }
//     next();
// });

// vai gerar uma authenticação para o token...
// schema.methods.generateAuthToken = async function(){
//     const user = this;
//     const token = jwt.sign({_id: user._id, name: user.name, email: user.email, porta: user.porta}, process.env.TOKEN_KEY);
//     user.tokens = user.tokens.concat({token});
//     await user.save();
//     return token;
    
// };
// schema.statics.findByCredentials = async (email, password)=>{
//     const user = await User.findOne({ email });
//     if(!user){
//         throw new Error({error: "Login Invalido."})
        
//     }
//     const isPasswordMatch = await bcrypt.compare(password, user.password);
//     if(!isPasswordMatch){
//         throw new Error({ error: "Login Invalido." })
//     }
//     return user;
// }

const User = mongoose.model('Users', schema);
module.exports = User;