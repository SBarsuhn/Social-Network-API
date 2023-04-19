const { Schema, model } = require('mongoose')
const format = require('../utils/date')
const reactionSchema = new Schema ({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => {
            new Types.ObjectId()
        },
    },


   reactionBody: {
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
 

},
{
    toJSON:{
     getters: true,
    }, 
})

module.exports = reactionSchema