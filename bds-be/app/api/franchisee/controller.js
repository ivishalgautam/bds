"use strict";


import table from "../../db/models.js";

const create = async (req, res) => {
    let record;
    let franchisee_id;
    try {
        record = await table.UserModel.getById(undefined, req.body.user_id);
        if (!record) {
            return res.send(
                "not_found",
                "user not exists. Please create user"
            );
            return;
        }

        if (req.user_data.role === "master_franchisee") {
            const master = await table.FranchiseeModel.getByUserId(req)
            franchisee_id = master.id
        }

        if (req.body?.franchisee_id) {
            record = await table.FranchiseeModel.getById(
                undefined,
                req.body.franchisee_id
            );
            if (!record) {
                return res.send(
                    "not_found",
                    "Master franchisee not exists. Pleas enter a valid franchisee"
                );
                return;
            }
        }
        await table.FranchiseeModel.create(req, franchisee_id);
        return res.send( {
            message: "New Franchisee created.",
        });
    } catch (error) {
        console.log(error);
        return res.send(error)
    }
};

const update = async (req, res) => {
    let record;
    try {
        record = await table.FranchiseeModel.getById(req);
        if (!record) {
            return res.send(
                "not_found",
                "Franchisee not exists in our database"
            );
            return;
        }

        if (
            req.body?.franchisee_id &&
            !(await table.FranchiseeModel.getById(
                undefined,
                req.body.franchisee_id
            ))
        ) {
            return res.send(
                "not_found",
                "Franchisee not exists in our database"
            );
        }

        if (
            req.body?.user_id &&
            !(await table.UserModel.getById(undefined, req.body.user_id))
        ) {
            return res.send(
                "not_found",
                "User not exists in our database"
            );
            return;
        }

        return res.send( await table.FranchiseeModel.update(req));
    } catch (error) {
        console.log(error);
        return res.send(error)
    }
};

const deleteById = async (req, res) => {
    try {
        const record = await table.FranchiseeModel.getById(req);
        if (!record) {
            return res.send(
                "not_found",
                "Franchisee not exists in our database"
            );
            return;
        }
        const user = await table.UserModel.deleteById(
            undefined,
            record.user_id
        );
        return res.send( {
            message: "Franchisee deleted.",
        });
    } catch (error) {
        console.log(error);
        return res.send(error)
    }
};

const get = async (req, res) => {
    try {
        return res.send( await table.FranchiseeModel.get());
        return;
    } catch (error) {
        console.log(error);
        return res.send(error)
    }
};

const getById = async (req, res) => {
    try {
        const record = await table.FranchiseeModel.getById(req);
        if (!record) {
            return res.send(
                "not_found",
                "Franchisee not exists in our database"
            );
            return;
        }
        return res.send( record);
    } catch (error) {
        console.log(error);
        return res.send(error)
    }
};

const getAllSubFranchisee = async (req, res) => {
    try {
        return res.send( await table.FranchiseeModel.getAllSubFranchisee(req));
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
    getAllSubFranchisee,
};