import { useFetchQuiz } from "@/hooks/useFetchQuiz";
import { endpoints } from "@/utils/endpoints";
import http from "@/utils/http";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const Quiz = () => {
  const [trace, setTrace] = useState(0);
  const router = useRouter();
  const { id, w: week } = router.query;

  const { data: quiz } = useFetchQuiz(id);

  console.log({ quiz });
  console.log({ trace });

  const handleTrace = (type) => {
    if (type === "next" && trace < quiz?.questions.length - 1) {
      setTrace((prev) => prev + 1);
    }

    if (type === "prev" && trace > 0) {
      setTrace((prev) => prev - 1);
    }
  };

  useEffect(() => {
    if (data && week) {
      setQuiz(data?.quiz.filter((i) => i.weeks === parseInt(week))[0]);
    }
  }, [data]);

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-150px)]">
      <div className="bg-white rounded-lg shadow-md w-1/3 p-10">
        <h2 className="capitalize text-4xl font-bold mb-8">{quiz.quiz_name}</h2>

        <ul className="space-y-2">
          <h3 className="text-xl font-semibold">
            {`Question ${quiz?.questions?.[trace].ques_no}: ${quiz?.questions?.[trace].question}`}
          </h3>
          {quiz?.questions?.[trace].options.map((o, i) => (
            <li key={i}>
              <input
                type="radio"
                value={false}
                id={`q${i}-option`}
                name="options"
                className="mr-2 accent-primary"
              />
              <label htmlFor={`q${i}-option`}>{o}</label>
            </li>
          ))}
        </ul>

        <div className="flex items-center justify-between mt-6">
          <button
            className="bg-primary border-none outline-none px-4 py-0.5 rounded-md text-white"
            onClick={() => handleTrace("prev")}
          >
            Prev
          </button>
          <button
            className="bg-primary border-none outline-none px-4 py-0.5 rounded-md text-white"
            onClick={() => handleTrace("next")}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
