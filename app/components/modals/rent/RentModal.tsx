"use client";

import { useCallback, useMemo, useState } from "react";

import Modal from "../Modal";
import useUserModal from "@/app/hooks/useUserModal";
import Heading from "../../Heading";

import { categories } from "../../navbar/Categories";
import RentCategoryBox from "./steps/RentCategoryBox";
import BuildingBox from "./steps/BuildingBox";
import Map from "./map/Map";
import YourPlaceBox from "./steps/YourPlaceBox";
import PricingBox from "./steps/PricingBox";
import ImageUploader from "./steps/ImageUploader";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import CounterSelect from "../../inputs/CounterSelect";
import dynamic from "next/dynamic";
enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}
const RentModal = () => {
  const [steps, setSteps] = useState(STEPS.CATEGORY);
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState<
    number | null
  >(null);

  const userModal = useUserModal();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { isValid, errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      category: "",
      location: null,
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      imageSrc: "",
      price: 1,
      title: "",
      description: "",
    },
  });

  const location = watch("location");
  const category = watch("category");
  const guestCount = watch("guestCount");
  const roomCount = watch("roomCount");
  const bathroomCount = watch("bathroomCount");
  const imageSrc = watch("imageSrc");
  const price = watch("price")

  const Map = useMemo(() => dynamic(() => import('./map/Map'), { 
    ssr: false 
  }), [location]);
  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
    
    if (steps !== STEPS.PRICE) {
      nextStep();
    }
  };

  const secondaryActionLabel = useMemo(
    () => (steps === STEPS.CATEGORY ? undefined : "Back"),
    [steps]
  );

  const getBodyByStep = () => {
    if (steps === STEPS.CATEGORY) {
      return (
        <div>
          <Heading
            title="Which of these best describes your place?"
            subtitle="Pick a category"
          />
          <div className="grid grid-cols-2 gap-4 overflow-y-auto h-80">
            {categories.map((category, index) => (
              <RentCategoryBox
                key={index}
                {...category}
                isActive={selectedCategoryIndex === index}
                onClick={() => {
                  setValue("category", category.label);
                  setSelectedCategoryIndex(index);
                }}
              />
            ))}
          </div>
        </div>
      );
    } else if (steps === STEPS.LOCATION) {
      return (
        <div>
          <Heading
            title="Where is your place located?"
            subtitle="Help guests find you!"
          />
          <CounterSelect value={location} onChange={(value) => setCustomValue("location", value)}/>
          <div className="pt-5">
            <Map center={location?.latlng}/>
          </div>
        </div>
      );
    } else if (steps === STEPS.INFO) {
      return (
        <div className="flex flex-col gap-8">
          <Heading
            title="Share some basics about ypur place"
            subtitle="What amenities do you have?"
          />
          <BuildingBox
            title="Guests"
            subtitle="How many guests do you allow?"
            onChange={(value) => setCustomValue("guestCount", value)}
            value={guestCount}
          />
          <BuildingBox
            title="Rooms"
            subtitle="How many rooms do you have?"
            onChange={(value) => setCustomValue("roomCount", value)}
            value={roomCount}
          />
          <BuildingBox
            title="Bathrooms"
            subtitle="How many bathrooms do you have?"
            onChange={(value) => setCustomValue("bathroomCount", value)}
            value={bathroomCount}
          />
        </div>
      );
    } else if (steps === STEPS.IMAGES) {
      return (
        <div className="flex flex-col gap-8">
          <Heading
            title="Add a photo of your place"
            subtitle="Show guests what your place looks like!"
          />
          <ImageUploader
            onChange={(value) => setCustomValue("imageSrc", value)}
            value={imageSrc}
          />
        </div>
      );
    } else if (steps === STEPS.DESCRIPTION) {
      return (
        <div className="flex flex-col gap-8">
          <Heading
            title="How would you describe your place?"
            subtitle="Short and sweet works best!"
          />
          <YourPlaceBox />
        </div>
      );
    } else if (steps === STEPS.PRICE) {
      return (
        <div className="flex flex-col gap-8">
          <Heading
            title="New, set your price"
            subtitle="How much do you charge per night?"
          />
          <PricingBox value={price} onChange={(value) => setCustomValue("price", value)}/>
        </div>
      );
    }
  };



  const onBack = () => {
    setSteps((value) => value - 1);
  };



  const nextStep = () => {

      setSteps((value) => value + 1);
    
  };

  return (
    <Modal
      disabled={!isValid}
      isOpen={userModal.isOpen}
      onClose={userModal.onClose}
      title="Airbnb your home!"
      body={getBodyByStep()}
      actionLabel={"Next"}
      onSubmit={handleSubmit(onSubmit)}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={steps === STEPS.CATEGORY ? undefined : onBack}
    />
  );
};

export default RentModal;
