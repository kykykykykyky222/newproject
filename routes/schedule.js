const express = require("express");
const router = express.Router();
const Event = require("../models/Biennale");
const paginate = require("express-paginate");

const today = new (Date);


router.get("/", (req, res, next)=>{
    const options = {
        sort:{rescheduledOpnday:1},
        lean: true,
        limit:req.query.limit,
        page:req.query.page
    }
    Event.paginate({"rescheduledClsday":{$gte:today}}, options,(err, result)=>{
        console.log('kiyokiyo')
        let numberForCss = []
        for(let i=0; i < result.pages; i++){
            const object = {
                "number":i+1,
                "current_page":false
            }
            numberForCss.push(object)
        } 
        numberForCss[result.page-1].current_page = true

            let itemNumberInPage = {"min":0, "max":0}
            if( result.total > (result.limit*result.page)){
                itemNumberInPage.min = result.limit * (result.page - 1)+1;
                itemNumberInPage.max = result.limit * result.page
            } else {
                itemNumberInPage.min = result.limit * (result.page -1)+1;
                itemNumberInPage.max = result.total
            }
            
        res.render("schedule/schedule",{
            data:result.docs,
            itemNumberInPage:itemNumberInPage,
            currentPage:result.page,
            pageCount:result.pages,
            total:result.total,
            pageForCss:numberForCss,
        })
    })   
})


router.get("/postponed", (req, res, next)=>{
    const options = {
        sort:{rescheduledOpnday:1},
        lean: true,
        limit:req.query.limit,
        page:req.query.page
    }
     
    Event.paginate({"rescheduledClsday":{$gte:today}, "is_rescheduled":"on"}, options,(err, result)=>{
        let numberForCss = []
        for(let i=0; i < result.pages; i++){
            const object = {
                "number":i+1,
                "current_page":false
            }
            numberForCss.push(object)
        } 
        numberForCss[result.page-1].current_page = true

            let itemNumberInPage = {"min":0, "max":0}
            if( result.total > (result.limit*result.page)){
                itemNumberInPage.min = result.limit * (result.page - 1)+1;
                itemNumberInPage.max = result.limit * result.page
            } else {
                itemNumberInPage.min = result.limit * (result.page -1)+1;
                itemNumberInPage.max = result.total
            }
            
        res.render("schedule/postponed_schedule",{
            data:result.docs,
            itemNumberInPage:itemNumberInPage,
            currentPage:result.page,
            pageCount:result.pages,
            total:result.total,
            pageForCss:numberForCss,
        })
    })   
})

router.get('/detail/:id', (req, res, next)=>{
    Event.find({'_id':req.params.id})
    .then(detailFromDB=>{
        res.render('schedule/detail', {data:detailFromDB[0], user:req.user})
    })
    .catch(error=>{
        console.log(error)
    })
})



module.exports = router;