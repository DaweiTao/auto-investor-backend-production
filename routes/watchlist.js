const express = require("express");
const authGuard = require("../middleware/auth-guard");
const Watchlist = require("../models/watchlist");
const watchlistRouter = express.Router()

watchlistRouter.get("/:uid", authGuard, (req, res, next) => {
    Watchlist.findOne({uid: req.params.uid})
        .then(watchlistDoc => {
            if (watchlistDoc) {
                res.json({
                    watchlist: watchlistDoc.watchlist,
                    message: `Watchlist found!`
                })
                return
            }

            res.json({
                watchlist: null,
                message: `Watchlist not found!`,
            })
        })
        // .catch(err => {
        //     console.log(err);
        //     res.json({
        //         watchlist: null,
        //         message: `Watchlist not found!`,
        //         err: err
        //     })
        // })
})

watchlistRouter.post("/update", authGuard, (req, res, next) => {
    const userWatchlist = new Watchlist({
        uid: req.body.uid,
        watchlist: req.body.watchlist
    })
    userWatchlist.save()
        .then(savedWatchlistDoc => {
            res.json({
                watchlist: savedWatchlistDoc.watchlist,
                message: `Watchlist updated!`,
            })
        })
        .catch(err => {
            res.json({
                watchlist: null,
                message: `Watchlist cannot found!`,
            })
        })
})

module.exports = watchlistRouter;