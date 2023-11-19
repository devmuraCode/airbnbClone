"use client";

import { useCallback, useMemo, useState } from "react";

import Modal from "../Modal";
import useUserModal from "@/app/hooks/useUserModal";
import Heading from "../../Heading";

import { categories } from "../../navbar/Categories";
import RentBox from "./RentBox";
import InfoBox from "./BuildingInfoBox";
import MapComponent from "./LocationBox";
import LocationBox from "./LocationBox";

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
}
const RentModal = () => {
  const userModal = useUserModal();
  const [steps, setSteps] = useState(STEPS.CATEGORY);
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState<number | null>(null);

  const secondaryActionLabel = useMemo(() => (steps === STEPS.CATEGORY ? undefined : "Back"), [steps]);

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
          <LocationBox/>
        </div>
      );
    } else if(steps === STEPS.INFO) {
      return (
        <div className="flex flex-col gap-8">
          <Heading
            title="Share some basics about ypur place"
            subtitle="What amenities do you have?"
          />
          <InfoBox/>
        </div>
      )
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
