const router = require('express').Router()
const Posts = require('./postsModel')

router.get('/', (req, res) => {
    Posts.findAll()
        .then(response =>
        {
            res.status(200).json(response)
        })
        .catch(err =>
        {
            res.status(500).json({ message: 'rawr' })
        })
})


module.exports = router