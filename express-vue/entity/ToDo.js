module.exports = (dbConnection, { Schema }) => {
    let { ObjectId } = Schema;

    let ToDoSchema = new Schema({
        author: {
            type: ObjectId,
        },
        task: {
            type: String,
            required: true,
        }
    })

    let todo = dbConnection.model("todo", ToDoSchema);
    return todo;
}  