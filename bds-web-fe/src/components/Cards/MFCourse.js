import React from "react";
import CourseImg from "../../assets/course.svg";
import Image from "next/image";
import Link from "next/link";

export default function MFCourse({
  title,
  description,
  duration,
  thumbnail,
  id,
}) {
  return (
    <div className="bg-white rounded-xl overflow-hidden">
      {thumbnail ? (
        <img src={thumbnail} className="w-full object-cover aspect-[4/3]" />
      ) : (
        <Image src={CourseImg} />
      )}
      <div className="p-4 space-y-2">
        <div>
          <p className="">{title}</p>
          <p className="text-xs text-[#252832]">Duration: {duration} Weeks</p>
        </div>
        <p className="text-[#11505D] text-sm">{description}</p>
        <Link
          href={`/courses/details/${id}`}
          className="bg-primary inline-block font-primary text-white p-2 rounded-md"
        >
          View Course
        </Link>
      </div>
    </div>
  );
}
