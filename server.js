const express = require('express');
const mongoose = require('mongoose');
const user = require('./backend/user/user.routes');
const profile = require('./backend/profile/profile.routes');
const post = require('./backend/post/post.routes');

const app = express();

const db = require('./config/keys').mongoURI;
mongoose
    .connect(db)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

app.get('/', (req, res) => {
    res.send("hello")
});

app.use('/api/users', user);
app.use('/api/profiles', profile);
app.use('/api/posts', post);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));