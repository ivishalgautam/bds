import Image from "next/image";
import React from "react";
import ShopImg from "../../assets/shop.svg";

export default function ShopCard({ title, shortDescription, thumbnail }) {
  return (
    <div className="bg-white rounded-xl overflow-hidden">
      <img
        src={thumbnail || ShopImg}
        className="w-full aspect-video bg-cover"
      />
      <div className="p-4 space-y-2">
        <div className="flex justify-between">
          <p className="font-bold">{title}</p>
          <p>Age 6+</p>
        </div>
        <p className="text-base">{shortDescription}</p>
        <div className="flex justify-between">
          <button className="bg-primary py-2 px-6 text-white rounded-md">
            Buy Now
          </button>
          <button className="text-primary font-bold">View Product</button>
        </div>
      </div>
    </div>
  );
}
