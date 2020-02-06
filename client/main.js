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
 	return imagesdb.find();
 },
});

Template.myGallery.events({
  'click .js-delete'(event, instance)  {
  	varmyID= this._id;
 	$("#"+this._id).fadeOut('slow',function(){
 		imagesdb.remove(myId)});
 	console.log(myId);
 	
 	// console.log("deleting..."+);
 	// console.log(this._id);
  },
});
