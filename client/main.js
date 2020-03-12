import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import 'meteor/jkuester:blaze-bs4'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css' // this is the default BS theme as example
import popper from 'popper.js'
global.Popper = popper // fixes some issues with Popper and Meteor
import './main.html';
import '../lib/collection.js';

//Template.hello.onCreated(function helloOnCreated() {
	// counter starts at 0
	//this.counter = new ReactiveVar(0);
//});
 // increment the counter when button is clicked
	 // instance.counter.set(instance.counter.get() + 1
	// );
Template.myGallery.helpers({
 allImages(){
 	var prevtime= newDate().getTime()- 15000;
 	var results = imagesdb.find({createdOn: {$gte:prevtime}}).count();
 	if (results>0){
 		
 		return imagesdb.find({},{sort:{createdOn:-1,rating:-1}});
 		//sort accroding to time then rating
 	}
 	else
		return imagesdb.find({},{sort:{rating:-1,createdOn:-1}});
 
 		//sort accroding to rating 
 },
});



    

Template.myGallery.events({
	'click .js-delete'(event, instance)  {
		var myID= this._id;
	$("#"+this._id).fadeOut('slow',function(){
		imagesdb.remove({_id:myID});
		console.log(myID);
		});
	},

	'click .js-edit'(event, instance){
		var myID= this._id;
		$("#editmodal").modal("show");
		// console.log("lets edit"this._id);
		var eTitle = imagesdb.findOne({_id:myID}).title;
		var ePath = imagesdb.findOne({_id:myID}).path;
		var eDesc = imagesdb.findOne({_id:myID}).desc;
		$("#editId").val(myID);
		$("#editTitle").val(eTitle);
		$("#editPath").val(ePath);
		$("#editDesc").val(eDesc);
		$(".editplaceholder").attr("src",ePath);
		
	},

	'click .rating'(event) {
		var UpdatedID = this.picid;

        const value = $(event.target).val();
        console.log(UpdatedID+" : "+value);
        imagesdb.update({_id: UpdatedID}, 
				{$set: {
				"rating":value,
				
				}}
			);

        
    }
});	


Template.addImage.events({
	'click .js-Show'(event, instance){
		console.log("Added Image");
	},
	'click .js-close'(event, instance){
		console.log("closing ");
	},
	'click .js-saveImage'(event, instance){
		// saving the path,title and description	
		var theTitle= $("#Title").val();
		var thePath= $ ("#Path").val();
		var theDesc= $ ("#Desc").val();

		// console.log("saving Image with title: "+theTitle+"and its path is: "+thePath+"and its description "+theDesc);
		imagesdb.insert({
   		"path": thePath,
   		"title": theTitle,
   		"desc": theDesc,	
   		"createdOn": new Date().getTime()
   	  });
		// saving and closing modal
		console.log("saving...");
		  $('#imgModal').modal('hide');
		  var theTitle= $("#Title").val("");
		  var thePath= $ ("#Path").val("");
		  var theDesc= $ ("#Desc").val("");
	},
	'input #Path'(event,instance){
		$(".placeholder").attr("src", $("#Path").val());
		// console.log("pop "+$("#Path").val());
	
	}
	


});

Template.edit.events({
		
		'click .js-UpdateImage'(event, instance){
			var Newtitle= $("#editTitle").val();
			var NewPath= $("#editPath").val();
			var NewDesc= $("#editDesc").val();
			var UpdatedID= $("#editId").val();
			console.log("updating "+UpdatedID+"title "+Newtitle+"path "+NewPath+"Descrtion"+NewDesc);
			imagesdb.update({_id: UpdatedID}, 
				{$set: {
				"title":Newtitle,
				"path":NewPath,
				"desc":NewDesc
				}}
			);
			
		}
		
   		
   		
	
});