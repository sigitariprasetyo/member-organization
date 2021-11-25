const request = require('supertest')
const server = require('../server')

describe("Members API - GET /orgs/:orgs/members", () => {
  it('respone with json and status code 200', (done) => {
    request(server)
      .get('/orgs/xendit/members')
      .expect('Content-Type', /json/)
      .expect(200, done);
  })

  it('get members with xendit organization', (done) => {
    request(server)
      .get('/orgs/xendit/members')
      .expect('Content-Type', /json/)
      .expect((res) => {
        res.body[0] = {
          "orgs": "xendit"
        }
      })
      .expect(200, done);
  })

  it('status 404 and mesage Not Found when orgs not found', (done) => {
    request(server)
      .get('/orgs/23456/members')
      .expect('Content-Type', /json/)
      .expect(404, {
        message: "Not Found"
      }, done);
  })
})