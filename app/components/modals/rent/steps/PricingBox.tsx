import Input from "@/app/components/inputs/Input";
import { FC, useState } from "react";
import { FieldValues, useForm , UseFormRegister} from "react-hook-form";

interface TProps {
  value: number;
  onChange: (value: number) => void;
  register: UseFormRegister<FieldValues>;
}
const PricingBox: FC<TProps> = (props) => {
  const { value, onChange, register } = props;
  const [isLoading, setIsLoading] = useState(false);

  const {
    
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
