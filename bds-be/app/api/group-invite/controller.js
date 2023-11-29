"use strict";

import table from "../../db/models.js";

const create = async (req, res) => {
  const { group_users } = req.body;
  console.log({ invite: req.body });
  try {
    for (const userId of group_users) {
      const userRecord = await table.UserModel.getById(req, userId);
      // console.log({ userId });
      if (!userRecord) {
        return res.code(404).send({ message: "user not found!" });
      }

      const group = await table.GroupModel.create(req);

      await table.GroupInvtModel.create(
        group.id,
        req.body.group_name,
        userId,
        req.user_data.id
      );
    }

    res.send({ message: "invitations sent!" });
  } catch (error) {
    console.error(error);
    res.code(500).send(error);
  }
};

const get = async (req, res) => {
  try {
    const userRecord = await table.UserModel.getById(req, req.user_data.id);

    if (!userRecord) {
      return res.code(404).send({ message: "user not found!" });
    }

    const records = await table.GroupInvtModel.get(userRecord.id);
    res.send(records);
  } catch (error) {
    console.error(error);
    res.code(500).send(error);
  }
};

const update = async (req, res) => {
  try {
    const record = await table.GroupInvtModel.getById(req.params.invitation_id);

    if (!record) {
      return res.code(404).send({ message: "Invitation not found!" });
    }

    const updatedInvite = await table.GroupInvtModel.update(
      req.params.invitation_id,
      req.body.status
    );

    const group = await table.GroupModel.getById(
      null,
      updatedInvite[1].group_id
    );

    if (!group) {
      return res.code(404).send({ message: "group not found!" });
    }

    if (updatedInvite && updatedInvite?.[1].status === "accepted") {
      await table.GroupModel.addToGroup(
        group.group_users,
        updatedInvite[1].user_id,
        updatedInvite?.[1].group_id
      );
    }

    res.send({ message: "updated" });
  } catch (error) {
    console.error(error);
    res.code(500).send(error);
  }
};

export default {
  create,
  get,
  update,
};
