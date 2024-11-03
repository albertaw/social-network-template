const express = require('express');
const router = express.Router();
const profile = require('./profile.controller');
const passport = require('passport');

/**
 *  @openapi
 *  /api/profiles:
 *    post:
 *      tags:
 *      - Profile Controller
 *      summary: Creates a profile for the user showcasing public info.
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                username:
 *                  type: string
 *                  description: The user's name associated with their profile.
 *                bio:
 *                  type: string
 *                  description: About the user.
 *                location:
 *                  type: string
 *                  description: The user's city.
 *                skills:
 *                  type: array
 *                  items: 
 *                    type: string
 *                  description: List of technical skills.
 *                website:
 *                  type: string
 *                  description: URL of the user's personal website.
 *                githubUsername:
 *                  type: string
 *                  description: Handle for github account.
 *      responses:
 *        200:
 *          description: Returns the created profile object.
 *        400:
 *          description: Returns an object with a message of the validation errors.
 */
router.post('/api/profiles', passport.authenticate('jwt', { session: false }), profile.createOrUpdate);

/**
 *  @openapi
 *  /api/profiles/{id}:
 *    get:
 *      tags:
 *      - Profile Controller
 *      summary: Gets a profile by Id.
 *      parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Id of the profile.
 *         schema:
 *           type: string
 *      responses:
 *        200:
 *          description: Returns a profile object.
 */
router.get('/api/profiles/:id', profile.getById);

/**
 *  @openapi
 *  /api/profiles/{username}:
 *    get:
 *      tags:
 *      - Profile Controller
 *      summary: Gets a profile by username.
 *      parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         description: Username of the profile.
 *         schema:
 *           type: string
 *      responses:
 *        200:
 *          description: Returns a profile object.
 */
router.get('/api/profiles/username/:username', profile.getByUsername);

/**
 *  @openapi
 *  /api/profiles:
 *    get:
 *      tags:
 *      - Profile Controller
 *      summary: Retrieves all profiles.
 *      responses:
 *        200:
 *          description: Returns an array of profiles.
 *        404:
 *          description: Returns an error object.
 */
router.get('/api/profiles', profile.getAll);

/**
 *  @openapi
 *  /api/profile:
 *    get:
 *      tags:
 *      - Profile Controller
 *      summary: Gets the authenticated user's profile.
 *      responses:
 *        200:
 *          description: Returns the user's profile.
 *        404:
 *          description: Returns an error object.
 */
router.get('/api/profile', passport.authenticate('jwt', { session: false }), profile.getCurrentUserProfile);

/**
 *  @openapi
 *  /api/profile:
 *    delete:
 *      tags:
 *      - Profile Controller
 *      summary: Deletes the authenticated user's profile.
 *      responses:
 *        204:
 *          description: Successful response.
 */
router.delete('/api/profile', passport.authenticate('jwt', { session: false }), profile.deleteCurrentUserProfile);

module.exports = router;