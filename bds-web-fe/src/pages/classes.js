import CourseAccordion from "@/components/CourseAccordion";
import MyCalendar from "@/components/Layout/Calendar";
import { MainContext } from "@/store/context";
import { endpoints } from "@/utils/endpoints";
import http from "@/utils/http";
import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useContext, useEffect, useState } from "react";

const fetchBatches = () => {
  return http().get(endpoints.batch.getAll);
};

const updateItem = async (itemId, updatedItem) => {
  await http().put(`${endpoints.batch.getAll}/${itemId}`, updatedItem);
};

export default function Classes() {
  const [batches, setBatches] = useState([]);
  const { isLoading, isError, data } = useQuery({
    queryKey: ["batches"],
    queryFn: fetchBatches,
  });

  useEffect(() => {
    setBatches(data);
  }, [data]);

  console.log({ batches });

  const { user } = useContext(MainContext);

  const updateMutation = useMutation(
    (updatedItem) => updateItem(selectedBatch, updatedItem),
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["batches"] });
        toast.success("Batch updated successfully.");
      },
      onError: () => {
        toast.error("Failed to update Batch.");
      },
    }
  );

  const handleUpdateBatch = (updatedItem) => {
    updateMutation.mutate(updatedItem);
  };

  function handleWeekComplete(batchId, weeks, status, days) {
    console.log(batchId, weeks, status);
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
    handleUpdateBatch(updatedBatches);
    console.log({ updatedBatches });
  }

  return (
    <div>
      {user?.role === "student" ? (
        <MyCalendar />
      ) : (
        <>
          {JSON.stringify(batches)}
          {batches?.map((batch) => {
            return (
              <CourseAccordion
                data={batch.course_syllabus}
                batchId={batch.id}
                key={batch.id}
                handleWeekComplete={handleWeekComplete}
              />
            );
          })}
        </>
      )}
    </div>
  );
}
