const express = require('express');
const { body } = require('express-validator/check');

const feedController = require('../controllers/feed.controller');

const router = express.Router();

router.get('/posts', feedController.getPosts);

router.post(
    '/posts', 
    [
        body('title')
            .trim()
            .isLength({ min: 5 }),
        body('content')
            .trim()
            .isLength({ min: 5 })
    ], 
    feedController.createPost
);

router.get('/posts/:postId', feedController.getPost);

module.exports = router;