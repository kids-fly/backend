const db = require('../database/dbConfig');
const Auth = require('../auth/authModel');
const User = require('./userModel')
beforeEach(async () => {
    await db('users').truncate();
  });
  describe('users.getUser',()=>{
    it('should be able to get db', async () => {
        await Auth.postUser({username:'basil', password:'12345'})
        allUsers = await User.getUsers(1)
        expect(allUsers).toEqual({
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
        expect(data).toEqual({
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
        await User.updateUser(1,{firstname:'basil',contact:'12345678',isAdmin:true ,airport_location:'West Airport', airport_id:'1'})
        await User.updateUser(1,{firstname:'basilhe',contact:'12345678',isAdmin:true, airport_location:'East Airport',airport_id:'1'})
        const data = await User.getAllAdmins
        expect(data).toEqual({
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
