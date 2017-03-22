process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let Menuitem = require('../app/models/menuitem');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();


chai.use(chaiHttp);

//Our parent block
describe('Menuitems', () => {
	beforeEach((done) => { //Before each test we empty the database
		Menuitem.remove({}, (err) => { 
		   done();		   
		});		
	});
 /*
  * Test the /GET route
  */
  describe('/GET menuitem', () => {
	  it('it should GET all the menuitems', (done) => {
			chai.request(server)
		    .get('/api/guicomponents/menu/menuitem')
		    .end((err, res) => {
			  	res.should.have.status(200);
			  	res.body.should.be.a('array');
			  	res.body.length.should.be.eql(0);
		      done();
		    });
	  });
  });
 /*
  * Test the /POST route
  */
  describe('/POST menuitem', () => {
	  it('it should not POST a menuitem without pages field', (done) => {
	  	let menuitem = {
	  		title: "The Lord of the Rings",
	  		author: "J.R.R. Tolkien",
	  		year: 1954
	  	}
			chai.request(server)
		    .post('/api/guicomponents/menu/menuitem')
		    .send(menuitem)
		    .end((err, res) => {
			  	res.should.have.status(200);
			  	res.body.should.be.a('object');
			  	res.body.should.have.property('errors');
			  	res.body.errors.should.have.property('pages');
			  	res.body.errors.pages.should.have.property('kind').eql('required');
		      done();
		    });
	  });
	  it('it should POST a menuitem ', (done) => {
	  	let menuitem = {
	  		title: "The Lord of the Rings",
	  		author: "J.R.R. Tolkien",
	  		year: 1954,
	  		pages: 1170
	  	}
			chai.request(server)
		    .post('/api/guicomponents/menu/menuitem')
		    .send(menuitem)
		    .end((err, res) => {
			  	res.should.have.status(200);
			  	res.body.should.be.a('object');
			  	res.body.should.have.property('message').eql('Menuitem successfully added!');
			  	res.body.menuitem.should.have.property('title');
			  	res.body.menuitem.should.have.property('author');
			  	res.body.menuitem.should.have.property('pages');
			  	res.body.menuitem.should.have.property('year');
		      done();
		    });
	  });
  });
 /*
  * Test the /GET/:id route
  */
  describe('/GET/:id menuitem', () => {
	  it('it should GET a menuitem by the given id', (done) => {
	  	let menuitem = new Menuitem({ title: "The Lord of the Rings", author: "J.R.R. Tolkien", year: 1954, pages: 1170 });
	  	menuitem.save((err, menuitem) => {
	  		chai.request(server)
		    .get('/api/guicomponents/menu/menuitem/' + menuitem.id)
		    .send(menuitem)
		    .end((err, res) => {
			  	res.should.have.status(200);
			  	res.body.should.be.a('object');
			  	res.body.should.have.property('title');
			  	res.body.should.have.property('author');
			  	res.body.should.have.property('pages');
			  	res.body.should.have.property('year');
			  	res.body.should.have.property('_id').eql(menuitem.id);
		      done();
		    });
	  	});
			
	  });
  });
 /*
  * Test the /PUT/:id route
  */
  describe('/PUT/:id menuitem', () => {
	  it('it should UPDATE a menuitem given the id', (done) => {
	  	let menuitem = new Menuitem({title: "The Chronicles of Narnia", author: "C.S. Lewis", year: 1948, pages: 778})
	  	menuitem.save((err, menuitem) => {
				chai.request(server)
			    .put('/api/guicomponents/menu/enuitem/' + menuitem.id)
			    .send({title: "The Chronicles of Narnia", author: "C.S. Lewis", year: 1950, pages: 778})
			    .end((err, res) => {
				  	res.should.have.status(200);
				  	res.body.should.be.a('object');
				  	res.body.should.have.property('message').eql('Menuitem updated!');
				  	res.body.menuitem.should.have.property('year').eql(1950);
			      done();
			    });
		  });
	  });
  });
 /*
  * Test the /DELETE/:id route
  */
  describe('/DELETE/:id menuitem', () => {
	  it('it should DELETE a menuitem given the id', (done) => {
	  	let menuitem = new Menuitem({title: "The Chronicles of Narnia", author: "C.S. Lewis", year: 1948, pages: 778})
	  	menuitem.save((err, menuitem) => {
				chai.request(server)
			    .delete('/api/guicomponents/menu/menuitem/' + menuitem.id)
			    .end((err, res) => {
				  	res.should.have.status(200);
				  	res.body.should.be.a('object');
				  	res.body.should.have.property('message').eql('Menuitem successfully deleted!');
				  	res.body.result.should.have.property('ok').eql(1);
				  	res.body.result.should.have.property('n').eql(1);
			      done();
			    });
		  });
	  });
  });
});
