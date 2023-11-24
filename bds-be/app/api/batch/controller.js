"use strict";

import table from "../../db/models.js";

const create = async (req, res) => {
  try {
    let teacher;
    let record;
    let user_ids = [];
    if (req.user_data.role === "sub_franchisee") {
      record = await table.FranchiseeModel.getByUserId(req);
      if (!record) {
        return res.send(
          "not_found",
          "master franchisee not exists. Please contact us our support team"
        );
        return;
      }
      if (!req.body.teacher_id) {
        return res.send("bad_request", "teacher_id is required parameter");
        return;
      }
      teacher = await table.TeacherModel.getById(req.body.teacher_id);
      if (!teacher) {
        return res.send(
          "not_found",
          "teacher not exists. Please create new teacher or assign valid teacher"
        );
        return;
      }
      user_ids.push(teacher.user_id);
    }

    if (req.user_data.role === "teacher") {
      teacher = await table.TeacherModel.getByUserId(req.user_data.id);
      if (!teacher) {
        return res.send(
          "not_found",
          "teacher not exists. Please create new teacher or assign valid teacher"
        );
        return;
      }
      req.body.teacher_id = teacher?.id;
      user_ids.push(teacher.user_id);
    }

    for (const student_id of req.body.students_ids) {
      const student = await table.StudentModel.getById(student_id);
      if (!student) {
        return res.send(
          "not_found",
          `student not found. Invalid student id:- ${student_id}`
        );
        return;
      }
      user_ids.push(student.user_id);
    }
    const course = await table.CourseModel.getById(req);
    if (!course) {
      return res.send(
        "not_found",
        "course not exists. Please assign valid course"
      );
      return;
    }

    const course_syllabus = course.course_syllabus.map((s) => {
      return {
        ...s,
        day_wise: s.day_wise.map((dw) => ({ ...dw, is_completed: false })),
      };
    });

    let quiz = await table.QuizModel.getByCourseId(course.id);

    if (!quiz) {
      quiz = [];
    } else {
      quiz = quiz.map((i) => {
        const { id, course_id, created_at, updated_at, ...data } = i;
        return { ...data };
      });
    }

    // return console.log(syllabus.map((s) => s.day_wise));

    await table.BatchModel.create(
      req,
      record?.franchisee_id || teacher.franchisee_id,
      record?.id || teacher.sub_franchisee_id,
      course.course_name,
      course_syllabus,
      quiz
    );

    await table.GroupModel.create(req, user_ids);
    return res.send({
      message: "New batch created.",
    });
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
};

const update = async (req, res) => {
  const batchWeeksComplete = [];
  console.log(req.body);
  // console.log(req.body);
  req.body?.course_syllabus?.forEach((cs) => {
    batchWeeksComplete.push({
      weeks: cs.weeks,
      course_id: req.body.course_id,
      completed: [...cs.day_wise.map((i) => i.is_completed)],
    });
  });

  // console.log(batchWeeksComplete);

  try {
    let course;
    const record = await table.BatchModel.getById(req);
    if (!record) {
      return res
        .code(404)
        .send({ message: "batch not exists in our database" });
    }

    if (req.body?.teacher_id) {
      const teacher = await table.TeacherModel.getById(req.body.teacher_id);
      if (!teacher) {
        return res.code(404).send({
          message:
            "teacher not exists. Please create new teacher or assign valid teacher",
        });
        return;
      }
    }

    if (req.body?.students_ids) {
      for (const student_id of req.body.students_ids) {
        const student = await table.StudentModel.getById(student_id);
        if (!student) {
          return res.code(404).send({
            message: `student not found. Invalid student id:- ${student_id}`,
          });
          return;
        }
      }
    }

    if (req.body?.course_id) {
      course = await table.CourseModel.getById(req);
      if (!course) {
        return res
          .code(404)
          .send({ message: "course not exists. Please assign valid course" });
        return;
      }
    }

    await table.BatchModel.update(req, course.course_name);

    // batchWeeksComplete.forEach((bw) => {
    //   if (bw.completed.every((i) => i)) {
    //     // await table.QuizModel.update(null,)
    //   } else {
    //     console.log(false);
    //   }
    // });

    return res.send({ message: "success" });
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
};

const deleteById = async (req, res) => {
  try {
    const record = await table.BatchModel.deleteById(req);
    if (record === 0) {
      return res.send("not_found", "batch not exists in our database");
      return;
    }
    return res.send({
      message: "batch deleted.",
    });
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
};

const get = async (req, res) => {
  try {
    let teacher;
    let franchisee;
    let student;

    if (req.user_data.role === "sub_franchisee") {
      franchisee = await table.FranchiseeModel.getByUserId(req);
      if (!franchisee) {
        return res.send(
          "not_found",
          "master franchisee not exists. Please contact us our support team"
        );
      }
    }

    if (req.user_data.role === "teacher") {
      teacher = await table.TeacherModel.getByUserId(req.user_data.id);
    }

    if (req.user_data.role === "student") {
      student = await table.StudentModel.getByUserId(req.user_data.id);
      // console.log({ student });
    }

    return res.send(
      await table.BatchModel.get(teacher?.id, franchisee?.id, student?.id)
    );
  } catch (error) {
    console.log(error);
    return res.send(error);
  }
};

const getById = async (req, res) => {
  try {
    const record = await table.BatchModel.getById(req);
    if (!record) {
      return res.send("not_found", "batch not exists in our database");
      return;
    }
    return res.send(record);
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
};
