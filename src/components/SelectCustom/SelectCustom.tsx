import Image from "next/image";

import { Select } from "@mantine/core";

import { IGetCataloguesResponse } from "@/types/apiSuperjobTypes";
import { UseFormReturnType } from "@mantine/form";

interface ISelectCustom<TFormValues> {
  data: IGetCataloguesResponse[] | undefined;
  form?: UseFormReturnType<TFormValues>;
  valueName?: string;
}

export function SelectCustom<TFormValues>({
  data,
  form,
  valueName,
}: ISelectCustom<TFormValues>) {
  return (
    <Select
      {...form?.getInputProps(valueName || "")}
      label="Отрасль"
      placeholder="Выберете отрасль"
      rightSection={
        <Image
          width={24}
          height={24}
          src={"/icons/arrow_down.svg"}
          alt="показать список отраслей"
        />
      }
      styles={{
        root: {
          marginBottom: "2rem",
        },
        rightSection: { pointerEvents: "none", paddingRight: "1.2rem" },
        input: {
          fontSize: "1.4rem",
          height: "4.2rem",
          borderRadius: "8px",
          padding: "0 1.2rem",
        },
        item: {
          fontSize: "1.4rem",
        },
        label: {
          fontSize: "1.6rem",
          fontWeight: 700,
          marginBottom: "0.8rem",
        },
      }}
      searchable
      nothingFound="Такой отрасли нет"
      maxDropdownHeight={245}
      data={
        data
          ? data.map((item) => ({
              value: item.key.toString(),
              label: item.title,
            }))
          : []
      }
    />
  );
}
