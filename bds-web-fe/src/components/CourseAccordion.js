import React, { useState } from "react";

const CourseAccordion = ({ data }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const handleToggleAccordion = (index) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div className="space-y-4">
      {data.map((item, index) => (
        <div key={index} className="border rounded-md">
          <button
            className="flex justify-between items-center w-full px-4 py-2"
            onClick={() => handleToggleAccordion(index)}
          >
            <p className="font-bold font-mulish text-lg">Week {item.weeks}</p>
            <svg
              className={`w-5 h-5 transition-transform duration-300 ${
                openIndex === index ? "transform rotate-180" : ""
              }`}
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
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
                    <span className="text-gray-500">{day.days} days</span>
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
