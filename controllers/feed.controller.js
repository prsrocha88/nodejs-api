const { validationResult } = require('express-validator/check');

const Post = require('../models/post');

exports.getPosts = (req, res, next) => {
    res.status(200).json({
        posts: [{
            title: 'Primeiro Post', 
            content: 'Conteudo do primeiro post.',
            imageUrl: 'images/duck.jpg',
            creator: {
                name: 'Paulo Rocha'
            },
            createdAt: new Date()
        }]
    });
};

exports.createPost = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error('Validation field, entered data is incorrect.');
        error.statusCode = 422;
        throw error;
    }

    const title = req.body.title;
    const content = req.body.content;
    const post = new Post({
        title: title,
        content: content,
        imageUrl: 'images/duck.jpg',
        creator: {
            name: 'Paulo Rocha'
        }
    });

    post.save().then((result) => {
        res.status(201).json({
            message: 'Post created successfully',
            post: result
        });
    }).catch((err) => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    });

    
};