import React, { FC, ReactElement, useCallback } from "react";
import Heading from "../../../Heading";
import qs from "query-string";
import { useRouter, useSearchParams } from "next/navigation";
interface CategoryProps {
  label: string;
  icon: ReactElement;
  description: string;
  isActive: boolean;
  onClick: () => void;
}
const RentBox: FC<CategoryProps> = ({
  description,
  icon,
  label,
  isActive,
  onClick,
}) => {
  const router = useRouter();
  const params = useSearchParams();

  const handleClick = useCallback(() => {
    let currentQuery = {};

    if (params) {
      currentQuery = qs.parse(params.toString());
    }

    const updatedQuery: any = {
      ...currentQuery,
      category: label,
    };

    if (params?.get("category") === label) {
      delete updatedQuery.category;
    }

    const url = qs.stringifyUrl(
      {
        url: "/",
        query: updatedQuery,
      },
      { skipNull: true }
    );

    router.push(url);
  }, [label, router, params]);

  const onSubmit = () => {
    onClick();
    handleClick();
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

export default RentBox;
