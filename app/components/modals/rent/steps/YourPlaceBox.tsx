import Input from "@/app/components/inputs/Input";
import React, { FC, useState } from "react";
import { FieldValues, useForm, UseFormRegister } from "react-hook-form";

interface TProps {
  value: string;
  onChange: (value: string) => void;
  register: UseFormRegister<FieldValues>;
}
const YourPlaceBox:FC<TProps> = (props) => {
  const { value, onChange, register } = props;
  const [isLoading, setIsLoading] = useState(false);
  const {
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
