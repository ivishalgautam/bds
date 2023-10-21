"use strict";


import table from "../../db/models.js";

const create = async (req, res) => {
    try {
        await table.AnnouncementModel.create(req);
        return res.send( {
            message: "Announcement created",
        });
    } catch (error) {
        console.log(error);
        return res.send(error)
    }
};

const update = async (req, res) => {
    let record;
    try {
        record = await table.AnnouncementModel.getById(req);
        if (!record) {
            return res.send(
                "not_found",
                "Announcement not found. Please enter a valid announcement id"
            );
            return;
        }
        return res.send( await table.AnnouncementModel.update(req));
    } catch (error) {
        console.log(error);
        return res.send(error)
    }
};

// admin
const get = async (req, res) => {
    try {
        return res.send(
            await table.AnnouncementModel.getAll(
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
        const record = await table.AnnouncementModel.getById(req);
        if (!record) {
            return res.send(
                "not_found",
                "Announcement not found. Please enter a valid announcement id"
            );
            return;
        }
        return res.send( record);
    } catch (error) {
        console.log(error);
        return res.send(error)
    }
};

const getByUserId = async (req, res) => {
    try {
        const record = await table.AnnouncementModel.getByUserId(req);
        if (!record) {
            return res.send(
                "not_found",
                "Announcement not found. You don't have any announcement"
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
        const record = await table.AnnouncementModel.deleteById(req);
        if (record === 0) {
            return res.send(
                "not_found",
                "Announcement not found or deleted already"
            );
            return;
        }
        return res.send( {
            message: "Announcement deleted successfully",
        });
    } catch (error) {
        console.log(error);
        return res.send(error)
    }
};

export default {
    create: create,
    update: update,
    getByUserId: getByUserId,
    get: get,
    getById: getById,
    deleteById: deleteById,
};
