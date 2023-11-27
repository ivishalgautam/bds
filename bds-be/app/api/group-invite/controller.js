"use strict";

import table from "../../db/models.js";

const create = async (req, res) => {
  const { students_id } = req.body;
  try {
    for (const studentId of students_id) {
      const studentRecord = await table.StudentModel.getById(studentId);
      if (!studentRecord) {
        return res.code(404).send({ message: "student not found!" });
      }

      const group = await table.GroupModel.create(req);

      await table.GroupInvtModel.create(group.id, studentId);
    }

    res.send({ message: "invitations sent!" });
  } catch (error) {
    console.error(error);
    res.code(500).send(error);
  }
};

const get = async (req, res) => {
  try {
    const student = await table.StudentModel.getByUserId(req.user_data.id);

    if (!student) {
      return res.code(404).send({ message: "student not found!" });
    }

    const records = await table.GroupInvtModel.get(student.id);
    res.send(records);
  } catch (error) {
    console.error(error);
    res.code(500).send(error);
  }
};

export default {
  create,
  get,
};
