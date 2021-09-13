const UserController = require('./UserController')

test('test', async () =>{
    const user = new UserController
    expect(await user.getUser()).toBe('UserService: Getting a User from Database')
})