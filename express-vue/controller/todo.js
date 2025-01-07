const { todo } = require("../models");
const todoModel = require('../models/todo')

const addTask = async (req, res) => {
    let data = req.body;
    if (data) {
        try {
            const newTask = todo(data);
            await newTask.save();
            res.send({
                status: true,
                message: "New Task added",
                data: data,
            });
        }
        catch (e) {
            res.send({
                status: false,
                message: "Task not added",
                data: []
            })
        }
    }
    else {
        res.send({
            status: false,
            message: "Empty Column!"
        })
    }

}
const listTasks = async (req, res) => {
    let select = "task";
    let where = {};
    let data = await todoModel.getListing(req, select, where);
    console.log(data)
    if (data) {
        let count = await todoModel.getCounts(where);
        res.send({
            status: true,
            message: "Data Fetch Successfully",
            total: count,
            data: data
        });
    }
    else {
        res.send({
            status: false,
            message: "Something went wrong",
            data: [],
        });
    }
}

const deleteTask = async (req, res) => {
    let data = req.body;
    if (data) {
        const resp = await todoModel.remove(data);
        if (resp) {
            res.send({
                status: true,
                message: "Task Deleted Successfully",
                data: resp,
            });
        } else {
            res.send({
                status: false,
                message: "Task Not Found",
                data: [],
            });
        }
    }
    else{
        res.send({
            status: false,
            message: "Something went wrong",
            data: [],
        });
    }

}

module.exports = {
    addTask,
    listTasks,
    deleteTask
}