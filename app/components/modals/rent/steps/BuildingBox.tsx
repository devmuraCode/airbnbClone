import React, { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";


interface TProps {
  title: string;
  subtitle: string;
  value: number;
  onChange: (value: number) => void;
}

const BuildingBox:FC<TProps> = (props) => {
  const { title, subtitle, onChange, value } = props;
  const [count, setCount] = useState<number>(0);

  const increment = () => {
    onChange(count + 1);
  };

  const decrement = () => {
    if (count > 0) {
      onChange(count - 1);
    }
  };
  return (
    <div className="flex flex-row items-center justify-between">
      <div className="flex flex-col">
        <div className="font-medium">{title}</div>
        <div className="font-light text-gray-600">
          {subtitle}
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
          {value}
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

export default BuildingBox;
