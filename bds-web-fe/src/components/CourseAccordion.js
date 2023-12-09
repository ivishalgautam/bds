import { MainContext } from "@/store/context";
import Link from "next/link";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { MdHomeWork, MdOutlineQuiz } from "react-icons/md";
import { PiFilePptDuotone } from "react-icons/pi";

const CourseAccordion = ({
  data,
  homeworks,
  quizs,
  batchId,
  handleWeekComplete,
  type,
}) => {
  // console.log({ data });
  const { user } = useContext(MainContext);
  const [openIndex, setOpenIndex] = useState(null);

  const handleToggleAccordion = (index) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  function getQuiz(weeks) {
    return quizs?.filter((quiz) => quiz.weeks === weeks);
  }

  return (
    <div className="space-y-4">
      {data?.map((item, index) => (
        <div key={index} className="border rounded-md">
          <button
            className="flex justify-between items-center w-full px-4 py-2"
            onClick={() => handleToggleAccordion(index)}
          >
            <p className="font-bold font-mulish text-lg">Week {item.weeks}</p>
            {type === "class" && getQuiz(item.weeks)?.length > 0 && (
              <Link
                href={
                  !getQuiz(item.weeks)[0]?.is_disabled
                    ? "#"
                    : `/batches/quiz/${batchId}?w=${item.weeks}`
                }
                className={`ml-auto mr-10 text-xs font-semibold ${
                  getQuiz(item.weeks)[0]?.is_disabled && "cursor-not-allowed"
                }`}
              >
                <MdOutlineQuiz size={25} className="text-primary" />
                Quiz
              </Link>
            )}
            <svg
              className={`w-5 h-5 transition-transform duration-300 ${
                openIndex !== index ? "transform rotate-180" : ""
              }`}
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12.0001 9.62155L4.06077 17.5609L1.93945 15.4396L12.0001 5.37891L22.0608 15.4396L19.9395 17.5609L12.0001 9.62155Z"
                fill="#9A9AB0"
              />
            </svg>
          </button>
          {openIndex === index && (
            <div className="p-4">
              {item.day_wise.map((day, idx) => (
                <div key={idx} className="mb-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold">{day.heading}</h3>
                    <div className="ml-auto mr-10 flex items-center justify-center gap-4">
                      {homeworks !== undefined &&
                        Array.isArray(homeworks) &&
                        homeworks.length !== 0 && (
                          <>
                            {type === "class" && (
                              <a
                                href={`${
                                  process.env.NEXT_PUBLIC_IMAGE_DOMAIN
                                }/${
                                  homeworks[0]?.homework[index].day_wise.filter(
                                    (homework) => homework.days === day.days
                                  )[0]?.file
                                }`}
                                download
                                className="flex items-center justify-center flex-col"
                              >
                                <MdHomeWork
                                  size={25}
                                  className="text-primary"
                                />
                                <p className="font-semibold text-xs">
                                  Homework
                                </p>
                              </a>
                            )}
                            <a
                              href={`${process.env.NEXT_PUBLIC_IMAGE_DOMAIN}/${
                                homeworks[0].homework[index].day_wise.filter(
                                  (homework) => homework.days === day.days
                                )[0]?.ppt_file
                              }`}
                              download
                              className="flex items-center justify-center flex-col"
                            >
                              <PiFilePptDuotone
                                size={25}
                                className="text-primary"
                              />
                              <p className="font-semibold text-xs">PPT</p>
                            </a>
                          </>
                        )}
                      {user?.role === "teacher" && (
                        <label className="switch">
                          <input
                            type="checkbox"
                            checked={day.is_completed}
                            onChange={(e) => {
                              // console.log(e.target.checked);
                              handleWeekComplete(
                                batchId,
                                item.weeks,
                                e.target.checked,
                                day.days
                              );
                            }}
                          />
                          <span className="slider"></span>
                        </label>
                      )}
                    </div>
                    <span className="text-gray-500">Day {day.days}</span>
                  </div>
                  <p className="text-gray-700">{day.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default CourseAccordion;
