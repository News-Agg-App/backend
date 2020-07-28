const db = require('../database/dbConfig')

module.exports = {
    findById,
    add,
    findAll,
    // update,
    // delete
}

async function findById(id) {
    let post = await db('posts').where({id}).first()

    if (!post) return { message: `No post found with that id`, code: 404 }
    return { post, code: 200 }
}

async function add(post, user_id) {
    let post_id = await db('posts').insert({ url: post.url }, 'id')
    if (!post_id) return { message: 'Error, could not add post', code: 500 }
    post_id = await db('user_posts').insert({ post_id, user_id, vote: post.vote }, 'post_id')
    if (!post_id) return { message: `Error, could not add post to user_posts`, code: 500 }
    return { message: 'Post added', code: 201 }
}

async function findAll() {
    let posts = await db('posts')
    return posts
}