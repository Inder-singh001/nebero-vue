const { set } = require("mongoose");

module.exports = (dbConnection, { Schema }) => {
    let { ObjectId } = Schema;

    let UserSchema = new Schema({
        author: {
            type: ObjectId,
        },
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        phone_no: {
            type: Number,
            required: true,
        },
        address: {
            type: String,
            required: false,
        },
        age: {
            type: Number,
            required: true,
        },
        gender: {
            type: String,
            required: true,
        },
        dob: {
            type: Date,
            required: true,
            get: function(value){
                return value ? value.toISOString().split('T')[0] : '';
            },
            set: function(value){
                return value
            }
        },
        created_at: {
            type: Date,
            required: false,
        },
        updated_at: {
            type: Date,
            required: false,
        }
    });
    let user = dbConnection.model("user", UserSchema);
    return user;
};