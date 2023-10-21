import ShopCard from "@/components/Cards/ShopCard";
import Spinner from "@/components/Spinner";
import Title from "@/components/Title";
import { endpoints } from "@/utils/endpoints";
import http from "@/utils/http";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const fetchShops = () => {
  return http().get(endpoints.products.getAll);
};

export default function Shop() {
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["shop"],
    queryFn: fetchShops,
  });

  if (isLoading)
    return (
      <div className="flex justify-center">
        <Spinner />
      </div>
    );

  if (isError) return <h2>{error?.message}</h2>;
  console.log(data);
  return (
    <div className="space-y-6">
      <Title text="Shop" />
      <div className="grid grid-cols-3 gap-4">
        {data.map((item) => (
          <ShopCard
            key={item.id}
            title={item.title}
            shortDescription={item.short_description}
            thumbnail={item.thumbnail}
          />
        ))}
      </div>
    </div>
  );
}
