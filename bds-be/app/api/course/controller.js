"use strict";


import table from "../../db/models.js";

const create = async (req, res) => {
    try {
        await table.CourseModel.create(req);
        return res.send( {
            message: "New course created.",
        });
    } catch (error) {
        console.log(error);
        return res.send(error)
    }
};

const update = async (req, res) => {
    try {
        const record = await table.CourseModel.getById(req);
        if (!record) {
            return res.send(
                "not_found",
                "course not exists in our database"
            );
            return;
        }
        return res.send( await table.CourseModel.update(req));
    } catch (error) {
        console.log(error);
        return res.send(error)
    }
};

const deleteById = async (req, res) => {
    try {
        const record = await table.CourseModel.deleteById(req);
        if (record === 0) {
            return res.send(
                "not_found",
                "course not exists in our database"
            );
            return;
        }
        return res.send( {
            message: "Course deleted.",
        });
    } catch (error) {
        console.log(error);
        return res.send(error)
    }
};

const get = async (req, res) => {
    try {
        return res.send( await table.CourseModel.get(req));
    } catch (error) {
        console.log(error);
        return res.send(error)
    }
};

const getById = async (req, res) => {
    try {
        const record = await table.CourseModel.getById(req);
        if (!record) {
            return res.send(
                "not_found",
                "course not exists in our database"
            );
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
