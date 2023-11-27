"use strict";

import table from "../../db/models.js";
import hash from "../../lib/encryption/index.js";

const create = async (req, res) => {
  try {
    const record = await table.UserModel.getByUsername(req);
    if (record) {
      return res.send(
        "username_already_exists",
        "User already exists with username. Please try with different username"
      );
      return;
    }
    const user = await table.UserModel.create(req);
    if (req.user_data.role === "sub_franchisee") {
      const franchisee = await table.FranchiseeModel.getByUserId(req);
      if (user.role === "student") {
        await table.StudentModel.create(
          user.id,
          franchisee.franchisee_id,
          franchisee.id
        );
      }
      if (user.role === "teacher") {
        await table.TeacherModel.create(
          user.id,
          franchisee.franchisee_id,
          franchisee.id
        );
      }
    }
    return res.send(user);
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
};

const update = async (req, res) => {
  try {
    const record = await table.UserModel.getById(req);
    if (!record) {
      return res.send("user_not_found", "User not exists");
      return;
    }
    return res.send(await table.UserModel.update(req));
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
};

const deleteById = async (req, res) => {
  try {
    const record = await table.UserModel.deleteById(req);
    if (record === 0) {
      return res.send("user_not_found", "User not exists");
      return;
    }
    return res.send({
      message: "User deleted.",
    });
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
};

const get = async (req, res) => {
  try {
    let users = [];
    let user_ids;
    if (req.user_data.role === "sub_franchisee") {
      const sub_franchisee = await table.FranchiseeModel.getByUserId(req);
      user_ids = await table.TeacherModel.getUserIdsBySubFranchisee(
        sub_franchisee.id
      );
    } else if (req.user_data.role === "teacher") {
      const teacher = await table.TeacherModel.getByUserId(req.user_data.id);
      user_ids = await table.StudentModel.getUserIdsBySubFranchisee(
        teacher.sub_franchisee_id
      );
    } else {
      user_ids = await table.FranchiseeModel.getFranchiseeUserId(req);
    }
    users = await table.UserModel.getByUserIds(user_ids);
    return res.send(users);
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
};

const getById = async (req, res) => {
  try {
    const record = await table.UserModel.getById(req);
    if (!record) {
      return res.send("not_found", "User not exists");
      return;
    }
    delete record.password;
    return res.send(record);
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
};

const updatePassword = async (req, res) => {
  try {
    const record = await table.UserModel.getById(req);

    if (!record) {
      return res.send("not_found", "User not exists");
      return;
    }

    const verify_old_password = await hash.verify(
      req.body.old_password,
      record.password
    );

    if (!verify_old_password) {
      return res.send(
        "Invalid password",
        "Incorrect password. Please enter a valid password"
      );
      return;
    }

    await table.UserModel.updatePassword(req);
    return res.send({
      message: "Password changed successfully!",
    });
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
};

const checkUsername = async (req, res) => {
  try {
    const user = await table.UserModel.getByUsername(req);
    if (user) {
      return res.send(
        "already_exists",
        "username already exists try with different username"
      );
      return;
    }
    return res.send({
      message: false,
    });
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
};

const getUser = async (req, res) => {
  try {
    const record = await table.UserModel.getById(undefined, req.user_data.id);
    if (!record) {
      return res.send("Invalid_token", "invalid token");
      return;
    }
    return res.send(req.user_data);
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
};

const getStudents = async (req, res) => {
  console.log(req.user_data.id);
  try {
    if (req.user_data.role === "sub_franchisee") {
      const franchisee = await table.FranchiseeModel.getByUserId(req);
      return res.send(await table.StudentModel.get(franchisee.id));
    }
    if (req.user_data.role === "teacher") {
      const teacher = await table.TeacherModel.getByUserId(req.user_data.id);
      return res.send(await table.StudentModel.get(teacher.sub_franchisee_id));
    }
    if (req.user_data.role === "student") {
      const student = await table.StudentModel.getByUserId(req.user_data.id);
      if (!student) {
        return res.send([]);
      }

      const batches = await table.BatchModel.get(null, null, student.id);

      const batchStudents = [];

      for (const { students_id } of batches) {
        for (const id of students_id) {
          if (student.id !== id) {
            const record = await table.StudentModel.getById(id);

            if (!record) {
              return console.error("student not found");
            }

            const batchStudent = await table.StudentModel.getDetailsById(id);
            batchStudents.push(batchStudent[0]);
          }
        }
      }

      res.send(batchStudents);
    }
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
};

const getTeachers = async (req, res) => {
  try {
    const franchisee = await table.FranchiseeModel.getByUserId(req);
    return res.send(await table.TeacherModel.get(franchisee.id));
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
};

const resetPassword = async (req, res) => {
  try {
    const token = await table.UserModel.getByResetToken(req);
    if (!token) {
      return res.send("invalid_url", "invalid url");
    }

    await table.UserModel.updatePassword(req, token.id);
    return res.send({
      message: "Password reset successfully!",
    });
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
};
export default {
  create: create,
  update: update,
  deleteById: deleteById,
  get: get,
  getById: getById,
  checkUsername: checkUsername,
  updatePassword: updatePassword,
  getUser: getUser,
  getStudents: getStudents,
  getTeachers: getTeachers,
  resetPassword: resetPassword,
};
