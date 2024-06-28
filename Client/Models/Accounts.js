const { model, Schema } = require("mongoose");

const accountSchema = new Schema({
    guildId: {
        type: String,
        default: ""
    },
    accountId: {
        type: String,
        default: ""
    },
    service: {
        type: String,
        default: ""
    },
    username: {
        type: String,
        default: ""
    },
    password: {
        type: String,
        default: ""
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

accountSchema.indexes({ accountId: 1 });
module.exports = model("Accounts", accountSchema);