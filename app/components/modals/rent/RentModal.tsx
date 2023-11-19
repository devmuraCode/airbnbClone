"use client";

import { useCallback, useMemo, useState } from "react";

import Modal from "../Modal";
import useUserModal from "@/app/hooks/useUserModal";
import Heading from "../../Heading";

import { categories } from "../../navbar/Categories";
import RentCategoryBox from "./steps/RentCategoryBox";
import BuildingBox from "./steps/BuildingBox";
import LocationBox from "./steps/LocationBox";
import YourPlaceBox from "./steps/YourPlaceBox";
import PricingBox from "./steps/PricingBox";
import ImageUploader from "./steps/ImageUploader";
import { FieldValues, useForm } from "react-hook-form";
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
    formState: { errors },
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

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
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
          <LocationBox />
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
            title="Guests"
            subtitle="How many guests do you allow?"
            onChange={(value) => setCustomValue("roomCount", value)}
            value={roomCount}
          />
          <BuildingBox
            title="Guests"
            subtitle="How many guests do you allow?"
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
          <PricingBox />
        </div>
      );
    }
  };

  const nextStep = () => {
    setSteps((value) => value + 1);
  };

  const onBack = () => {
    setSteps((value) => value - 1);
  };

  return (
    <Modal
      disabled={false}
      isOpen={userModal.isOpen}
      onClose={userModal.onClose}
      title="Airbnb your home!"
      body={getBodyByStep()}
      actionLabel={"Next"}
      onSubmit={nextStep}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={steps === STEPS.CATEGORY ? undefined : onBack}
    />
  );
};

export default RentModal;
