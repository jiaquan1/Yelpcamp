var Campground = require("./models/campground")
	mongoose   = require("mongoose")
	Comment    = require("./models/comment");

var data=[
	{
		name:"Vandusen Garden",
		image:"https://i.ytimg.com/vi/sGl3PwLtBHo/maxresdefault.jpg",
		description:"Fall color in Vancouver #1"
	},
	{
		name:"Fall Foliage in Vancouver",
image:"https://www.tripsavvy.com/thmb/sHtb8LHMz6ApkqmAyfe4oIY0GRc=/2121x1414/filters:fill(auto,1)/GettyImages-157506090-62713930973f496aa410b7833e3e2744.jpg",
		description:"Best place"
	},
	{
		name:"Winnipeg’s Kildonan Park",
		image:"https://traveler.marriott.com/wp-content/uploads/2017/09/GI_647676896_FallLeaves_Water.jpg",
		description:"For vibrant shades, trek along the Red and Assiniboine Rivers to take in fall’s best offerings. And don’t forget the fantastic plantings and towering trees at Assiniboine Park, one of the top urban parks in North America"
	}
]
function seedDB(){
	//Remove All Campgrounds
	Campground.deleteOne({},function(err){
		if(err){
			console.log(err);
		}
		console.log("removed campgrounds!");
		//add a few campgrounds
		data.forEach(function(seed){
			Campground.create(seed,function(err,campground){
				if(err){
					console.log(err);
				}
				else{
					console.log("added a campground");
					Comment.create(
						{
							text:"This is a very nice place, just needs internet",
							author:"user"
						},
						function(err,comment){
							if(err){
								console.log(err);
							}else{
								campground.comments.push(comment);
								campground.save();
								console.log("added new comment");
						}
					});
				}
			});
		});
	});
}

module.exports=seedDB;