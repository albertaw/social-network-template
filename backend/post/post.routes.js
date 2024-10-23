const express = require('express');
const passport = require('passport');
const router = express.Router();
const post = require('./post.controller');

/**
 *  @openapi
 *  /api/posts:
 *    get:
 *      tags:
 *      - Post Controller
 *      summary: Retrieves all posts and populate with user info.
 *      responses:
 *        200:
 *          description: Returns an array of posts.
 *        404:
 *          description: Returns an error object.
 */
router.get('/api/posts', post.getAll);
/**
 *  @openapi
 *  /api/posts:
 *    post:
 *      tags:
 *      - Post Controller
 *      summary: Creates a post.
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                user:
 *                  type: string
 *                  description: The authenticated user's id.
 *                text:
 *                  type: string
 *                  description: The post's text.
 *      responses:
 *        200:
 *          description: Returns the created post.
 *        400:
 *          description: Returns an error object with a message.
 */
router.post('/api/posts', passport.authenticate('jwt', { session: false }), post.create)
/**
 *  @openapi
 *  /api/posts/{id}:
 *    get:
 *      tags:
 *      - Post Controller
 *      summary: Retrieves a post by id populated with user info.
 *      parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric id of the post to retrieve.
 *         schema:
 *           type: string
 *      responses:
 *        200:
 *          description: Returns a post.
 *        404:
 *          description: Returns an error object with a message.
 */
router.get('/api/posts/:id', post.getById);
/**
 *  @openapi
 *  /api/posts/{id}:
 *    delete:
 *      tags:
 *      - Post Controller
 *      summary: Removes a post by id.
 *      parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric id of the post to remove.
 *         schema:
 *           type: string
 *      responses:
 *        200:
 *          description: Returns an object indicating success.
 *        404:
 *          description: Returns an error object with a message.
 */
router.delete('/api/posts/:id', passport.authenticate('jwt', { session: false }), post.remove);

module.exports = router;
