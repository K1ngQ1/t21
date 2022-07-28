const request = require('supertest')
const assert = require('assert')
const app = require('../app.js')


describe('GET /api/fav', () => {
    it('should return array', (done) => {
        request(app)
            .get('/api/fav')
            .expect(200)
            .expect('Content-Type', 'application/json; charset=utf-8')
            .end(done)
    })
})


describe('GET /api', function() {
    this.timeout(10000)
    it('should return array within 10s', (done) => {
        
        request(app)
            .get('/api')
            .expect(200)
            .expect('Content-Type', 'application/json; charset=utf-8')
            .end(done)
    })
})
