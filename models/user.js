const { Schema, model } = require('mongoose')
// This tells the application what the data will look like for a user and what needs to be entered when creating a new user
const userSchema = new Schema ({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true, 
    },

    email: {
        type: String,
        unique: true,
        required: true,
        match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/, 'Email needs to be valid']
    },
    thoughts: [{
        type: Schema.Types.ObjectId,
        ref: 'thought',
    }],
    friends: [{
        type: Schema.Types.ObjectId,
        ref: 'user',
    }]

},
{
   toJSON:{
    virtuals: true,
   } 
})

userSchema.virtual('friendCount').get(function(){
    return this.friends.length
})

const User = model('user', userSchema)
module.exports = User