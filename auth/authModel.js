const db= require('../database/dbConfig')

const postUser = async(data) => {
    return await db('users').insert(data)
}

module.exports = insertUser