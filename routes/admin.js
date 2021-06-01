const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');
const bcryptSalt = 10;
const passport = require('passport');
const ensureLogin = require('connect-ensure-login')



const Biennale = require("../models/Biennale");
const User = require("../models/user");

const editDateMaking = function(dateData){
    let month = "0" + (dateData.getMonth()+1);
    let date = "0" + dateData.getDate();
    return `${dateData.getFullYear()}-${month.slice(-2)}-${date.slice(-2)}`
}

const makingDate = function(scheduleData){
    const dateData = new Date(scheduleData);
    const monthData = dateData.toDateString().substr(4, 3);
    const modifiedData = `${monthData} ${dateData.getDate()}, ${dateData.getFullYear()}`;
    return modifiedData;
}

router.get("/", ensureLogin.ensureLoggedIn(), (req, res, next)=>{
    res.render("admin/admin")
})


router.post("/", ensureLogin.ensureLoggedIn(), (req, res, next)=>{
  const {name, address1, address2, openingday, closingday,rescheduledOpnday,rescheduledClsday, website, country, ticket, image, image_copyright, is_rescheduled, type_of_event, latitude, longitude, seo_text} = req.body;
  let opeingdayForPost = new Date(openingday);
  const monthForOpening = opeingdayForPost.toDateString().substr(4, 3);
  const modified_openingday = `${monthForOpening} ${opeingdayForPost.getDate()}, ${opeingdayForPost.getFullYear()}`
  
  const modified_rescheduled_openingday = makingDate(rescheduledOpnday)
  const modified_rescheduled_closingday = makingDate(rescheduledClsday)


  let closingdayForPost = new Date(closingday);
  const monthforClosing = opeingdayForPost.toDateString().substr(4, 3);
  const modified_closingday = `${monthforClosing} ${closingdayForPost.getDate()}, ${closingdayForPost.getFullYear()}`

  const newBiennale = new Biennale({name, address1, address2, openingday, closingday, rescheduledOpnday,rescheduledClsday, website, country, ticket, image, image_copyright, is_rescheduled, type_of_event, modified_openingday, modified_closingday,latitude, longitude, modified_rescheduled_openingday, modified_rescheduled_closingday, seo_text  })
 
  newBiennale.save()
  .then(()=>{
      res.redirect("/")
  })
  .catch(error=>{
      console.log(error)
  })
})


router.get('/signup', (req, res, next)=>{
    res.render('admin/signup')
});

router.post('/signup', (req, res, next)=>{
    const username = req.body.username;
    const password = req.body.password;

    if(username ===""|| password ===""){
        res.render('admin/signup', {message:'indicate username and password'})
        return;
    }

    User.findOne({username})
    .then(user=>{
        if(user!==null){
            res.render('admin/signup', {message:'The username already exists'})
            return;
        }

        const salt = bcrypt.genSaltSync(bcryptSalt);
        const hashPass = bcrypt.hashSync(password, salt);

        const newUser = new User({
            username,
            password:hashPass
        })

        newUser.save((err)=>{
            if(err){
                res.render('admin/signup', "Something went wrong");
            }else{
                res.redirect('/')
            }
        })
    })
    .catch((error)=>{
        next(error)
    })
})

router.get('/login', (req, res, next)=>{
    res.render('admin/login', {'message':req.flash('error')});
});

router.post('/login', passport.authenticate('local', {
    successRedirect:'/',
    failureRedirect:'/admin/login',
    failureFlash:true,
    passReqToCallback:true
}));


router.get('/logout', (req, res)=>{
    req.logout();
    res.redirect('/admin/login')
})

router.get("/edit/:id", ensureLogin.ensureLoggedIn(), (req, res, next)=>{
    Biennale.findById(req.params.id)
    .then(editDataFromDB=>{
        editDataFromDB.modified_openingday = editDateMaking(editDataFromDB.openingday)
        editDataFromDB.modified_closingday = editDateMaking(editDataFromDB.closingday)
        editDataFromDB.modified_rescheduled_openingday = editDateMaking(editDataFromDB.rescheduledOpnday);
        editDataFromDB.modified_rescheduled_closingday = editDateMaking(editDataFromDB.rescheduledClsday)
        res.render("admin/edit", {data:editDataFromDB})
    })
})

router.post("/edit/:id", ensureLogin.ensureLoggedIn(),(req, res, next)=>{
    const {name, address1, address2, openingday, closingday,rescheduledOpnday,rescheduledClsday, website, country, ticket, image, image_copyright, is_rescheduled,type_of_event, latitude, longitude, seo_text} = req.body;

    const modified_openingday = makingDate(openingday)
    const modified_closingday = makingDate(closingday)
    const modified_rescheduled_openingday = makingDate(rescheduledOpnday)
    const modified_rescheduled_closingday = makingDate(rescheduledClsday)
    Biennale.update({"_id":req.params.id},{
    $set:{name:name, address1:address1, address2:address2, openingday:openingday, closingday:closingday,rescheduledOpnday:rescheduledOpnday,rescheduledClsday:rescheduledClsday, website:website, country:country, ticket:ticket, image:image, image_copyright: image_copyright, is_rescheduled:is_rescheduled, type_of_event:type_of_event,  modified_openingday: modified_openingday, modified_closingday:modified_closingday, latitude:latitude, longitude:longitude, modified_rescheduled_openingday:modified_rescheduled_openingday, modified_rescheduled_closingday:modified_rescheduled_closingday, seo_text:seo_text }
    })
    .then(()=>{
        res.redirect("/schedule")
    })
})

router.get("/delete/:id", ensureLogin.ensureLoggedIn(),(req, res, next)=>{
    console.log('KIYOKIOY')
    Biennale.findByIdAndRemove({"_id":req.params.id})
    .then(()=>{
        res.redirect("/schedule")
    })
    .catch(error=>{
        console.log(error)
    })
})

module.exports = router;