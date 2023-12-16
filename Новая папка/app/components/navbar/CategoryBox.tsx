"use client";
import qs from 'query-string';
import { useRouter, useSearchParams } from "next/navigation";
import { FC, ReactElement, useCallback, useEffect } from "react";

interface CategoryProps {
  label: string;
  icon: ReactElement;
  description: string;
  isActive: boolean;
  onClick: () => void;
}

const CategoryBox: FC<CategoryProps> = ({
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

  const boxClassName = `flex flex-col items-center text-gray-600 border-b p-2 ${
    isActive ? "border-current" : "hover:text-gray-600 hover:border-current"
  }`;

  const onSubmit = () => {
    onClick();
    handleClick();
  };

  return (
    <span className={boxClassName} onClick={onSubmit}>
      <span className="text-2xl">{icon}</span>
      <div>
        <span className="text-sm">{label}</span>
      </div>
    </span>
  );
};

export default CategoryBox;
