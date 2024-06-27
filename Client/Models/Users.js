const { model, Schema } = require("mongoose");

const userSchema = new Schema({
    userId: {
        type: String,
        default: ""
    },
    premium: {
        type: Boolean,
        required: true
    },
    cooldown: { 
        type: Date, 
        default: Date.now 
    }
});

userSchema.indexes({ userId: 1 });
module.exports = model("Users", userSchema);