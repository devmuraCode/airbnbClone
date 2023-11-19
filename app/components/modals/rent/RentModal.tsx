"use client";

import { useCallback, useMemo, useState } from "react";

import Modal from "../Modal";
import useUserModal from "@/app/hooks/useUserModal";
import Heading from "../../Heading";

import { categories } from "../../navbar/Categories";
import RentBox from "./steps/RentBox";
import InfoBox from "./steps/BuildingInfoBox";
import MapComponent from "./steps/LocationBox";
import LocationBox from "./steps/LocationBox";
import YourPlaceBox from "./steps/YourPlaceBox";
import PricingBox from "./steps/PricingBox";

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  DESCRIPTION = 3,
  PRICE = 4,
}
const RentModal = () => {
  const userModal = useUserModal();
  const [steps, setSteps] = useState(STEPS.CATEGORY);
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState<
    number | null
  >(null);

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
              <RentBox
                key={index}
                {...category}
                isActive={selectedCategoryIndex === index}
                onClick={() => setSelectedCategoryIndex(index)}
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
          <InfoBox />
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
    }else if (steps === STEPS.PRICE) {
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
