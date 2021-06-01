const express = require("express");
const router = express.Router();

router.get("/", (req, res, next)=>{
    res.render("map/map")
})

router.get("/current_and_upcoming", (req, res, next)=>{
    res.render("map/current_and_upcoming")
})

router.get("/current_and_upcoming_biennale", (req, res, next)=>{
    res.render("map/current_and_upcoming_biennale")
})


router.get("/current_and_upcoming_artfair", (req, res, next)=>{
    res.render("map/current_and_upcoming_artfair")
})

module.exports = router

