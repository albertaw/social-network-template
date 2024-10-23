const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const logger = require ('morgan');
const path = require('path');
const passport = require('passport');
const swaggerUi = require('swagger-ui-express');
const swagger = require('./swagger');
const user = require('./backend/user/user.routes');
const profile = require('./backend/profile/profile.routes');
const post = require('./backend/post/post.routes');
const { createServer } = require('node:http');

const app = express();

const db = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/devsocial';
mongoose
    .connect(db)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

app.use(express.static(path.join(__dirname, './client/build')));
app.use(passport.initialize());
require('./config/passport')(passport);
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(logger('dev'));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(user);
app.use(profile);
app.use(post);
app.use(swagger);

app.get('*', (req, res) => {                       
    res.sendFile(path.resolve(__dirname, './client/build', 'index.html'));                               
});

const port = process.env.PORT || 5000;
const server = createServer(app);
const boot = () => {
	server.listen(port, () => console.log(`Server running on port ${port}`));
}
const shutdown = () => {
	server.close();
	mongoose.connection.close();
	console.log('server closed');
}

if (require.main === module) {  //if this file is being run directly
	boot();
} else {
	console.info('Running app as a module');
	exports.boot = boot;
	exports.shutdown = shutdown;
	exports.port = port;
}

