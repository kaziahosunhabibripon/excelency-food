"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import AOS from "aos";
import "aos/dist/aos.css";
import Image from "next/image";

const cards = [
  {
    id: 1,
    image: "/assets/banner.jpeg",
  },
  {
    id: 2,
    image: "/assets/banner1.jpeg",
  },
  {
    id: 3,
    image: "/assets/banner2.jpeg",
  },
];

const FoodCards = () => {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    AOS.init({ offset: 120, duration: 2000, easing: "ease-out" });

    const tl = gsap.timeline({ repeat: -1 });

    tl.to(cardRefs.current, {
      scale: 1.2,
      duration: 1,
      yoyo: true,
      repeat: 1,
      stagger: {
        each: 0.5,
        ease: "power1.inOut",
      },
    });
  }, []);

  return (
    <div className="w-full py-16 p-4 bg-[#f2f2f25b]" data-aos="fade-up">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:px-12">
        {cards.map((card, index) => (
          <div
            key={index}
            ref={(el) => {
              cardRefs.current[index] = el;
            }}
            className="relative overflow-hidden rounded-lg w-full h-64"
          >
            <Image
              src={card.image || "/placeholder.svg"}
              alt="Food"
              fill
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FoodCards;
