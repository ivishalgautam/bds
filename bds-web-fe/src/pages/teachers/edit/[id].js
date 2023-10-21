import CreateTeacher from "@/components/Forms/CreateTeacher";
import { endpoints } from "@/utils/endpoints";
import http from "@/utils/http";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import toast from "react-hot-toast";

function Edit() {
  const router = useRouter();
  const { id } = router.query;

  const updateItem = async (itemId, updatedItem) => {
    await http().put(`${endpoints.createUser}/${itemId}`, updatedItem);
  };
  const queryClient = useQueryClient();

  const updateMutation = useMutation(
    (updatedItem) => updateItem(id, updatedItem),
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["teachers"] });
        toast.success("Teacher updated successfully.");
      },
      onError: () => {
        toast.error("Failed to update Teacher.");
      },
    }
  );

  const handleUpdate = (updatedItem) => {
    updateMutation.mutate(updatedItem);
    router.push("/teachers");
  };

  return (
    <div className="bg-white p-8 rounded-xl">
      <CreateTeacher
        userRole="teacher"
        type="edit"
        id={id}
        handleUpdate={handleUpdate}
      />
    </div>
  );
}

export default Edit;
