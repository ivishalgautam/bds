"use strict";

import table from "../../db/models.js";

const create = async (req, res) => {
  try {
    const record = await table.CourseModel.getById(req);
    if (!record) {
      return res.code(404).send({
        message: "Course not found. Please a enter a valid course id",
      });
    }
    const homeworkRecord = await table.HomeWorkModel.getByCourseId(
      req.body.course_id
    );

    if (homeworkRecord) {
      return res
        .code(409)
        .send({ message: "Homework already created for this course!" });
    }

    await table.HomeWorkModel.create(req);

    res.send({
      message: "New homework created.",
    });
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
};

const update = async (req, res) => {
  try {
    const record = await table.HomeWorkModel.getById(req);
    if (!record) {
      return res
        .code(404)
        .send({ message: "Homework not found or homework is deleted" });
    }
    return res.send(await table.HomeWorkModel.update(req));
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
};

const deleteById = async (req, res) => {
  try {
    const record = await table.HomeWorkModel.deleteById(req);
    if (record === 0) {
      return res.code(404).send({
        message: "Homework already deleted or not exists in our database",
      });
    }

    res.send({
      message: "Homework deleted.",
    });
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
};

const get = async (req, res) => {
  try {
    return res.send(await table.HomeWorkModel.get());
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
};

const getById = async (req, res) => {
  try {
    const record = await table.HomeWorkModel.getById(req);
    if (!record) {
      return res.code(404).send({ message: "Homework not found" });
    }
    return res.send(record);
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
};

// for student uploaded homework
const uploadHomework = async (req, res) => {
  try {
    const batch = await table.BatchModel.getById(null, req.body.batch_id);

    if (!batch) {
      return res.code(404).send({ message: "batch not found!" });
    }

    const data = await table.HomeworkUploadModel.create(req, batch.teacher_id);

    res.send({ message: "homework uploaded" });
  } catch (error) {
    console.error(error);
    res.code(500).send({ message: error.message });
  }
};

const getUploadedHomeworks = async () => {
  try {
    if (req.user_data.role === "student") {
      return res.send(await table.HomeworkUploadModel.get(req, null));
    }
    if (req.user_data.role === "teacher") {
      const teacher = await table.TeacherModel.getByUserId(req.user_data.id);
      return res.send(await table.HomeworkUploadModel.get(null, teacher.id));
    }
  } catch (error) {
    console.error(error);
    res.code(500).send({ message: error.message });
  }
};

export default {
  create: create,
  update: update,
  deleteById: deleteById,
  get: get,
  getById: getById,
  uploadHomework: uploadHomework,
  getUploadedHomeworks: getUploadedHomeworks,
};
