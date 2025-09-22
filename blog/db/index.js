const mongoose = require("mongoose");

const { DB_CONNECTION_URI } = process.env;

/**
 * Connect to Atlas MongoDB cluster
 */
const connect = async () => {
    try {
        await mongoose.connect(DB_CONNECTION_URI);

        console.log("DB Connected");
    } catch(error) {
        throw error;
    }
}

/**
 * Disconnect from Atlas MongoDB cluster
 */
const disconnect = async () => {
    try {
        await mongoose.disconnect();

        console.log("DB Disconnected");
    } catch(error) {
        throw error;
    }
}

const models = {
    User: require("./models/User"),
    Article: require("./models/Article"),
    Category: require("./models/Category"),
    Comment: require("./models/Comment"),
    Tag: require("./models/Tag"),
}

module.exports = {
    connect,
    disconnect,
    ...models,
}