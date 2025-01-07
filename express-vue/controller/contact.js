const { contact } = require("../models");
const contactModel = require("../models/contact")

const sendMessage = async (req, res) => {
    let data = req.body;
    if (data) {
        console.log(data)
        try {
            const newMessage = contact(data);
            await newMessage.save();
            res.send({
                status: true,
                message: "New Message Sent",
                data: data,
            });
        }
        catch (e) {
            res.send({
                status: false,
                message: "Message not Sent",
                data: []
            })
        }
    }
    else {
        res.send({
            status: false,
            message: "Entry your Feedback!"
        })
    }

}

const listFeedbacks = async (req, res) => {
    let select = [
        "name",
        "email",
        "message",
    ];
    let where = {};
    let data = await contactModel.getListing(req, select, where);
    console.log(data)
    if (data) {
        let count = await contactModel.getCounts(where);
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


module.exports = {
    sendMessage,
    listFeedbacks,
    // deleteNote
}