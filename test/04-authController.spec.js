const db = require('../database/dbConfig');
const server = require('../index')
const chai = require('chai');
const chaiHttp =require('chai-http');
let token =''
chai.use(chaiHttp)
const expect = chai.expect

before(async () => {
    await db('users').truncate();
  });
  describe('[Post] /auth/register', () => {
    it('should register if credential are correct', (done) => {
        chai.request(server).post('/auth/register')
        .send({username:'Winked' ,password:'14567c'})
        .then(res =>{
            expect(res.status).to.equal(201)
            done()
        })
    })
    it('fail if username already exists', (done)=> {
        chai.request(server)
        .post('/auth/register')
        .send({username:'Winked', password:'14567c'})
        .expect('Content-Type', /json/)
        .then(res => {
            expect(res.status).to.equal(400)
            expect(res.body).to.be('Username already exists')
            done()
          });
    });
})
describe('[Post] /auth/login', () => {
    it('should fail if username does not exist', (done) => {
        hai.request(server).post('/auth/login')
        .send({username:'Winke' ,password:'14567c'})
        .then(res =>{
            expect(res.status).to.equal(404)
            expect(res.body).to.be('Username Does Not Exist')
            done()
        })
    })
    it('should fail if password is not correct', (done) => {
        chai.request(server).post('/auth/login')
        .send({username:'Winked' ,password:'145678c'})
        .then(res =>{
            expect(res.status).to.equal(400)
            expect(res.body).to.be('Wrong Password')
            done()
        })
    })
    it('should login if details is correct', (done) => {
        return chai.request(server).post('/auth/login')
        .send({username:'Winked' ,password:'14567c'})
        .then(res =>{
            expect(res.status).to.equal(200)
            token =res.body.token
            done()
        })
    })
})

describe('[GET] /user',()=> {
    it('should fail if no token',(done) =>{
        return chai.request(server).get('/user')
        .then(res =>{
            expect(res.status).toEqual(401)
            expect(res.body).toBe("You need to login ")
            done()
        })
    })
    it('should pass if token exists',(done) => {
        return chai.request(server)
        .get('/user')
        .set("Authorization",`${token}`)
        .then(res =>{
            expect(res.status).toEqual(200)
            done()
        })
    })
})

