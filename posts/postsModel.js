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
    let posts = await db('posts as p')
        .join('user_posts as up', 'up.post_id', '=', 'p.id')
        .join('users as u', 'u.id', '=', 'up.user_id')
        .select('u.username', 'p.url', 'up.creator', 'up.vote')

    const retPosts = {}
    posts.forEach(post =>
    {
        console.log(post)
        if(!retPosts.hasOwnProperty(post.url)) {
            retPosts[post.url] = {url: post.url, 0: 0, 1: 0, 2: 0, creator: ''}
            retPosts[post.url][post.vote]++
            console.log('retPosts[post.url][creator], post.username', retPosts[post.url].creator, post.username)
            if (post.creator === 1) retPosts[post.url].creator = post.username
            console.log('retPostsd', retPosts)
        }
        else {
            console.log('a')
            retPosts[post.url][post.vote]++
            if (post.creator) retPosts[post.url][creator] = post.username
            console.log('retPosts', retPosts)
        }
    })
    const retPostsArr = []
    for (const prop in retPosts) {
        retPostsArr.push(retPosts[prop])
    }

    return retPostsArr
    return retPosts
    return posts
}