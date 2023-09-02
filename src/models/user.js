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
    country:{ type: String, default: 'Angola' },
    countryCode: { type: String, default: '+244'},
    language: { type: String, default: 'Portugues' },
    telefone: { type: Number, default: null },
    plano: { type: String, default: 'Free' },
    porta: {
        type: String,
    },
    addons: [
        {
            app: { type: String},
            installed: { type: Boolean, default: false },
            model: { type: String, default: 'business' },
            status: { type: String, default: 'install' },
            userNumber: { type: String, default: null},
            userName: {type: String, default: null},
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
    code:[
        {   
            name: { type: String, default: null },
            code: { type: String, default: null },
            description: {type: String, default: null},
            messages: [{
                text: {type: String, default:null},
                isUser: { type: Boolean }
            }],
            lastMessage:{type: String},
        }
    ],
    codeStatus:{ type: String, default: true },
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


const User = mongoose.model('Users', schema);
module.exports = User;