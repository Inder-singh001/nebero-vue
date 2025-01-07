const userModel = require("../models/user");
const { validatorMake } = require('../models/user')
const detail = async (req, res) => {
    let select = [
        "name",
        "email",
        "phone_no",
        "address",
        "age",
        "gender",
        "dob",
        "created_at",
        "updated_at",
    ];
    let where = {}

    let data = await userModel.getListing(req, select, where);

    if (data) {
        let count = await userModel.getCounts(where);
        res.send({
            status: true,
            message: "Data Fetch Successfully",
            total: count,
            data: data,
        });
    } else {
        res.send({
            status: false,
            message: "Something went wrong",
            data: [],
        });
    }
};
const user = async (req, res) => {
    let { id } = req.params;
    let select = [
        "name",
        "email",
        "phone_no",
        "address",
        "age",
        "gender",
        "dob",
        "created_at",
        "updated_at",
    ];
    let data = await userModel.getById(id, select);
    console.log(data)
    if (data) {
        res.send({
            status: true,
            message: "Data Fetch Successfully",
            data: data,
        });
    } else {
        res.send({
            status: false,
            message: "Something went wrong",
            data: [],
        });
    }
};

const add = async (req, res) => {
    let data = req.body;
    let validatorRules = await validatorMake(data, {
        name: "required",
        email: "required",
        phone_no: "required",
        age: "required",
        gender: "required",
        dob: "required",
    });

    if (!validatorRules.fails()) {
        let resp = await userModel.insert(data);
        console.log(resp)
        if (resp) {
            res.send({
                status: true,
                message: "Record Saved Successfully",
                data: resp,
            });
        } else {
            res.send({
                status: false,
                message: "Something went wrong",
                data: [],
            });
        }
    } else {
        res.send({
            status: false,
            message: validatorRules.errors,
        });
    }
};

const update = async (req, res) => {
    let { id } = req.params;
    let data = req.body;
    console.log(data)
    let validatorRules = await validatorMake(data, {
        name: "required",
        email: "required",
        phone_no: "required",
        address: "required",
        age: "required",
        gender: "required",
        dob: "required",
    });

    if (!validatorRules.fails()) {
        let resp = await userModel.update(id, data);
        console.log(resp)
        if (resp) {
            res.send({
                status: true,
                message: "Record Updated Successfully",
                data: resp,
            });
        } else {
            res.send({
                status: true,
                message: "Something went wrong",
                data: [],
            });
        }
    } else {
        res.send({
            status: false,
            message: validatorRules.errors,
        });
    }
};

const deleteUser = async (req, res) => {
    let { id } = req.params;

    let resp = await userModel.remove(id);

    if (resp) {
        res.send({
            status: true,
            message: "Record Deleted Successfully",
            data: resp,
        });
    } else {
        res.send({
            status: true,
            message: "Something went wrong",
            data: [],
        });
    }
};

module.exports = {
    detail,
    add,
    update,
    deleteUser,
    user
}