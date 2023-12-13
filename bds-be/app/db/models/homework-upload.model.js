"use strict";

import sequelizeFwk from "sequelize";
import constants from "../../lib/constants/index.js";

let HomeworkUploadModel = null;

const init = async (sequelize) => {
  HomeworkUploadModel = sequelize.define(
    constants.models.HOMEWROKK_UPLOAD_TABLE,
    {
      id: {
        allowNull: false,
        type: sequelizeFwk.DataTypes.UUID,
        defaultValue: sequelizeFwk.DataTypes.UUIDV4,
        primaryKey: true,
      },
      student_id: {
        allowNull: false,
        type: sequelizeFwk.DataTypes.UUID,
        onDelete: "CASCADE",
        references: {
          model: constants.models.USER_TABLE,
          key: "id",
          deferrable: sequelizeFwk.Deferrable.INITIALLY_IMMEDIATE,
        },
      },
      teacher_id: {
        allowNull: false,
        type: sequelizeFwk.DataTypes.UUID,
        onDelete: "CASCADE",
        references: {
          model: constants.models.TEACHER_TABLE,
          key: "id",
          deferrable: sequelizeFwk.Deferrable.INITIALLY_IMMEDIATE,
        },
      },
      course_id: {
        allowNull: false,
        type: sequelizeFwk.DataTypes.UUID,
        onDelete: "CASCADE",
        references: {
          model: constants.models.COURSES_TABLE,
          key: "id",
          deferrable: sequelizeFwk.Deferrable.INITIALLY_IMMEDIATE,
        },
      },
      batch_id: {
        allowNull: false,
        type: sequelizeFwk.DataTypes.UUID,
        onDelete: "CASCADE",
        references: {
          model: constants.models.BATCH_TABLE,
          key: "id",
          deferrable: sequelizeFwk.Deferrable.INITIALLY_IMMEDIATE,
        },
      },
      week: {
        allowNull: false,
        type: sequelizeFwk.DataTypes.INTEGER,
      },
      day: {
        allowNull: false,
        type: sequelizeFwk.DataTypes.INTEGER,
      },
    },
    {
      createAt: "created_at",
      updateAt: "updated_at",
    }
  );

  await HomeworkUploadModel.sync({ alter: true });
};

const create = async (req, teacher_id) => {
  return await HomeworkUploadModel.create({
    student_id: req.user_data.id,
    teacher_id: teacher_id,
    course_id: req.body.course_id,
    batch_id: req.body.batch_id,
    week: req.body.week,
    day: req.body.day,
    file: req.body.file,
  });
};

const get = async (req, teacher_id) => {
  let whereQuery = `WHERE uh.student_id = ${req.user_data.id}`;

  if (teacher_id) {
    whereQuery = `WHERE uh.teacher_id = ${teacher_id}`;
  }

  let query = `
    SELECT 
        *
      FROM upload_homeworks uh
      LEFT JOIN users usr on usr.id = uh.student_id 
      LEFT JOIN courses crs on crs.id = uh.course_id 
      LEFT JOIN batches btc on btc.id = uh.batch_id 
      ${whereQuery}
  `;

  return await HomeworkUploadModel.sequelize.query(query, {
    type: sequelizeFwk.QueryTypes.SELECT,
  });
};

export default {
  init,
  create,
  get,
};
