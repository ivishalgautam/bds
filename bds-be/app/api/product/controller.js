"use strict";

import table from "../../db/models.js";
import sendMail from "../../helpers/mailer.js";

const create = async (req, res) => {
  try {
    await table.ProductModel.create(req);
    return res.send({
      message: "New product created.",
    });
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
};

const update = async (req, res) => {
  try {
    const record = await table.ProductModel.getById(req);
    if (!record) {
      return res.send("not_found", "product not found or product is deleted");
    }
    return res.send(await table.ProductModel.update(req));
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
};

const deleteById = async (req, res) => {
  try {
    const record = await table.ProductModel.deleteById(req);
    if (record === 0) {
      return res.send("not_found", "product not found or product is deleted");
    }
    return res.send({
      message: "Product deleted.",
    });
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
};

const get = async (req, res) => {
  try {
    return res.send(await table.ProductModel.get());
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
};

const getById = async (req, res) => {
  try {
    const record = await table.ProductModel.getById(req);
    if (!record) {
      return res.send("not_found", "product not found or product is deleted");
    }

    return res.send(record);
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
};

const createEnquiry = async (req, res) => {
  console.log("object");
  try {
    const user = await table.UserModel.getById(null, req.user_data.id);
    const product = await table.ProductModel.getById(
      req,
      req.params.product_id
    );

    if (!user) {
      return res.code(404).send({ message: "user not exist!" });
    }

    if (!product) {
      return res.code(404).send({ message: "product not exist!" });
    }

    // return console.log({ user, product });

    const data = await table.ProductEnquiryModel.create(
      req.user_data.id,
      req.params.product_id
    );

    if (data) {
      await sendMail(
        process.env.SMTP_EMAIL,
        "Product enquiry",
        `User ${user.dataValues.first_name} ${user.dataValues.last_name} enquire for product ${product.dataValues.title}`,
        `html>
        <body style="font-family: Arial, sans-serif; background-color: #f2f2f2; text-align: center; padding: 20px;">
          <h1 style="color: #3498db;">Product enquiry</h1>
          <p style="margin-top: 20px;">
          User: <strong>${user.dataValues.first_name} ${user.dataValues.last_name}</strong> 
          with email: ${user.dataValues.email} enquire for 
          product: ${product.dataValues.title}
          </p>
        </body>
      </html>`
      );
    }

    res.send({ message: "Enquiry raised successfully" });
  } catch (error) {
    console.error(error);
    return res.send(error);
  }
};

export default {
  create: create,
  update: update,
  deleteById: deleteById,
  get: get,
  getById: getById,
  createEnquiry: createEnquiry,
};
