import Input from "@/app/components/inputs/Input";
import React, { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";

type Inputs = {
  example: string;
  exampleRequired: string;
};
const YourPlaceBox = () => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      title: '',
      description: '',
    },
  });
  return (
    <div>
      <div className="mb-9">
      <Input
        id="title"
        label="Title"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      </div>

      <Input
          id="description"
          label="Description"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
    </div>
  );
};

export default YourPlaceBox;
