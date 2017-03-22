let mongoose = require('mongoose');
let Menuitem = require('../models/menuitem');

/*
 * GET /Menuitem route to retrieve all the Menuitems.
 */
function getMenuitems(req, res) {
	//Query the DB and if no errors, send all the Menuitems
	let query = Menuitem.find({});
	query.exec((err, Menuitems) => {
		if(err) res.send(err);
		//If no errors, send them back to the client
		res.json(Menuitems);
	});
}

/*
 * POST /Menuitem to save a new Menuitem.
 */
function postMenuitem(req, res) {
	//Creates a new Menuitem
	var newMenuitem = new Menuitem(req.body);
	//Save it into the DB.
	newMenuitem.save((err,Menuitem) => {
		if(err) {
			res.send(err);
		}
		else { //If no errors, send it back to the client
			res.json({message: "Menuitem successfully added!", Menuitem });
		}
	});
}

/*
 * GET /Menuitem/:id route to retrieve a Menuitem given its id.
 */
function getMenuitem(req, res) {
	Menuitem.findById(req.params.id, (err, Menuitem) => {
		if(err) res.send(err);
		//If no errors, send it back to the client
		res.json(Menuitem);
	});		
}

/*
 * DELETE /Menuitem/:id to delete a Menuitem given its id.
 */
function deleteMenuitem(req, res) {
	Menuitem.remove({_id : req.params.id}, (err, result) => {
		res.json({ message: "Menuitem successfully deleted!", result });
	});
}

/*
 * PUT /Menuitem/:id to updatea a Menuitem given its id
 */
function updateMenuitem(req, res) {
	Menuitem.findById({_id: req.params.id}, (err, Menuitem) => {
		if(err) res.send(err);
		Object.assign(Menuitem, req.body).save((err, Menuitem) => {
			if(err) res.send(err);
			res.json({ message: 'Menuitem updated!', Menuitem });
		});	
	});
}

//export all the functions
module.exports = { getMenuitems, postMenuitem, getMenuitem, deleteMenuitem, updateMenuitem }
