const express = require('express');
const router = express.Router();
const Event = require('../models/Biennale')
require('dotenv').config()

router.get('/', (req, res, next)=>{
    Event.find({})
    .then(dataFromDB=>{
        const apiId = process.env.CLIENT_ID;
        console.log(apiId)
        res.status(200).json({data:dataFromDB, apiId:apiId})
    })
    .catch(error=>{
        console.log(error)
    })
})


router.get('/current_and_upcoming', (req, res, next)=>{
    const today = new(Date);
    Event.find({'rescheduledClsday':{$gte:today}})
    .then(currentEventForFrontEnd=>{
        const apiId = process.env.CLIENT_ID;
        res.status(200).json({data:currentEventForFrontEnd, apiId:apiId})
    })
    .catch(error=>{
        console.log(error)
    })
})


router.get("/current_and_upcoming_biennale", (req, res, next)=>{
    const today = new(Date)
    Event.find({"rescheduledClsday":{$gte:today}, "type_of_event":"biennale"})
    .then(currentEventForFrontEnd=>{
        const apiId = process.env.CLIENT_ID;
        res.status(200).json({data:currentEventForFrontEnd, apiId:apiId})
    })
    .catch(error=>{
        console.log(error)
    })
})

router.get("/current_and_upcoming_artfair", (req, res, next)=>{
    const today = new(Date)
    Event.find({"rescheduledClsday":{$gte:today}, "type_of_event":"art fair"})
    .then(currentEventForFrontEnd=>{
        const apiId = process.env.CLIENT_ID;
        res.status(200).json({data:currentEventForFrontEnd, apiId:apiId})
    })
    .catch(error=>{
        console.log(error)
    })
})

router.get("/:id", (req, res, next)=>{
    Event.find({"_id":req.params.id})
    .then(dataForFrontEnd=>{
        const apiId = process.env.CLIENT_ID;
        res.status(200).json({data:dataForFrontEnd, apiId:apiId})
    })
    .catch(error=>{
        console.log(error)
    })
})




module.exports = router;