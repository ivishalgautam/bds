"use strict";


import table from "../../db/models.js";

const create = async (req, res) => {
    try {
        await table.ProductModel.create(req);
        return res.send( {
            message: "New product created.",
        });
    } catch (error) {
        console.log(error);
        return res.send(error)
    }
};

const update = async (req, res) => {
    try {
        const record = await table.ProductModel.getById(req);
        if (!record) {
            return res.send(
                "not_found",
                "product not found or product is deleted"
            );
            return;
        }
        return res.send( await table.ProductModel.update(req));
    } catch (error) {
        console.log(error);
        return res.send(error)
    }
};

const deleteById = async (req, res) => {
    try {
        const record = await table.ProductModel.deleteById(req);
        if (record === 0) {
            return res.send(
                "not_found",
                "product not found or product is deleted"
            );
            return;
        }
        return res.send( {
            message: "Product deleted.",
        });
    } catch (error) {
        console.log(error);
        return res.send(error)
    }
};

const get = async (req, res) => {
    try {
        return res.send( await table.ProductModel.get());
    } catch (error) {
        console.log(error);
        return res.send(error)
    }
};

const getById = async (req, res) => {
    try {
        const record = await table.ProductModel.getById(req);
        if (!record) {
            return res.send(
                "not_found",
                "product not found or product is deleted"
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
