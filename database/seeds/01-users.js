const bcrypt = require('bcryptjs')
const hashCount = require('../../utils/hashCount')

exports.seed = function(knex, Promise)
{
    return knex('users')
    .insert(
        [
            {
                email: "bob@bobmail.com",
                first_name: "Bob",
                last_name: "Loblaw",
                password: bcrypt.hashSync("password", hashCount)
            },
            {
                email: "amy@bobmail.com",
                first_name: "Amy",
                last_name: "Lee",
                password: bcrypt.hashSync("password", hashCount)
            }
        ]
    )
}

