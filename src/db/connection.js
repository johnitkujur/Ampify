const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/AmpifyData", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(() => {
    console.log("connection Successful");
}).catch((err) => {
    console.log(err);
});

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    favourites: {
        type: Array,
        required: true
    }
})

const UserData = new mongoose.model("UserData", userSchema);

module.exports = UserData;




