"use strict";


import table from "../../db/models.js";

const create = async (req, res) => {
    try {
        const record = await table.CourseModel.getById(req);
        if (!record) {
            return res.send(
                "not_found",
                "Course not found. Please a enter a valid course id"
            );
            return;
        }
        await table.HomeWorkModel.create(req);
        return res.send( {
            message: "New homework created.",
        });
    } catch (error) {
        console.log(error);
        return res.send(error)
    }
};

const update = async (req, res) => {
    try {
        const record = await table.HomeWorkModel.getById(req);
        if (!record) {
            return res.send(
                "not_found",
                "Homework not found or homework is deleted"
            );
            return;
        }
        return res.send( await table.HomeWorkModel.update(req));
    } catch (error) {
        console.log(error);
        return res.send(error)
    }
};

const deleteById = async (req, res) => {
    try {
        const record = await table.HomeWorkModel.deleteById(req);
        if (record === 0) {
            return res.send(
                "not_found",
                "Homework already deleted or not exists in our database"
            );
            return;
        }
        return res.send( {
            message: "Homework deleted.",
        });
    } catch (error) {
        console.log(error);
        return res.send(error)
    }
};

const get = async (req, res) => {
    try {
        return res.send( await table.HomeWorkModel.get());
    } catch (error) {
        console.log(error);
        return res.send(error)
    }
};

const getById = async (req, res) => {
    try {
        const record = await table.HomeWorkModel.getById(req);
        if (!record) {
            return res.send( "not_found", "Homework not found");
            return;
        }
        return res.send( record);
    } catch (error) {
        console.log(error);
        return res.send(error)
    }
};

export default {
    create: create,
    update: update,
    deleteById: deleteById,
    get: get,
    getById: getById,
};
