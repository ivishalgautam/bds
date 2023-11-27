"use strict";

import constants from "../../lib/constants/index.js";
import sequelizeFwk from "sequelize";

let GroupInvtModel = null;

const init = async (sequelize) => {
  GroupInvtModel = sequelize.define(
    constants.models.GROUP_INVITATION_TABLE,
    {
      id: {
        allowNull: false,
        primaryKey: true,
        unique: true,
        type: sequelizeFwk.DataTypes.UUID,
        default: sequelizeFwk.DataTypes.UUIDV4,
      },
      group_id: {
        allowNull: false,
        type: sequelizeFwk.DataTypes.UUID,
      },
      student_id: {
        allowNull: false,
        type: sequelizeFwk.DataTypes.UUID,
      },
      is_approved: {
        type: sequelizeFwk.DataTypes.BOOLEAN,
        default: false,
      },
    },
    {
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );

  await GroupInvtModel.sync({ alter: true });
};

const create = async (group_id, student_id, user_id) => {
  return await GroupInvtModel.create({
    group_id: group_id,
    student_id: student_id,
  });
};

const get = async (student_id) => {
  let query = `
        SELECT 
            grpinvt.*,
            grp.group_name
        from group_invitations grpinvt
        LEFT JOIN groups grp ON grp.id = grpinvt.group_id
        WHERE student_id = '${student_id}';
    `;

  return await GroupInvtModel.sequelize.query(query, {
    type: sequelizeFwk.QueryTypes.SELECT,
  });
};

export default {
  init,
  create,
  get,
};
