import React, { useContext, useEffect, useState } from "react";
import Title from "../../components/Title";
import Course from "../../components/Cards/Course";
import http from "../../utils/http";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../../components/Spinner";
import { endpoints } from "../../utils/endpoints";
import { AiOutlinePlus } from "react-icons/ai";
import Link from "next/link";
import MFCourse from "@/components/Cards/MFCourse";
import { MainContext } from "@/store/context";

const fetchCourses = () => {
  return http().get(endpoints.courses.getAll);
};

export default function Courses() {
  const { user } = useContext(MainContext);
  const { isLoading, isError, data } = useQuery({
    queryKey: ["courses"],
    queryFn: fetchCourses,
  });

  if (isLoading)
    return (
      <div className="flex justify-center">
        <Spinner />
      </div>
    );
  if (isError) return <h2>Error</h2>;

  return (
    <div className="space-y-6">
      <Title text="All Courses" />
      {/* <div className="grid grid-cols-3 gap-8">
        <MFCourse />
      </div> */}

      <div className="grid grid-cols-3 gap-8">
        {user?.role === "admin" && (
          <Link
            href="/courses/create"
            className="bg-white p-4 rounded-xl space-y-4 flex justify-center items-center cursor-pointer"
          >
            <div className="flex flex-col items-center justify-center space-y-2">
              <AiOutlinePlus className="text-6xl bg-primary p-2 text-white rounded-full" />
              <p>Add New Course</p>
            </div>
          </Link>
        )}

        {data.map((item) => (
          <React.Fragment key={item.id}>
            {user?.role === "admin" ? (
              <Course
                id={item.id}
                title={item.course_name}
                description={item.course_description}
                thumbnail={item.course_thumbnail}
                duration={item.duration}
                quiz={item.total_quizs}
                projects={item.total_project}
                user={user}
              />
            ) : (
              <MFCourse
                id={item.id}
                title={item.course_name}
                description={item.course_description}
                thumbnail={item.course_thumbnail}
                duration={item.duration}
                quiz={item.quiz}
                projects={item.projects}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
