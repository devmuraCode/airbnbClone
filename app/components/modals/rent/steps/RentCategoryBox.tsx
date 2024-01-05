import React, { FC, ReactElement } from "react";
interface CategoryProps {
  label: string;
  icon: ReactElement;
  description: string;
  isActive: boolean;
  onClick: () => void;
 
}
const RentCategoryBox: FC<CategoryProps> = ({
  description,
  icon,
  label,
  isActive,
  onClick,
}) => {

  const onSubmit = () => {
      onClick();
  };

  const boxClassName = `block max-w-sm p-3 border  rounded-lg ${
    isActive ? "border-slate-950" : "border-black-900"
  }`;
  return (
    <span className={boxClassName} onClick={onSubmit}>
      <span className="text-md">{icon}</span>
      <div>
        <span className="text-sm">{label}</span>
      </div>
    </span>
  );
};

export default RentCategoryBox;
