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
        await Users.postUser({username:'basil',password:'123456'})
        await Users.upday({username:'cea',password:'12345678'})
        const data = await Users.getUserByUsername('basil')
        expect(data.username).toBe('basil')
    })
})
