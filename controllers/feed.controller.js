const { validationResult } = require('express-validator/check');

const Post = require('../models/post');

exports.getPosts = (req, res, next) => {
    Post.find()
        .then(result => {
            res.status(200).json({
                message: 'Fetched posts successfully.',
                posts: result
            })
            .catch((err) => {
                if (!err.statusCode) {
                    err.statusCode = 500;
                }
                next(err);
            });
        });
};

exports.createPost = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error('Validation field, entered data is incorrect.');
        error.statusCode = 422;
        throw error;
    }
    if (!req.file) {
        const error = new Error('No image provide.');
        error.statusCode = 422;
        throw error;
    }
    const imageUrl = req.file.path;
    const title = req.body.title;
    const content = req.body.content;
    const post = new Post({
        title: title,
        content: content,
        imageUrl: imageUrl,
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

exports.getPost = (req, res, next) => {
    const postId = req.params.postId;
    Post.findById(postId)
        .then(result => {
            if (!result) {
                const error = new Error('Could not find post.');
                error.statusCode = 400;
                throw error;
            }
            res.status(200).json({
                message: 'Post fetched.',
                post: result
            });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
}