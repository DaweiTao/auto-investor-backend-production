const mongoose = require("mongoose")
const Schema = mongoose.Schema
const UniqueValidator = require("mongoose-unique-validator")

const WatchlistSchema = new Schema(
    {
        uid: {type: String, required: true, unique: true, index: true},
        watchlist: {type: [String], required: true},
    },
    {
        timestamps: true
    }
)


// ensure each user only have one watchlist
WatchlistSchema.plugin(UniqueValidator)
module.exports = mongoose.model("Watchlist", WatchlistSchema)
