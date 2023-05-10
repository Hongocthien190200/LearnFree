const mongoose = require("mongoose");
async function connect() {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/free_courses_hnt");
        console.log("Connected to mongodb Successfully");
    } catch (error) {
        console.log("failed to connect to mongodb");
    }
}
module.exports = { connect };