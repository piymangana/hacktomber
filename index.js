const restify = require('restify');
const mongoose = require('mongoose');
const config = require('./config.js');

const server = restify.createServer();

// Middleware

server.use(restify.plugins.bodyParser());

server.listen(config.PORT, () => {
    mongoose.connect(
        config.MONGODB_URI,
        { userNerUrlPraser: true }
    );
});

const db = mongoose.connection;

db.on('error', (err) => console.log(err));

db.once('open', () => {
    require('./routes/customers')(server);
    console.log(`Server started on port ${config.PORT}`);
})