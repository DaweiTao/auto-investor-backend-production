const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TickerDataSchema = new Schema(
    {}
);

module.exports = mongoose.model("TickerData", TickerDataSchema, "ticker-data")