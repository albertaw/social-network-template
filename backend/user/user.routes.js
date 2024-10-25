const express = require('express');
const router = express.Router();
const user = require('./user.controller');
const passport = require('passport');

/**
 *  @openapi
 *  /api/users:
 *    post:
 *      tags:
 *      - User Controller
 *      summary: Creates a user.
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                name:
 *                  type: string
 *                  description: The user's real name.
 *                email:
 *                  type: string
 *                  description: The user's email address for login.
 *                password:
 *                  type: string
 *                  description: The user's password for login.
 *      responses:
 *        200:
 *          description: Returns the created user object.
 *        400:
 *          description: Returns an object with a message of the validation errors.
 */
router.post('/api/users', user.create);
/**
 *  @openapi
 *  /api/users/login:
 *    post:
 *      tags:
 *      - User Controller
 *      summary: Logs in a user.
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                email:
 *                  type: string
 *                  description: The user's email address for login.
 *                password:
 *                  type: string
 *                  description: The user's password for login.
 *      responses:
 *        200:
 *          description: Returns an object with success status and the bearer token.
 *        400:
 *          description: Returns an object with a message of the validation errors.
 */
router.post('/api/users/login', user.login);
/**
 *  @openapi
 *  /api/user:
 *    get:
 *      tags:
 *      - User Controller
 *      summary: Gets the authenticated user's info.
 *      responses:
 *        200:
 *          description: Returns the user's info.
 */
router.get('/api/user', passport.authenticate('jwt', { session: false }), user.getCurrentUser);
/**
 *  @openapi
 *  /api/user:
 *    delete:
 *      tags:
 *      - User Controller
 *      summary: Deletes the authenticated user.
 *      responses:
 *        204:
 *          description: Successful response.
 */
router.delete('/api/user', passport.authenticate('jwt', { session: false }), user.remove);
/**
 *  @openapi
 *  /api/users/{id}/posts:
 *    get:
 *      tags:
 *      - User Controller
 *      summary: Gets a user's posts.
 *      parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Id of the user.
 *         schema:
 *           type: string
 *      responses:
 *        200:
 *          description: Returns a list of posts.
 */
router.get('/api/users/:id/posts', user.getPosts);
/**
 *  @openapi
 *  /api/user/posts:
 *    delete:
 *      tags:
 *      - User Controller
 *      summary: Deletes the authenticated user's posts.
 *      responses:
 *        204:
 *          description: Successful response.
 */
router.delete('/api/user/posts', passport.authenticate('jwt', { session: false }), user.deletePosts);

module.exports = router;