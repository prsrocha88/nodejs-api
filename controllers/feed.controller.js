const { validationResult } = require('express-validator/check');

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
        return res.status(422).json({
            message: 'Validation field, entered data is incorrect.',
            errors: errors.array()
        });
    }

    const title = req.body.title;
    const content = req.body.content;

    res.status(201).json({
        message: 'Post created successfully',
        post: {
            _id: new Date().toISOString(),
            title: title,
            content: content,
            creator: {
                name: 'Paulo Rocha'
            },
            createdAt: new Date()
        }
    });
};