const db = require('../database/dbConfig');
const Auth = require('../auth/authModel');
const User = require('../users/userModel')
const Airport  =require('../admins/adminModel')
const chai = require('chai');
const expect = chai.expect
beforeEach(async () => {
    await db('users').truncate();
    await db('airports').truncate()
  });
  describe('users.getUser',()=>{
    it('should be able to get db', async () => {
        await Auth.postUser({username:'basil', password:'12345'})
        allUsers = await User.getUsers(1)
        expect(allUsers).to.deep.equal({
            id: 1,
            username: 'basil',
            password: '12345',
            firstname: null,
            lastname: null,
            contact: null,
            image_url: null,
            isAdmin: false
          })
    })
});
describe("users.updateUser" ,()=>{
    it('should get a specific user',async () => {
        await Auth.postUser({username:'basil123',password:'123456'})
        const data = await User.updateUser(1,{firstname:'basil',contact:'12345678'})
        expect(data).to.deep.equal({
            id: 1,
            username: 'basil123',
            password: '123456',
            firstname: 'basil',
            lastname: null,
            contact: "12345678",
            image_url: null,
            isAdmin: false
          })
    })
})
describe("users.getAllAdmin" ,()=>{
    it('should get all admins',async () => {
        await Auth.postUser({username:'basil123',password:'123456'})
        await Auth.postUser({username:'basil121',password:'123456'})
        await User.updateUser(1,{firstname:'basil',contact:'12345678',isAdmin:true})
        await Airport.postAirport({airport_name:"Heting",airport_location:"London"})
        await Airport.postAdminDetials(1,{user_id:"1",airport_id:"1",admin_location:"How can"})
        await User.updateUser(2,{firstname:'basilhe',contact:'12345679',isAdmin:true})
        await Airport.postAdminDetials(2,{user_id:"2",airport_id:"1",admin_location:'How'})
        const data = await User.getAllAdmins('London')
        expect(data.length).to.equal(2)
    })
})
