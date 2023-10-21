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
        if (parseInt(record.duration) < req.body.weeks) {
            return res.send(
                "bad_request",
                "weeks not greater than course duration"
            );
            return;
        }

        const project = await table.ProjectModel.checkExist(req);
        if (project) {
            return res.send(
                "already_exists",
                "project already exists for this week you can update or create a new weeks project"
            );
            return;
        }
        await table.ProjectModel.create(req);
        return res.send( {
            message: "New project created.",
        });
    } catch (error) {
        console.log(error);
        return res.send(error)
    }
};

const update = async (req, res) => {
    try {
        const record = await table.ProjectModel.getById(req);
        if (!record) {
            return res.send(
                "not_found",
                "Project not found or project is deleted"
            );
            return;
        }
        if (req.body?.course_id) {
            const course = await table.CourseModel.getById(req);
            if (!course) {
                return res.send(
                    "not_found",
                    "Course not found or course is deleted"
                );
                return;
            }
        }
        return res.send( await table.ProjectModel.update(req));
    } catch (error) {
        console.log(error);
        return res.send(error)
    }
};

const deleteById = async (req, res) => {
    try {
        const record = await table.ProjectModel.deleteById(req);
        if (record === 0) {
            return res.send(
                "not_found",
                "Project already deleted or not exists in our database"
            );
            return;
        }
        return res.send( {
            message: "Project deleted.",
        });
    } catch (error) {
        console.log(error);
        return res.send(error)
    }
};

const get = async (req, res) => {
    try {
        return res.send(
            await table.ProjectModel.get()
        );
    } catch (error) {
        console.log(error);
        return res.send(error)
    }
};

const getById = async (req, res) => {
    try {
        const record = await table.ProjectModel.getById(req);
        if (!record) {
            return res.send( "not_found", "Project not found");
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
