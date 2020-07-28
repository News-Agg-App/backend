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
        .select('u.username', 'u.political_orientation', 'p.url', 'up.creator', 'up.vote')

    const retPosts = {}
    posts.forEach(post =>
    {
        
        if(!retPosts.hasOwnProperty(post.url)) {
            retPosts[post.url] = {
                url: post.url, 
                creator: '',
                left_0: 0, 
                left_1: 0, 
                left_2: 0, 
                center_0: 0, 
                center_1: 0, 
                center_2: 0, 
                right_0: 0, 
                right_1: 0, 
                right_2: 0, 
            }
            retPosts[post.url][`${post.political_orientation}_${post.vote}`]++
            if (post.creator === 1) retPosts[post.url].creator = post.username
        }
        else {
            
            retPosts[post.url][`${post.political_orientation}_${post.vote}`]++
            if (post.creator) retPosts[post.url][creator] = post.username
        }
    })
    const retPostsArr = []
    for (const prop in retPosts) {
        retPostsArr.push(retPosts[prop])
    }

    return retPostsArr
}
