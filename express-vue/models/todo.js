const { todo } = require("../models");

const getListing = async (req, select = {}, where = {}) => {
    try {
        let { sort, direction, limit, offset, page } = req.query;

        direction = direction && direction == 'asc' ? 1 : -1;
        sortField = sort ? sort : 'created_at';
        limit = limit ? parseInt(limit) : '';
        offset = page > 1 ? ((page - 1) * limit) : 0;
        orderBy = { [sortField]: direction }

        let listing = todo.find(where, select, { skip: offset })
            .sort(orderBy)
            .limit(limit)

        return listing;
    } catch (error) {
        console.log(error)
        return false
    }
}
const getCounts = async (where = {}) => {
    try {
        let record = await todo.countDocuments(where);
        return record;
    }
    catch (error) {
        console.log(error)
        return false;
    }
}

const remove = async (id) => {
    try {
        let getRecord = await getById(id); // Retrieving a record by its '_id' using the 'getById' function

        if (getRecord) {
            let record = await todo.deleteOne({ '_id': id }); // Deleting a record from the 'post' collection that matches the specified '_id'

            return record; // Returning the result of the delete operation
        }
        else {
            return false; // Returning false if the record does not exist
        }
    }
    catch (error) {
        console.log(error); // Logging any errors that occur
        return false; // Returning false if an error occurs
    }
}

const getById = async (id, select = []) => {
    try {
        let record = await todo.findById(id, select); // Finding a record in the 'post' collection by its '_id'


        return record; // Returning the 'record' instance
    }
    catch (error) {
        console.log(error); // Logging any errors that occur
        return false; // Returning false if an error occurs
    }
}


module.exports ={
    getListing,
    getCounts,
    getById,
    remove
}