"use strict";

import table from "../../db/models.js";

const assignCourse = async (req, res) => {
  try {
    let record = await table.CourseModel.getById(req);
    if (!record) {
      return res.send(
        "not_found",
        "Courses not found. Please enter a valid course id"
      );
      return;
    }

    const assign_course = await table.CourseAssignModel.checkExists(req);
    if (assign_course) {
      return res.code(409).send({
        message:
          "This Course already assign to the user. Please assigned different course or user",
      });
      return;
    }

    req.body.course_name = record.course_name;
    // const franchisee = await table.FranchiseeModel.getById(
    //   req,
    //   req.user_data.id
    // );
    // if (!franchisee) {
    //   return res.code(404).send({ message: "Franchisee not found!" });
    // }
    await table.CourseAssignModel.create(req);
    return res.send({
      message: "New course Assigned.",
    });
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
};

const updateAssignCourse = async (req, res) => {
  try {
    let record = await table.CourseAssignModel.getById(req);
    if (!record) {
      return res.send("not_found", "course not assgin");
      return;
    }

    if (req.body?.course_id) {
      record = await table.CourseModel.getById(req);
      if (!record) {
        return res.send({
          message: "Courses not found. Please enter a valid course id",
        });
        return;
      }
    }

    return res.send(await table.CourseAssignModel.update(req));
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
};

const deleteById = async (req, res) => {
  try {
    const record = await table.CourseAssignModel.deleteById(req);
    if (record === 0) {
      return res.send("not_found", "course not assign");
      return;
    }
    return res.send({
      message: "Course deleted.",
    });
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
};

const get = async (req, res) => {
  try {
    const courses = await table.CourseAssignModel.get(
      req.user_data.id,
      req.user_data.role === "admin"
    );
    // console.log({ courses });
    return res.send(courses);
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
};

const getByFranchiseeId = async (req, res) => {
  console.log(req.user_data.id);
  try {
    const courses = await table.CourseAssignModel.getAllCourseByFranchiseeId(
      req.user_data.id
    );
    // console.log({ courses });
    return res.send(courses);
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
};

const getById = async (req, res) => {
  try {
    const record = await table.CourseAssignModel.getById(req);
    if (!record) {
      return res.send("not_found", "course not assign");
      return;
    }
    return res.send(record);
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
};

export default {
  assignCourse,
  updateAssignCourse,
  deleteById,
  get: get,
  getById: getById,
  getByFranchiseeId,
};