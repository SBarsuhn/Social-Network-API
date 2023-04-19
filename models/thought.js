const { Schema, model } = require('mongoose')
const reactionSchema = require('./reaction')
const format = require('../utils/date')
const thoughtSchema = new Schema ({
   thoughtText: {
        type: String,
        required: true,
        maxlength: 280,
        minlength: 1,
        
    },

    createdAt: {
        type: Date,
        default: Date.now,
        get: timestamp => {
            format(timestamp)
        },
    },
    username: {
        type: String,
        required: true,
    },
    reactions: [
        reactionSchema
    ],

},
{
    
    toJSON:{
     virtuals: true,
     getters: true,
    } 
})

thoughtSchema.virtual('reactionCount').get(function(){
    return this.reactions.length
})

const Thought = model('thought',thoughtSchema)
module.exports = Thought