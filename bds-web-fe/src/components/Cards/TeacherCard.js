import React, { useState } from "react";
import Teacher from "../../assets/teacher.svg";
import Graduation from "../../assets/graduation.svg";
import Skills from "../../assets/skills.svg";
import Image from "next/image";
import Title from "../Title";
import { MdModeEditOutline } from "react-icons/md";
import { BsFillEyeFill } from "react-icons/bs";
import { FaTrashAlt } from "react-icons/fa";
import { FiMoreVertical } from "react-icons/fi";
import { useRouter } from "next/router";
import Link from "next/link";

function TeacherCard({
  username,
  image_url,
  batches,
  openModal,
  id,
  setSelectedTeacher,
  setType,
  handleDelete,
  profession,
  course_name,
  userRole,
  type,
  role,
  courseId,
}) {
  const [show, setShow] = useState(false);
  const router = useRouter();

  return (
    <div className="bg-white p-3 rounded-xl">
      <div className="flex gap-5 relative">
        {image_url ? (
          <img
            src={image_url}
            alt=""
            className="w-20 h-24 rounded-lg overflow-hidden"
          />
        ) : (
          <Image
            src={Teacher}
            alt=""
            className="w-36 aspect-square rounded-md overflow-hidden"
          />
        )}
        <div className="space-y-2">
          <Title text={username} />
          {profession && (
            <div className="flex gap-1 items-center">
              <Image src={Graduation} alt="profession" className="w-5" />
              <p> {profession}</p>
            </div>
          )}
          {role && (
            <div className="flex gap-1 items-center">
              <Image src={Skills} alt="skills" className="w-5" />
              <p> {role}</p>
            </div>
          )}
        </div>

        <div className="absolute top-0 right-0">
          <FiMoreVertical
            onClick={() => setShow(true)}
            className="cursor-pointer ml-auto"
          />
          {show && (
            <div
              className="mt-2 bg-white rounded-lg shadow-md"
              onMouseLeave={() => setShow(false)}
            >
              <ul className="py-2 max-w-max">
                <li
                  className="px-4 py-2 hover:bg-gray-100 flex gap-4 items-center cursor-pointer"
                  onClick={() => router.push(`/${userRole}/edit/${id}`)}
                >
                  <MdModeEditOutline />
                  Edit
                </li>
                <li
                  className="px-4 py-2 hover:bg-gray-100 flex gap-4 items-center cursor-pointer"
                  onClick={() => router.push(`/${userRole}/${id}`)}
                >
                  <BsFillEyeFill />
                  View
                </li>
                <li
                  className="px-4 py-2 hover:bg-gray-100 flex gap-4 items-center cursor-pointer"
                  onClick={() => handleDelete(id)}
                >
                  <FaTrashAlt />
                  Delete
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
      <div className="flex gap-2 mt-2">
        <p className="font-semibold text-base">Batches</p>
        <span> : </span>
        {batches && type === "sub_franchisee" && (
          <p className="text-base">
            {batches.map((item) => (
              <span>{item.batches}, </span>
            ))}{" "}
          </p>
        )}
      </div>
      <div className="flex gap-2">
        <p className="font-semibold text-base">Course</p>
        <span> : </span>
        {course_name && type === "sub_franchisee" && (
          <p className="text-base">
            {course_name}{" "}
            {courseId && (
              <Link
                href={`/courses/details/${courseId}`}
                className="text-blue-500"
              >
                view more...
              </Link>
            )}
          </p>
        )}
      </div>
    </div>
  );
}

export default TeacherCard;
