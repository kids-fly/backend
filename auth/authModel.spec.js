const db = require('../database/dbConfig');
const Users = require('./authModel');
const Auth = require('../users/userModel')

beforeEach(async () => {
    await db('users').truncate();
  });
  describe('users.postUser',()=>{
    it('should add users to db', async () => {
        let allUsers = await Auth.getUsers()
        expect(allUsers).toHaveLength(0)
        await Users.postUser({username:'basil', password:'12345'})
        allUsers = await Auth.getUsers()
        expect(allUsers).toHaveLength(1)
    })
});
describe("users.getUserByUsername" ,()=>{
    it('should get a specific user',async () => {
        await Users.postUser({username:'basil',password:'123456'})
        await Users.postUser({username:'cea',password:'12345678'})
        const data = await Users.getUserByUsername('basil')
        expect(data.username).toBe('basil')
    })
})
