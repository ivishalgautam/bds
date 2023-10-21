"use strict";


import table from "../../db/models.js";

const create = async (req, res) => {
    try {
        const user = await table.UserModel.getById(undefined, req.body.user_id);
        if (!user) {
            return res.send(
                "not found",
                "user not exists in our database"
            );
            return;
        }
        const record = await table.AddressModel.getByUserId(req.body.user_id);
        if (record) {
            return res.send(
                "already exists",
                "user address already exists. you can update your address"
            );
            return;
        }
        await table.AddressModel.create(req, req.body.user_id);
        return res.send({
            message: "Address created.",
        });
    } catch (error) {
        console.log(error);
        return res.send(error)
    }
};

const update = async (req, res) => {
    try {
        const record = await table.AddressModel.getByUserId(req.params.userid);
        if (!record) {
            return res.send(
                "not_found",
                "Address not exists in our database"
            );
            return;
        }
        return res.send(await table.AddressModel.update(req));
    } catch (error) {
        console.log(error);
        return res.send(error)
    }
};

// only for admin use
const getByUserId = async (req, res) => {
    try {
        const record = await table.AddressModel.getByUserId(req.params.userid);
        if (!record) {
            return res.send(
                "not_found",
                "Address not exists in our database"
            );
            return;
        }
        return res.send(record);
    } catch (error) {
        console.log(error);
        return res.send(error)
    }
};

const deleteById = async (req, res) => {
    try {
        const record = await table.AddressModel.deleteById(req.params.userid);
        if (record === 0) {
            return res.send(
                "not_found",
                "Address not exists in our database"
            );
            return;
        }
        return res.send({
            message: "Address deleted.",
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
    deleteById: deleteById,
};
