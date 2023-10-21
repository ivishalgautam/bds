"use strict";


import table from "../../db/models.js";

const create = async (req, res) => {
    try {
        await table.TicketModel.create(req);
        return res.send( {
            message: "Your ticket raised. we will connect you soon.",
        });
    } catch (error) {
        console.log(error);
        return res.send(error)
    }
};

// admin
const update = async (req, res) => {
    let record;
    try {
        record = await table.TicketModel.getById(req);
        if (!record) {
            return res.send(
                "not_found",
                "Ticket not found. Please enter a valid ticket id"
            );
            return;
        }
        return res.send( await table.TicketModel.update(req));
    } catch (error) {
        console.log(error);
        return res.send(error)
    }
};

// user
const updateByUser = async (req, res) => {
    let record;
    try {
        record = await table.TicketModel.getById(req);
        if (!record) {
            return res.send(
                "not_found",
                "Ticket not found. Please enter a valid ticket id"
            );
            return;
        }
        return res.send( await table.TicketModel.updateByUser(req));
    } catch (error) {
        console.log(error);
        return res.send(error)
    }
};

const get = async (req, res) => {
    try {
        return res.send(
            await table.TicketModel.getAll(
                req
            )
        );
    } catch (error) {
        console.log(error);
        return res.send(error)
    }
};

const getById = async (req, res) => {
    try {
        const record = await table.TicketModel.getById(req);
        if (!record) {
            return res.send(
                "not_found",
                "Ticket not found. Please enter a valid ticket id"
            );
            return;
        }
        return res.send( record);
    } catch (error) {
        console.log(error);
        return res.send(error)
    }
};

const deleteById = async (req, res) => {
    try {
        const record = await table.TicketModel.deleteById(req);
        if (record === 0) {
            return res.send(
                "not_found",
                "Ticket not found or deleted already"
            );
            return;
        }
        return res.send( {
            message: "Ticket deleted successfully",
        });
    } catch (error) {
        console.log(error);
        return res.send(error)
    }
};

export default {
    create: create,
    update: update,
    get: get,
    getById: getById,
    deleteById: deleteById,
    updateByUser: updateByUser,
};
