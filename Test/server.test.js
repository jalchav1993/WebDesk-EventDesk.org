var request = require('supertest');
require = require('really-need');
describe('loading express', function () {
  var server;
  beforeEach(function () {
    server = require('WebDesk.EventDesk.org', { bustCache: true });
  });
  afterEach(function (done) {
    server.close(done);
  });
  it('responds to /api/gui/menu', function testSlash(done) {
    request(server)
      .get('/api/gui/menu')
      .expect(200, done);
  });
  it('404 everything else', function testPath(done) {
    console.log('test 404')
    request(server)
      .get('/')
      .expect(404, done);
  });
});