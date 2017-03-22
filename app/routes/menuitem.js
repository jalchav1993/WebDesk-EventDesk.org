let mongoose = require('mongoose');
let menuitem = require('../models/menuitem');

/*
 * GET /Menuitem route to retrieve all the Menuitems.
 */
function getMenuitems(req, res) {
    //Query the DB and if no errors, send all the Menuitems
    let query = menuitem.find({});
    query.exec((err, menuitems) => {
	if(err) res.send(err);
	//If no errors, send them back to the client
	res.json(menuitems);
    });
}

/*
 * POST /Menuitem to save a new Menuitem.
 */
function postMenuitem(req, res) {
    //Creates a new Menuitem
    var newMenuitem = new menuitem(req.body);
    //Save it into the DB.
    newMenuitem.save((err,menuitem) => {
	if(err) {
	    res.send(err);
	}
	else { //If no errors, send it back to the client
	    res.json({message: "menuitem successfully added!", menuitem });
	}
    });
}

/*
 * GET /Menuitem/:id route to retrieve a Menuitem given its id.
 */
function getMenuitem(req, res) {
    menuitem.findById(req.params.id, (err, menuitem) => {
	if(err) res.send(err);
	//If no errors, send it back to the client
	res.json(menuitem);
    });		
}

/*
 * DELETE /Menuitem/:id to delete a Menuitem given its id.
 */
function deleteMenuitem(req, res) {
    menuitem.remove({_id : req.params.id}, (err, result) => {
	res.json({ message: "menuitem successfully deleted!", result });
    });
}

/*
 * PUT /Menuitem/:id to updatea a Menuitem given its id
 */
function updateMenuitem(req, res) {
    menuitem.findById({_id: req.params.id}, (err, menuitem) => {
	if(err) res.send(err);
	Object.assign(menuitem, req.body).save((err, menuitem) => {
	    if(err) res.send(err);
	    res.json({ message: 'menuitem updated!', menuitem });
	});	
    });
}

//export all the functions
module.exports = { getMenuitems, postMenuitem, getMenuitem, deleteMenuitem, updateMenuitem }
