"use client";
import { FC } from "react";
import Image from "next/image";
import { FaHeart } from "react-icons/fa";
import countries from "world-countries";
interface TProps {
  id: string;
  title: string;
  description: string;
  imageSrc: string;
  createdAt: Date;
  category: string;
  roomCount: number;
  bathroomCount: number;
  guestCount: number;
  locationValue: string;
  userId: string;
  price: number;
}

const countryOptions = countries.map((country) => ({
  value: country.cca2,
  label: country.name.common,
  flag: country.flag,
  latlng: country.latlng,
  region: country.region,
}));

const ListingsPage: FC<TProps> = (props) => {
  const { imageSrc, locationValue, category, price } = props;

  const getByValue = (value: string) => {
    return countryOptions.find((item) => item.value === value);
  };

  const location = getByValue(locationValue);

  return (
    <div className="col-span-1 cursor-pointer group">
      <div className="flex flex-col gap-2 w-full">
        <div
          className="
          aspect-square 
          w-full 
          relative 
          overflow-hidden 
          rounded-xl
        "
        >
          {/* Image */}
          <Image
            src={imageSrc}
            fill
            className="
              object-cover 
              h-full 
              w-full 
              group-hover:scale-110 
              transition
            "
            alt={""}
          />
          <div
            className="
          absolute
          top-3
          right-3
        "
          >
            <FaHeart />
          </div>
        </div>
        <div className="font-semibold text-lg">
          {location?.label}, ( {location?.region})
        </div>
        <div className="font-light text-neutral-500">{category}</div>
        <div className="flex flex-row items-center gap-1">
          <div className="font-semibold">$ {price}</div>
        </div>
      </div>
    </div>
  );
};

export default ListingsPage;
