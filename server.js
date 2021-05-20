const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const user = require('./backend/user/user.routes');
const profile = require('./backend/profile/profile.routes');
const post = require('./backend/post/post.routes');

const app = express();

const db = require('./config/keys').mongoURI;
mongoose
    .connect(db)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

app.use(passport.initialize());
require('./config/passport')(passport);
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use('/api/users', user);
app.use('/api/profiles', profile);
app.use('/api/posts', post);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));