const db= require('../database/dbConfig')

const insertUser = async(data) => {
    return await db('users').insert(data)
}

module.exports = insertUser