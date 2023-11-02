import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import MileStone from "../assets/milestone.svg";
import Image from "next/image";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";

export default function MileStones() {
  const slides = [
    {
      title: "You Write Your First Code",
      image: MileStone,
      description: "20. Object-oriented Programming on Dart",
    },
    {
      title: "You Write Your First Code",
      image: MileStone,
      description: "20. Object-oriented Programming on Dart",
    },
    {
      title: "You Write Your First Code",
      image: MileStone,
      description: "20. Object-oriented Programming on Dart",
    },
    {
      title: "You Write Your First Code",
      image: MileStone,
      description: "20. Object-oriented Programming on Dart",
    },
    {
      title: "You Write Your First Code",
      image: MileStone,
      description: "20. Object-oriented Programming on Dart",
    },
    {
      title: "You Write Your First Code",
      image: MileStone,
      description: "20. Object-oriented Programming on Dart",
    },
    {
      title: "You Write Your First Code",
      image: MileStone,
      description: "20. Object-oriented Programming on Dart",
    },
    {
      title: "You Write Your First Code",
      image: MileStone,
      description: "20. Object-oriented Programming on Dart",
    },
    {
      title: "You Write Your First Code",
      image: MileStone,
      description: "20. Object-oriented Programming on Dart",
    },
  ];
  const swiperRef = useRef(null);

  const handleSlide = (direction) => {
    if (swiperRef.current && swiperRef.current.swiper) {
      const swiper = swiperRef.current.swiper;
      if (direction === "prev") {
        swiper.slidePrev();
      } else if (direction === "next") {
        swiper.slideNext();
      }
    }
  };
  return (
    <div className="relative flex items-center gap-4 w-full">
      <div className="border-2 border-dashed border-primary absolute mx-auto w-[95%] ml-6" />
      <button onClick={() => handleSlide("prev")}>
        <BsChevronCompactLeft className="text-4xl" />
      </button>
      <Swiper
        ref={swiperRef}
        slidesPerView={3}
        spaceBetween={30}
        className="mySwiper"
      >
        {slides.map((slide, key) => (
          <SwiperSlide key={key}>
            <div className="bg-white w-full rounded-3xl">
              <Image src={slide.image} alt="img" className="aspect-video" />
              <div className="p-4">
                <h3>{slide.title}</h3>
                <p>{slide.description}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <button onClick={() => handleSlide("next")}>
        <BsChevronCompactRight className="text-4xl" />
      </button>
    </div>
  );
}
