const mongoose = require('mongoose');
const opt = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

module.exports.dbConnect = function() {
    mongoose.connect(process.env.DB_URL, opt).then(() => {
        console.log('Connected with Database!!')
    }).catch((err) => {
        console.log('Database connection failed!!', err);
        process.exit(1);
    })
}