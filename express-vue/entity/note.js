module.exports = (dbConnection, { Schema }) => {
    let { ObjectId } = Schema;

    let NoteSchema = new Schema({
        author: {
            type: ObjectId,
        },
        note: {
            type: String,
            required: true,
        }
    })

    let note = dbConnection.model("note", NoteSchema);
    return note;
}  