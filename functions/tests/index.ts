// tslint:disable-next-line: no-implicit-dependencies
import chai from 'chai'
// tslint:disable-next-line: no-implicit-dependencies
import chaiHttp from 'chai-http'
import fs from 'fs'
import path from 'path'

import app from '../src/app'

const should = chai.should()
const { expect } = chai

chai.use(chaiHttp)
const filepath = path.join(__dirname, '../assets/mineta.jpg')
const wrongFileName = `image_${path.basename(filepath)}`
const badToken = 'lkldko3ido3u183787399'
const pathObject = {
	"patch": { "op": "add", "path": "/nick_name", "value": "Hero Killer" }
}
let goodToken = ''

describe('Test Application', async () => {

  describe('login users', () => {

    it('should return "hi" when tne user hits the base url endpoint', (done) => {
      chai
        .request(app)
        .get('/')
        .set('content-type', 'application/json')
        .end((err, res) => {
          res.should.have.status(200)
          res.type.should.eql('application/json')
          res.body.message.should.eql('hi')
          done()
        })
    })

    it('returns an error if Username field is empty', (done) => {
      chai
        .request(app)
        .post('/auth/users')
        .send({'password': 'password'})
        .set('content-type', 'application/json')
        .end((err, res) => {
          res.should.have.status(400)
          res.type.should.eql('application/json')
          res.body.message.should.eql('Username is required')
          res.body.error.should.eql('Bad Request')
          should.exist(res.body.message)
          should.exist(res.body.error)
          done()
        })
    })

    it('throws up an error if password field is missing', (done) => {
      chai
        .request(app)
        .post('/auth/users')
        .send({'username': 'user'})
        .set('content-type', 'application/json')
        .end((err, res) => {
          res.should.have.status(400)
          res.type.should.eql('application/json')
          res.body.message.should.eql('Password is required')
          res.body.error.should.eql('Bad Request')
          should.exist(res.body.message)
          should.exist(res.body.error)
          done()
        })
    })

    it('throws up an error if username is unknown', (done) => {
      chai
        .request(app)
        .post('/auth/users')
        .send({'username': 'unknown', 'password': 'password'})
        .set('content-type', 'application/json')
        .end((err, res) => {
          res.should.have.status(401)
          res.type.should.eql('application/json')
          res.body.message.should.eql(`Unauthorized access to user`)
          res.body.error.should.eql('Unauthorized')
          should.exist(res.body.message)
          should.exist(res.body.error)
          done()
        })
    })

    it('It should return user and token', (done) => {
      chai
        .request(app)
        .post('/auth/users')
        .send({'username': 'ola', 'password': 'password'})
        .set('content-type', 'application/json')
        .end((err, res) => {
          res.should.have.status(200)
          res.type.should.eql('application/json')
          res.body.message.should.eql(`Login successfully`)
          expect(res.body.data).to.be.an('object')
          expect(res.body.message).to.be.an('string')
          expect(res.body.data.username).to.be.an('string')
          expect(res.body.data.token).to.be.an('string')
          should.exist(res.body.message)
          should.exist(res.body.data)
          should.exist(res.body.data.username)
          should.exist(res.body.data.token)
          goodToken = res.body.data.token
          done()
        })
    })

    it('It should return a message and a url link', (done) => {
      chai
        .request(app)
        .post('/uploads')
        .attach('file', fs.readFileSync(filepath), path.basename(filepath))
        .set('content-type', 'application/json')
        .set('Authorization', goodToken)
        .end((err, res) => {
          res.should.have.status(200)
          res.type.should.eql('application/json')
          res.body.message.should.eql('Upload was successful')
          expect(res.body.data).to.be.an('string')
          should.exist(res.body.message)
          should.exist(res.body.data)
          done()
        })
    })

    it('returns url for the downloaded image', (done) => {
      chai
        .request(app)
        .post('/downloads')
        .send({"filename": path.basename(filepath)})
        .set('content-type', 'application/json')
        .set('Authorization', goodToken)
        .end((err, res) => {
          res.should.have.status(200)
          res.type.should.eql('application/json')
          should.exist(res.body.message)
          should.exist(res.body.data)
          expect(res.body.data).to.be.an('string')
          expect(res.body.message).to.be.an('string')
          done()
        })
    })

    it('returns an error when the user try to download a file that do not exist', (done) => {
      chai
        .request(app)
        .post('/downloads')
        .set('Authorization', goodToken)
        .set('content-type', 'application/json')
        .send({"filename": wrongFileName })
        .end((err, res) => {
          res.should.have.status(404)
          res.type.should.eql('application/json')
          should.exist(res.body.error)
          should.exist(res.body.message)
          res.body.error.should.eql('notFound')
          done()
        })
    })

    it('It doesn\'t allow a user upload an image url using a bad token', (done) => {
      chai
        .request(app)
        .post('/uploads')
        .attach('file', fs.readFileSync(filepath), path.basename(filepath))
        .set('content-type', 'application/json')
        .set('Authorization', badToken)
        .end((err, res) => {
          res.should.have.status(401)
          res.type.should.eql('application/json')
          res.body.message.should.eql('You need to be logged in to perform this action')
          res.body.error.should.eql('Couldn\'t perform this operation')
          expect(res.body.error).to.be.an('string')
          expect(res.body.message).to.be.an('string')
          should.exist(res.body.message)
          should.exist(res.body.error)
          done()
        })
    })

    it('It doesn\'t allow a user upload an without signing in', (done) => {
      chai
        .request(app)
        .post('/uploads')
        .attach('file', fs.readFileSync(filepath), path.basename(filepath))
        .set('content-type', 'application/json')
        .end((err, res) => {
          res.should.have.status(401)
          res.type.should.eql('application/json')
          res.body.message.should.eql('You need to be logged in to perform this action')
          res.body.error.should.eql('Unauthorized User')
          expect(res.body.error).to.be.an('string')
          expect(res.body.message).to.be.an('string')
          should.exist(res.body.message)
          should.exist(res.body.error)
          done()
        })
    })

    it('It should return an object containing patched data', (done) => {
      chai
        .request(app)
        .patch('/profiles/add')
        .set('Authorization', goodToken)
        .send(pathObject)
        .set('content-type', 'application/json')
        .end((err, res) => {
          res.should.have.status(200)
          res.type.should.be.eql('application/json')
          res.body.message.should.eql('Patch was successful')
          res.body.data.villian_name.should.eql('stain')
          res.body.data.real_name.should.eql('Chizome Akaguro')
          res.body.data.quirk.should.eql('Blood Cuddle')
          res.body.data.nick_name.should.eql('Hero Killer')
          done()
        })
    })

    it('It returns an error when patch data is not an object', (done) => {
      chai
        .request(app)
        .patch('/profiles/add')
        .set('Authorization', goodToken)
        .send({"patch": "I should be an object"})
        .set('content-type', 'application/json')
        .end((err, res) => {
          res.should.have.status(400)
          res.type.should.be.eql('application/json')
          res.body.message.should.eql('Invalid params')
          done()
        })
    })

    it('It returns an error when the patch data is empty', (done) => {
      chai
        .request(app)
        .patch('/profiles/add')
        .send('')
        .set('Authorization', goodToken)
        .set('content-type', 'application/json')
        .end((err, res) => {
          res.should.have.status(400)
          res.type.should.be.eql('application/json')
          res.body.message.should.eql('Incomplete params')
          done()
        })
    })

  })
});
