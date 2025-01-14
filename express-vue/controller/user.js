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
        "token",
        "password",
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
    let loginUser = await userModel.getLoginUser(req)
    let id = loginUser ? loginUser._id : null;
    let select = [
        "name",
        "email",
        "phone_no",
        "address",
        "age",
        "gender",
        "dob",
        "token",
        "password",
        "created_at",
        "updated_at",
    ];
    let data = await userModel.getById(id, select);
    console.log(data)
    try {
        if (data) {
            res.send({
                status: true,
                message: "Data Fetch Successfully",
                data: data,
            });
        } else {
            res.send({
                status: false,
                message: "User Not found!",
                data: [],
            });
        }
    } catch (e) {
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
        email: "required|email",
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
        console.log(validatorRules.errors.errors)
        res.send({
            status: false,
            message: validatorRules.errors,
        });
    }
};

const update = async (req, res) => {
    let loginUser = await userModel.getLoginUser(req)
    let id = loginUser ? loginUser._id : null;
    let data = req.body;
    console.log(data)
    let validatorRules = await validatorMake(data, {
        name: "required",
        email: "required|email",
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

const deleteUser = async (req, res) => {
    let loginUser = await userModel.getLoginUser(req)
    let id = loginUser ? loginUser._id : null;

    let resp = await userModel.remove(id);

    try {
        if (resp) {
            res.send({
                status: true,
                message: "Record Deleted Successfully",
                data: resp,
            });
        } else {
            res.send({
                status: false,
                message: "User Not Found",
                data: [],
            });
        }
    } catch (e) {
        res.status(500).send({
            status: false,
            message: "Something went wrong", e,
            data: [],
        });

    }
};

const signup = async (req, res) => {
    let data = req.body;
    let validatorRules = await validatorMake(data, {
        name: "required",
        email: "required|exist",
        phone_no: "required",
        age: "required",
        gender: "required",
        dob: "required",
        password: "required|confirmed",
        password_confirmation: "required",
    });

    let passes = async () => {
        data.token = userModel.getHash(64);
        let resp = await userModel.insert(data);
        if (resp) {
            res.send({
                status: true,
                message: "Registration Successful",
                data: resp,
            });
        } else {
            res.send({
                status: false,
                message: "Registration Failed, Try again",
                data: [],
            });
        }
    };

    let fails = () => {
        res.send({
            status: false,
            message: validatorRules.errors,
        });
    };

    validatorRules.checkAsync(passes, fails);
};

const login = async (req, res) => {
    let data = req.body;
    console.log(data)
    let validatorRules = await validatorMake(data, {
        email: "required",
        password: "required",
    });
console.log(!validatorRules.fails())
    if (!validatorRules.fails()) {

        let resp = await userModel.getRow({
            email: data.email,
        });

        if (resp) {
            if (resp.password == userModel.encrypt(data.password)) {
                let update = {
                    token: userModel.getHash(64),
                };
                let userUpdate = await userModel.update(resp._id, update);
                if (userUpdate) {
                    res.send({
                        status: true,
                        message: "Login Successfully!",
                        data: userUpdate,
                    });
                } else {
                    res.send({
                        status: false,
                        message: "Login Failed, Try Again!",
                        data: [],
                    });
                }
            } else {
                res.send({
                    status: false,
                    message: "Wrong Password!",
                    data: [],
                });
            }


        }
        else {
            res.send({
                status: true,
                message: "user not found",
                data: [],
            });
        }
    }
    else {
        res.send({
            status: false,
            message: validatorRules.errors,
        });
    }
};

const logout = async (req, res) => {
    let logOutUser = await userModel.getLoginUser(req);
    let userid = logOutUser ? logOutUser._id : null;
    if (userid) {
        let resp = await userModel.getRow({
            _id: userid,
        });
        if (resp) {
            let update = {
                token: null,
            };
            let userUpdate = await userModel.update(resp._id, update);
            if (userUpdate) {
                res.send({
                    status: true,
                    message: "Logout Successfully!",
                    data: userUpdate,
                });
            } else {
                res.send({
                    status: false,
                    message: "Logout Failed, Try Again!",
                    data: [],
                });
            }
        }
        else {
            res.send({
                status: false,
                message: "user not found",
                data: [],
            });
        }
    }
    else {
        res.send({
            status: false,
            message: "Error occurred at your end!",
        });
    }
};

module.exports = {
    detail,
    add,
    update,
    deleteUser,
    user,
    signup,
    login,
    logout
}