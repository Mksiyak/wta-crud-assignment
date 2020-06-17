const mongoose = require('mongoose');
const loc = "mongodb://localhost:27017/employee";
mongoose.connect(loc, (err) => {
    if (!err)
        console.log('Database connected.');
    else
        console.log('Error in DB connection : ' + JSON.stringify(err, undefined, 2));
});

module.exports = mongoose;