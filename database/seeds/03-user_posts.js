exports.seed = function(knex, Promise)
{
    return knex('user_posts')
    .insert(
        [
            {
                user_id: 1,
                post_id: 2,
                vote: 0,
                creator: 1
            },
            {
                user_id: 2,
                post_id: 1,
                vote: 1,
                creator: 1
            },
            {
                user_id: 3,
                post_id: 3,
                vote: 2,
                creator: 1
            },
            {
                user_id: 1,
                post_id: 1,
                vote: 1,
                creator: 0
            },
        ]
    )
}

