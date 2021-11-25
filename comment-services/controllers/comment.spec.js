const request = require('supertest')
const server = require('../server')

describe("Comment API - POST /orgs/:orgs/comments", () => {
  it('will success create comment with status 201', (done) => {
    request(server)
      .post('/orgs/test/comments')
      .send({ comment: 'First comment' })
      .set('Accept', 'application/json')
      .expect(201, done);
  })

  it('will create comment and get message comment has been created!', (done) => {
    request(server)
      .post('/orgs/test/comments')
      .send({ comment: 'Second comment' })
      .set('Accept', 'application/json')
      .expect(function (res) {
        res.body.msg = "Comment has been created!"
      })
      .expect(201, {
        msg: "Comment has been created!"
      }, done);
  })

  it("error create comment and get message Comment can't null or empty string! with status 400", (done) => {
    request(server)
      .post('/orgs/test/comments')
      .send({ comment: "" })
      .set('Accept', 'application/json')
      .expect(function (res) {
        res.body.msg = "Comment can't null or empty string!"
      })
      .expect(400, {
        msg: "Comment can't null or empty string!"
      }, done);
  })
})

describe("Comment API - GET /orgs/:orgs/comments", () => {
  it('respone with json and status code 200', (done) => {
    request(server)
      .get('/orgs/test/comments')
      .expect('Content-Type', /json/)
      .expect(200, done);
  })

  it('response body contain comment : First comment and status 200', (done) => {
    request(server)
      .get('/orgs/test/comments')
      .expect('Content-Type', /json/)
      .expect((res) => {
        res.body[0] = {
          "comment": "First comment",
          "orgs": "test",
          "deleted": false
        }
      })
      .expect(200, done);
  })

  it('respon body equal to [] with status code 200 when orgs not found', (done) => {
    request(server)
      .get('/orgs/test/comments')
      .expect('Content-Type', /json/)
      .expect(200, done);
  })
})

describe("Comment API - DELETE /orgs/:orgs/comments", () => {
  it("will deleted comment of orgs with status 200 and msg : Comment has been deleted!", (done) => {
    request(server)
      .delete('/orgs/test/comments')
      .expect(function (res) {
        res.body.msg = "Comment has been deleted!"
      })
      .expect(200, {
        msg: "Comment has been deleted!"
      }, done);
  })

  it("will get status 404 comment when comment orgs not found with with msg: Comment for this organization not found!", (done) => {
    request(server)
      .delete('/orgs/test1/comments')
      .expect(function (res) {
        res.body.msg = "Comment for this organization not found!"
      })
      .expect(404, {
        msg: "Comment for this organization not found!"
      }, done);
  })
})