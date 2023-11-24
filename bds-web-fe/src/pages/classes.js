import CourseAccordion from "@/components/CourseAccordion";
import Calender from "@/components/Layout/Calendar";
import { endpoints } from "@/utils/endpoints";
import http from "@/utils/http";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const fetchBatches = () => {
  return http().get(endpoints.batch.getAll);
};

const updateItem = async (updatedItem) => {
  await http().put(`${endpoints.batch.getAll}/${updatedItem.id}`, updatedItem);
};

// const fetchQuizs = () => {
//   return http().get(`${endpoints.quiz.getAll}`);
// };

const fetchHomeworks = () => {
  return http().get(`${endpoints.homeworks.getAll}`);
};

export default function Classes() {
  const [batches, setBatches] = useState([]);
  const { isLoading, isError, data } = useQuery({
    queryKey: ["batches"],
    queryFn: fetchBatches,
  });

  // console.log({ batches });

  // const { data: quizs } = useQuery({
  //   queryKey: ["quizs"],
  //   queryFn: fetchQuizs,
  // });

  const { data: homeworks } = useQuery({
    queryKey: ["homework"],
    queryFn: fetchHomeworks,
  });

  useEffect(() => {
    setBatches(data);
    console.log({ batches: data });
  }, [data]);

  // console.log({ batches: data });

  const queryClient = useQueryClient();

  const updateMutation = useMutation((updatedItem) => updateItem(updatedItem), {
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["batches"] });
      toast.success("Batch updated successfully.");
    },
    onError: (err) => {
      toast.error("Failed to update Batch.");
    },
  });

  const handleUpdateBatch = (itemId, updatedItem) => {
    updateMutation.mutate(itemId, updatedItem);
  };

  function handleWeekComplete(batchId, weeks, status, days) {
    const updatedBatches = batches.map((batch) => {
      if (batch.id === batchId) {
        return {
          ...batch,
          course_syllabus: [
            ...batch.course_syllabus.map((ele) =>
              ele.weeks === weeks
                ? {
                    ...ele,
                    day_wise: [
                      ...ele.day_wise.map((item) =>
                        item.days === days
                          ? { ...item, is_completed: status }
                          : item
                      ),
                    ],
                  }
                : ele
            ),
          ],
        };
      }
      return batch;
    });
    setBatches(updatedBatches);
    handleUpdateBatch(
      updatedBatches.filter((batch) => batch.id === batchId)[0]
    );
  }

  return (
    <div className="font-mulish">
      <div className="grid gap-6">
        {/* {JSON.stringify(batches)} */}
        {batches?.map((batch) => {
          return (
            <div className="p-4 bg-white rounded-md space-y-6" key={batch.id}>
              <h1 className="text-2xl font-bold capitalize">
                {batch.course_name}
              </h1>
              <CourseAccordion
                data={batch.course_syllabus}
                batchId={batch.id}
                handleWeekComplete={handleWeekComplete}
                quizs={batch.quiz}
                homeworks={homeworks?.filter(
                  (homework) => homework.course_id === batch.course_id
                )}
                type="class"
              />
            </div>
          );
        })}
        {/* <Calender /> */}
      </div>
    </div>
  );
}
