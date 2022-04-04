const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors")
// const conf = require("./env/config")
const authRouter = require("./routes/auth");
const watchlistRouter = require("./routes/watchlist")
const quotesRouter = require("./routes/quotes")
const tickerDataRouter = require("./routes/ticker-data")

console.log("\n******************Starting server******************\n")
console.log(process.env)

// mongodb
mongoose
    .connect(process.env.MONGODB_CONN_STR)
    .then(() => {
        console.log("MongoDB: connected!")
    })
    .catch((err) => {
        console.log("MongoDB: connection failed:")
        console.log(err)
    })

// server
const app = express()
// port must be 8080 for aws
const port = 8080

// middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// api routes
app.use("/api/auth", authRouter);
app.use("/api/watchlist", watchlistRouter)
app.use("/api/quotes", quotesRouter)
app.use("/api/ticker-data", tickerDataRouter)

app.listen(port, () => {
    console.log(`Listen on port: ${port}`)
})