var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const hbs = require("hbs");
const mongoose = require('mongoose');
const paginate = require('express-paginate');
const session = require('express-session');
const bcrypt = require('bcrypt');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const flash = require('connect-flash')
// const bodyParser = require('body-parser')



  mongoose.Promise = Promise;
  mongoose.connect('mongodb://localhost/project2')
  .then(()=>{
    console.log("Connected to Mongo!")
  })
  .catch(err=>{
    console.error("Error connecting to mongo", err)
  })
  

  var app = express();
  const indexRouter = require('./routes/index');
  const adminRouter = require("./routes/admin")
  const mapRouter = require("./routes/map")
  const scheduleRouter = require("./routes/schedule")
  const searchRouter = require("./routes/search");
  const apiRouter = require('./routes/api')


  const User = require('./models/user');
  

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({extended:false}))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(paginate.middleware(15, 50));

app.use(session({
  secret:"kiyokiyo",
  resave:true,
  saveUninitialized:true
}))

passport.serializeUser((user, done)=>{
  done(null, user._id)
})

passport.deserializeUser((id, done)=>{
  User.findById(id, (err, user)=>{
    if(err){
      return done(err);
    }
    done(null, user)
  })
})

app.use(flash())
passport.use(new LocalStrategy({
 passReqToCallback:true
},(req, username, password, next)=>{
  User.findOne({username}, (err, user)=>{
    if(err){
      return next(err);
    }
    if(!user){
      return next(null, false, {message:"incorrect username"});
    }
    if(!bcrypt.compareSync(password, user.password)){
      return next(null, false, {message:"incorrect password"});
    }
    return next(null, user)
  })
}))

app.use(passport.initialize());
app.use(passport.session())

app.use('/', indexRouter);
app.use("/admin", adminRouter)
app.use("/map", mapRouter)
app.use("/schedule", scheduleRouter);
app.use("/search", searchRouter);
app.use('/api', apiRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
