const { user } = require("../models/index");
const Validator = require('validatorjs');

const getListing = async (req, select = {}, where = {}) => {
    try {
        let { sort, direction, limit, offset, page } = req.query;

        direction = direction && direction == 'asc' ? 1 : -1;
        sortField = sort ? sort : 'created_at';
        limit = limit ? parseInt(limit) : '';
        offset = page > 1 ? ((page - 1) * limit) : 0;
        orderBy = { [sortField]: direction }

        let listing = user.find(where, select, { skip: offset })
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
        let record = await user.countDocuments(where);
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
            let record = await user.deleteOne({ '_id': id }); // Deleting a record from the 'post' collection that matches the specified '_id'

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
        let record = await user.findById(id, select); // Finding a record in the 'post' collection by its '_id'


        return record; // Returning the 'record' instance
    }
    catch (error) {
        console.log(error); // Logging any errors that occur
        return false; // Returning false if an error occurs
    }
}

const validatorMake = async (data, rules, message) => {
    let validation = new Validator(data, rules, message);

    Validator.registerAsync('exist', async function (value, attr, req, passes) {

        let check = await getRow(
            {
                email: value
            },
        )
        if (check) {
            passes(false, " email exists");
        }
        else {
            passes();
        }
    })

    return validation;
}

const insert = async (data) => {
    try {
        let row = new user();
        row.created_at = new Date();

        foreach(data, (key, value) => {
            row[key] = value
        })
        let resp = await row.save();

        if (resp) {
            if (resp.name) {
                resp.slug = resp.name.toLowerCase().replaceAll(/\s/g, '-') + resp._id;
                resp.save()
            }
            return resp;
        }
        else {
            return false;
        }
    }
    catch (error) {
        console.log(error)
        return false;
    }
}
const update = async (id, data) => {
    try {
        data.updated_at = new Date();
        let resp = await user.updateOne({ "_id": id }, data);
        if (resp) {
            let updated = await getById(id);
            return updated;
        }
        else {
            return null;
        }
    }
    catch (error) {
        console.log(error)
        return false;
    }
}
const foreach = (obj, callback) => {
    for (let [key, value] of Object.entries(obj)) {
        callback(key, value);
    }
    return true;
}
const getRow = async (where, select = []) => {
    try
    {
        let record = await user.findOne(where, select);
        return record;
    }
    catch(error)
    {
        console.log(error)
        return false;
    }
}

module.exports = {
    getListing,
    getCounts,
    getById,
    remove,
    validatorMake,
    insert,
    update,
    foreach,
    getRow
}