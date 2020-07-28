exports.seed = function(knex, Promise)
{
    return knex('posts')
    .insert(
        [
            {
                user_id: 0,
                post_id: 1,
                vote: 0,
                creator: true
            },
            {
                user_id: 1,
                post_id: 0,
                vote: 1,
                creator: true
            },
            {
                user_id: 2,
                post_id: 2,
                vote: 2,
                creator: true
            },
            {
                user_id: 1,
                post_id: 2,
                vote: 1,
                creator: false
            },
        ]
    )
}

