import React, { useState } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

const BuildingInfoBox = () => {
  const [count, setCount] = useState<number>(0);

  const increment = () => {
    setCount(count + 1);
  };

  const decrement = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };
  return (
    <div className="flex flex-row items-center justify-between">
      <div className="flex flex-col">
        <div className="font-medium">Guast</div>
        <div className="font-light text-gray-600">
          How many guest do you allow?
        </div>
      </div>
      <div className="flex flex-row items-center gap-4">
        <div
          onClick={decrement}
          className="
          w-10
          h-10
          rounded-full
          border-[1px]
          border-neutral-400
          flex
          items-center
          justify-center
          text-neutral-600
          cursor-pointer
          hover:opacity-80
          transition
        "
        >
          <AiOutlineMinus />
        </div>
        <div
          className="
          font-light 
          text-xl 
          text-neutral-600
          text-center
        "
        >
          {count}
        </div>
        <div
          onClick={increment}
          className="
          w-10
          h-10
          rounded-full
          border-[1px]
          border-neutral-400
          flex
          items-center
          justify-center
          text-neutral-600
          cursor-pointer
          hover:opacity-80
          transition
        "
        >
          <AiOutlinePlus />
        </div>
      </div>
    </div>
  );
};

export default BuildingInfoBox;
