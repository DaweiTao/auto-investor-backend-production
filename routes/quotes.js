const express = require("express");
const authGuard = require("../middleware/auth-guard");
const quotesRouter = express.Router()
const mongoose = require("mongoose");
const TickerData = require("../models/ticker-data");


quotesRouter.get("", authGuard, (req, res, next) => {
    let symbols = JSON.parse(req.query.symbols)
    TickerData.aggregate(
        [
          {
            '$match': {
              'contract.symbol': {
                '$in': symbols
              }
            }
          }, {
            '$project': {
              'contract': 1, 
              '_id': 0,
              'latestQuote': {
                '$arrayElemAt': [
                  '$tickerData', {
                    '$indexOfArray': [
                      '$tickerData.epoch', {
                        '$max': '$tickerData.epoch'
                      }
                    ]
                  }
                ]
              }
            }
          }
        ]
    ).then(tickerDataDocs => {
        if (tickerDataDocs) {
            res.json(tickerDataDocs)
            return
        }

        res.json(null)
    })
})

module.exports = quotesRouter;