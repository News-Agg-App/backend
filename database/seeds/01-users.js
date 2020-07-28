const bcrypt = require('bcryptjs')
const hashCount = require('../../utils/hashCount')

exports.seed = function(knex, Promise)
{
    return knex('users')
    .insert(
        [
            {
                email: "bob@bobmail.com",
                username: "Bob Loblaw",
                political_orientation: "Left",
                password: bcrypt.hashSync("password", hashCount)
            },
            {
                email: "amy@bobmail.com",
                username: "Amylee",
                political_orientation: "Right",
                password: bcrypt.hashSync("password", hashCount)
            },
            {
                email: "jim@bobmail.com",
                username: "Jimbob",
                political_orientation: "Center",
                password: bcrypt.hashSync("password", hashCount)
            }
        ]
    )
}

