import Input from "@/app/components/inputs/Input";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";

const PricingBox = () => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      price: 0,
    },
  });
  return (
    <div>
      <Input
        id="price"
        label="Price"
        type="number"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  );
};

export default PricingBox;
