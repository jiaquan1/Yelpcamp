var express     			=	require("express"),
 	app         			=	 express(),
 	bodyParser  			=	require("body-parser"),
 	mongoose    			=	require("mongoose"),
 	flash					=	require("connect-flash"),
 	passport 				=   require("passport"),
 	LocalStrategy			=   require("passport-local"),
 	methodOverride			=	require("method-override"),
 	Campground  			=	require("./models/campground"),
 	Comment 				=	require("./models/comment"),
 	User 					=   require("./models/user"),
 	seedDB					=	require("./seeds");

//requiring routes
var commentRoutes			=	require("./routes/comments"),
	campgroundRoutes		=	require("./routes/campgrounds"),
	indexRoutes				=	require("./routes/index");

var url =process.env.DATABASEURL ||"mongodb+srv://user:newpassword@cluster0-9dofs.mongodb.net/test?retryWrites=true&w=majority";  //"mongodb://localhost:27017/yelp_camp";
//mongoose.connect(url,{useUnifiedTopology: true, useNewUrlParser: true,});
mongoose.connect(url,{useUnifiedTopology: true, 
					  useNewUrlParser: true,
					});
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));

seedDB(); //seed the database

//PASSPORT COONFIGURATION
app.use(require("express-session")({
	secret:"no dogs",
	resave:false,
	saveUninitialized:false
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){
	res.locals.currentUser=req.user;
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	next();
});

app.use(indexRoutes);
app.use("/campgrounds",campgroundRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);

// process.env.PORT,process.env.IP
app.listen(process.env.PORT || 3000,process.env.IP,function(){
	console.log("YelpCamp server has started!!")

	
});