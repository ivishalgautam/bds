import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Avatar from "@/assets/avatar.svg";
import Title from "@/components/Title";
import Group1 from "@/assets/group1.svg";
import Group2 from "@/assets/group2.svg";
import Group3 from "@/assets/group3.svg";
import Group4 from "@/assets/group4.svg";
import Group5 from "@/assets/group5.svg";
import { MainContext } from "@/store/context";
import http from "@/utils/http";
import { endpoints } from "@/utils/endpoints";
import Spinner from "@/components/Spinner";
import { useFetchStudents } from "@/hooks/useFetchStudents";
import { toast } from "react-hot-toast";

function BuddyTeam() {
  const [selectedIds, setSelectedIds] = useState([]);
  const { user } = useContext(MainContext);
  const { data: students, isError, isLoading } = useFetchStudents();
  const [selected, setSelected] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    handleSubmit,
    reset,
    register,
    formState: { errors },
  } = useForm();

  // Handle checkbox change
  const handleCheckboxChange = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((selectedId) => selectedId !== id)); // Remove ID
    } else {
      setSelectedIds([...selectedIds, id]); // Add ID
    }
  };

  const onSubmit = async (data) => {
    const payload = {
      group_name: data.name,
      group_admin: [user.id],
      group_image: data.group,
      group_users: selectedIds,
    };

    setLoading(true);
    try {
      const response = await http().post(endpoints.buddy.getAll, payload);
      toast.success(response.message);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
      reset();
    }
  };

  const GroupImages = [
    {
      value:
        "https://localhost:3001/public/images/1693121417928_group1.png",
      label: "group1",
      imageSrc: Group1,
    },
    {
      value:
        "https://localhost:3001/public/images/1693121542826_group2.png",
      label: "group2",
      imageSrc: Group2,
    },
    {
      value:
        "https://localhost:3001/public/images/1693121593480_group3.png",
      label: "group3",
      imageSrc: Group3,
    },
    {
      value:
        "https://localhost:3001/public/images/1693121646738_group4.png",
      label: "group4",
      imageSrc: Group4,
    },
    {
      value:
        "https://localhost:3001/public/images/1693121688138_group5.png",
      label: "group5",
      imageSrc: Group5,
    },
  ];

  if (isLoading)
    return (
      <div className="flex justify-center">
        <Spinner />
      </div>
    );

  if (isError) {
    return <h1>Error</h1>;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div className="p-8 bg-white space-y-8 rounded-xl">
        <Title text="Create Buddy Team" />
        <div className="flex gap-4">
          <div>
            <input
              type="text"
              placeholder="Name"
              className="w-full px-4 py-2 border outline-none rounded-md bg-[#F7F7FC] font-mulish text-xl font-semibold"
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && (
              <p className="text-red-600">{errors.name.message}</p>
            )}
          </div>
          <div>
            <input
              type="text"
              placeholder="Interests"
              className="w-full px-4 py-2 border outline-none rounded-md bg-[#F7F7FC] font-mulish text-xl font-semibold"
              {...register("interests", { required: "Interests are required" })}
            />
            {errors.interests && (
              <p className="text-red-600">{errors.interests.message}</p>
            )}
          </div>
        </div>
        <div className="space-y-8">
          <label>Group Images:</label>
          <div className="radio-toolbar flex gap-4">
            {GroupImages.map((group, i) => (
              <label
                key={group.value}
                onClick={() => setSelected(i)}
                className={
                  selected === i
                    ? "border-2 border-primary p-1 rounded-full"
                    : "border-2 border-transparent p-1 rounded-full"
                }
              >
                <input
                  type="radio"
                  value={group.value}
                  {...register("group", { required: "Group is required" })}
                />
                <Image src={group.imageSrc} alt={group.label} />
              </label>
            ))}
          </div>
          {errors.group && (
            <span className="text-red-600">{errors.group.message}</span>
          )}
        </div>
      </div>
      <div className="px-8 space-y-8 rounded-xl">
        <Title text="Select Batchmates to Join ( 3/5 )" />
        <div className="grid grid-cols-4 gap-8">
          {students.map((item, index) => (
            <div key={index} className="bg-white p-8 rounded-xl space-y-2">
              <div className="flex">
                <label>
                  <input
                    type="checkbox"
                    className="form-checkbox w-5 h-5 text-primary rounded focus:ring-primary focus:ring-2 "
                    checked={selectedIds.includes(item.user_id)} // Check if ID is in selectedIds array
                    onChange={() => handleCheckboxChange(item.user_id)} // Pass the ID to the handler
                  />
                </label>
                <Image src={Avatar} alt="" className="w-24 h-24 mx-auto" />
              </div>
              <h3 className="font-bold text-center">{item.title}</h3>
              <p className="text-center">{item.username}</p>
              {/* <p className="text-center">
                Earned Points :{" "}
                <span className="text-yellow-400">{item.points}</span>
              </p> */}
            </div>
          ))}
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-primary px-6 py-2 rounded-md text-white"
          >
            {loading ? <Spinner color="white" /> : "Create Team"}
          </button>
        </div>
      </div>
    </form>
  );
}

export default BuddyTeam;
