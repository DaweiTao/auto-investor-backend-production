const express = require("express");
const authGuard = require("../middleware/auth-guard");
const tickerDataRouter = express.Router()
const mongoose = require("mongoose");
const TickerData = require("../models/ticker-data");

tickerDataRouter.get("", authGuard, (req, res, next) => {
    let symbol = req.query.symbol
    TickerData.aggregate(
        [
            {
                '$match': {
                    'contract.symbol': {
                        '$eq': symbol 
                    }
                }
            }, { 
                '$limit': 1 
            },{
                '$project': {
                    'contract': 1,
                    'tickerData': 1,
                    '_id': 0,
                }
            }
        ]
    ).then(tickerDataDoc => {
        if (tickerDataDoc && tickerDataDoc.length >= 1) {
            res.json(tickerDataDoc[0])
            return
        }

        res.json(null)
    })
})

module.exports = tickerDataRouter;