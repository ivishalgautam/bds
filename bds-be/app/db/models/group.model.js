"use strict";
import constants from "../../lib/constants/index.js";
import sequelizeFwk from "sequelize";

let GroupModel = null;

const init = async (sequelize) => {
  GroupModel = sequelize.define(
    constants.models.GROUP_TABLE,
    {
      id: {
        allowNull: false,
        primaryKey: true,
        unique: true,
        type: sequelizeFwk.DataTypes.UUID,
        defaultValue: sequelizeFwk.DataTypes.UUIDV4,
      },
      group_name: {
        type: sequelizeFwk.DataTypes.STRING,
        allowNull: false,
      },
      group_admin: {
        type: sequelizeFwk.DataTypes.ARRAY(sequelizeFwk.DataTypes.UUID),
        allowNull: false,
        defaultValue: [],
      },
      group_image: {
        type: sequelizeFwk.DataTypes.STRING,
      },
      group_users: {
        type: sequelizeFwk.DataTypes.JSONB,
        allowNull: false,
        defaultValue: [],
      },
    },
    {
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );

  await GroupModel.sync({ alter: true });
};

const create = async (req, users) => {
  return await GroupModel.create({
    group_name: req.body?.group_name || req.body?.batch_name,
    group_admin: req.body?.group_admin || [req.body.teacher_id],
    // group_users: req.body?.group_users || users,
    group_image: req.body?.group_image,
  });
};

const update = async (req) => {
  return await GroupModel.update(
    {
      group_name: req.body?.group_name,
      group_admin: req.body?.group_admin,
      group_users: req.body?.group_users,
      group_image: req.body?.group_image,
    },
    {
      where: {
        id: req.params.id,
      },
      returning: true,
      plain: true,
    }
  );
};

const getById = async (req, id) => {
  return await GroupModel.findOne({
    where: {
      id: req?.params?.id || id,
    },
  });
};

const deleteById = async (req) => {
  return await GroupModel.destroy({
    where: {
      id: req.params.id,
    },
  });
};

export default {
  init,
  create,
  update,
  getById,
  deleteById,
};
