const db = require('../database/dbConfig');
const Users = require('./authModel');
const request = require('supertest')
const server = require('../index')

beforeAll(async () => {
    await db('users').truncate();
  });
  describe('[Post] /auth/register', () => {
    it('should register if credential are correct', () => {
        return request(server).post('/auth/register')
        .send({username:'Winked' ,password:'14567c'})
        .then(res =>{
            expect(res.status).toEqual(201)
        })
    })
    it('fail if username already exists', ()=> {
        return request(server)
        .post('/auth/register')
        .send({username:'Winked', password:'14567c'})
        .expect('Content-Type', /json/)
        .then(res => {
            expect(res.status).toEqual(400)
            expect(res.body).toBe('Username already exists')
          });
    });
})
describe('[Post] /auth/login', () => {
    it('should fail if username does not exist', () => {
        return request(server).post('/auth/login')
        .send({username:'Winke' ,password:'14567c'})
        .then(res =>{
            expect(res.status).toEqual(404)
            console.log(res.body)
            expect(res.body).toBe('Username Does Not Exist')
        })
    })
    it('should fail if password is not correct', () => {
        return request(server).post('/auth/login')
        .send({username:'Winked' ,password:'145678c'})
        .then(res =>{
            expect(res.status).toEqual(400)
            expect(res.body).toBe('Wrong Password')
        })
    })
    it('should login if details is correct', () => {
        return request(server).post('/auth/login')
        .send({username:'Winked' ,password:'14567c'})
        .then(res =>{
            expect(res.status).toEqual(200)
        })
    })
})