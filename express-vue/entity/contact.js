module.exports = (dbConnection, { Schema }) => {
    let { ObjectId } = Schema;

    let ContactSchema = new Schema({
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
        message: {
            type: String,
            required: true,
        }
    })

    let contact = dbConnection.model("contact", ContactSchema);
    return contact;
}  