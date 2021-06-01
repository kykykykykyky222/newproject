const express = require("express");
const router = express.Router();
const Event = require("../models/Biennale");
const paginate = require("express-paginate")


router.get("/", (req, res, next)=>{
    res.render("search/search")
})


router.get("/result", (req, res, next)=>{
    Event.find({"name":{$regex:req.query.search, $options:"i"}})
    .then(resultFromDB=>{
        res.render("search/result", {data:resultFromDB})
    })
    .catch(error=>{
        console.log(error)
    })
})

router.get("/advance_search_result", (req, res, next)=>{
    const country  = req.query.country;
    const type_of_event = req.query.type_of_event;
    const year = req.query.year;
    const thisYear = new Date();
    const nextYear = new Date()
    thisYear.setFullYear(year, 0, 1);
    const number_for_nextYear= Number(year)+1
    nextYear.setFullYear(number_for_nextYear, 0, 1)

    const options = {
        sort:{rescheduledOpnday:1},
        lean: true,
        limit:req.query.limit,
        page:req.query.page
    }

    const pagenation = function(resultPage){
        let numberForCss = [];
        for(let i=0; i<resultPage;i++){
            const object = {
                "number":i+1,
                "current_page":false,
                "country":country,
                "type_of_event":type_of_event,
                "year":year
            }
            numberForCss.push(object)
        }
        return numberForCss
    }

    const minAndMax = function(limit, page, total){
        let itemNumberInPage = {"min":0, "max":0}
        if(total > limit * page){
            itemNumberInPage.min = limit * (page -1) + 1;
            itemNumberInPage.max = limit * page
        } else {
            itemNumberInPage.min = limit * (page-1) +1;
            itemNumberInPage.max = total
        }
        return itemNumberInPage
    }

    if(type_of_event==="" && country ===""){
        Event.paginate({"rescheduledOpnday":{$lt:nextYear}, "rescheduledClsday":{$gte:thisYear}}, options, (err, result)=>{
            const numberForSearch = pagenation(result.pages)
            numberForSearch[result.page-1].current_page = true;
            const itemNumberinPageForSearch = minAndMax(result.limit, result.page, result.total);
            console.log(numberForSearch)
            res.render("search/advance_search_result", {
                data:result.docs,
                itemNumberInPage:itemNumberinPageForSearch,
                currentPage:result.page,
                pageCount:result.pages,
                total:result.total,
                pageForCss:numberForSearch,
            })
            })
        }
    else if(type_of_event===""){
        Event.paginate({"country":country, "rescheduledOpnday":{$lte:nextYear}, "rescheduledClsday":{$gte:thisYear}}, options, (err, result)=>{
            const numberForSearch = pagenation(result.pages)
            numberForSearch[result.page-1].current_page = true;
            const itemNumberinPageForSearch = minAndMax(result.limit, result.page, result.total);
            res.render("search/advance_search_result", {
                data:result.docs,
                itemNumberInPage:itemNumberinPageForSearch,
                currentPage:result.page,
                pageCount:result.pages,
                total:result.total,
                pageForCss:numberForSearch,
            })
            return
        })
    }
    else if(country===""){
        Event.paginate({"type_of_event":type_of_event,  "rescheduledOpnday":{$lte:nextYear}, "rescheduledClsday":{$gte:thisYear}}, options, (err, result)=>{
            const numberForSearch = pagenation(result.pages)
            numberForSearch[result.page-1].current_page = true;
            const itemNumberinPageForSearch = minAndMax(result.limit, result.page, result.total);
            res.render("search/advance_search_result", {
                data:result.docs,
                itemNumberInPage:itemNumberinPageForSearch,
                currentPage:result.page,
                pageCount:result.pages,
                total:result.total,
                pageForCss:numberForSearch,
            })
            return
        })
    }
    else{
        Event.paginate({"type_of_event":type_of_event, "country":country,  "rescheduledOpnday":{$lte:nextYear}, "rescheduledClsday":{$gte:thisYear}}, options, (err, result)=>{
            const numberForSearch = pagenation(result.pages)
            numberForSearch[result.page-1].current_page = true;
            const itemNumberinPageForSearch = minAndMax(result.limit, result.page, result.total);
            res.render("search/advance_search_result", {
                data:result.docs,
                itemNumberInPage:itemNumberinPageForSearch,
                currentPage:result.page,
                pageCount:result.pages,
                total:result.total,
                pageForCss:numberForSearch,
            })
            return
        })
    }
})

module.exports = router;