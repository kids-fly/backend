const db = require('../database/dbConfig');
const server = require('../index')
const chai = require('chai');
const chaiHttp =require('chai-http');
let token =''
chai.use(chaiHttp)
const expect = chai.expect

before(async function()  {
    try{
    await db('users').truncate();
    }
    catch(err){
        console.log(err.toString())
    }
  });
  describe('[Post] /auth/register', () => {
    it('should register if credential are correct', (done) => {
        chai.request(server).post('/auth/register')
        .send({username:'Winked' ,password:'14567c'})
        .end((err,res) =>{
            expect(res.status).to.equal(201)
            done()
        })
     
    })
    it('fail if username already exists', (done)=> {
        chai.request(server).post('/auth/register')
        .send({username:'Winked' ,password:'14567c'})
        .end((err,res) => {
            console.log(res.body)
            expect(res.status).to.equal(400)
            expect(res.body).to.equal('Username already exists')
            done()
          });
          
    }); 
})
describe('[Post] /auth/login', () => {
    it('should fail if username does not exist', (done) => {
        chai.request(server).post('/auth/login')
        .send({username:'Winke' ,password:'14567c'})
        .end((err,res) =>{
            console.log(res.status)
            expect(res.status).to.equal(404)
            expect(res.body).to.equal('Username Does Not Exist')
            done()
        })
       
    })
    it('should fail if password is not correct', (done) => {
        chai.request(server).post('/auth/login')
        .send({username:'Winked' ,password:'145678c'})
        .end((err,res) =>{
            console.log(res.body)
            expect(res.status).to.equal(400)
            expect(res.body).to.be('Wrong Password')
            done()
        })
     
    })
    it('should login if details is correct', (done) => {
        chai.request(server).post('/auth/login')
        .send({username:'Winked' ,password:'14567c'})
        .end((err,res) =>{
            console.log(res.body)
            expect(res.status).to.equal(200)
            token =res.body.token
            done()
        })
     
    })
})


// describe('[GET] /user',()=> {
//     it('should fail if no token',(done) =>{
//         return chai.request(server).get('/user')
//         .then(res =>{
//             expect(res.status).toEqual(401)
//             expect(res.body).toBe("You need to login ")
//             done()
//         })
       
//     })
//     it('should pass if token exists',(done) => {
//         return chai.request(server)
//         .get('/user')
//         .set("Authorization",`${token}`)
//         .then(res =>{
//             expect(res.status).toEqual(200) 
//             done()
//         })
    
//     })
// })

