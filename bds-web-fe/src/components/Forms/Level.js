import React, { useEffect } from "react";
import Title from "../Title";
import { useForm } from "react-hook-form";
import http from "@/utils/http";
import { endpoints } from "@/utils/endpoints";

export default function LevelForm({ id, type, handleCreate, handleUpdate }) {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const payload = {
      level: data.level,
      min_reward_point: data.min_reward_point,
    };

    if (type === "add") {
      handleCreate(payload);
    }

    if (type === "edit") {
      handleUpdate(payload);
    }

    reset();
  };

  useEffect(() => {
    async function fetchData(id) {
      // console.log("run");
      const data = await http().get(`${endpoints.levels.getAll}/${id}`);
      setValue("level", data.level);
      setValue("min_reward_point", data.min_reward_point);
    }

    if ((type === "edit" && id) || (type === "view" && id)) {
      fetchData(id);
    }
  }, [setValue, type, id]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Title
        text={
          type === "add"
            ? "Create Level"
            : type === "edit"
            ? "Edit Level"
            : "Level details"
        }
      />
      <div className="mt-10 grid grid-cols-2 gap-4">
        <div>
          {/* <label htmlFor="level">Level</label> */}
          <input
            type="number"
            placeholder="Enter level"
            disabled={type === "view"}
            className="w-full px-4 h-[42px] border outline-none rounded-md bg-[#F7F7FC] font-mulish text-xl font-semibold"
            {...register("level", {
              required: "level is required",
            })}
          />
          {errors.level && (
            <p className="text-red-600">{errors.level.message}</p>
          )}
        </div>
        <div>
          {/* <label htmlFor="min_reward_point">Reward Points</label> */}
          <input
            type="number"
            placeholder="Enter minimum reward points"
            disabled={type === "view"}
            className="w-full px-4 h-[42px] border outline-none rounded-md bg-[#F7F7FC] font-mulish text-xl font-semibold"
            {...register("min_reward_point", {
              required: "Reward point is required",
            })}
          />
          {errors.level && (
            <p className="text-red-600">{errors.min_reward_point.message}</p>
          )}
        </div>
      </div>
      {type !== "view" && (
        <button
          type="submit"
          className="bg-primary w-full mt-4 py-2 text-white rounded-md font-mulish"
        >
          {type === "edit" ? "Update" : "Submit"}
        </button>
      )}
    </form>
  );
}
