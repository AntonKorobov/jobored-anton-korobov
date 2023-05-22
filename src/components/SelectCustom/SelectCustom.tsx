import Image from "next/image";

import { Select } from "@mantine/core";

import { IGetCataloguesResponse } from "@/types/apiSuperjobTypes";
import { UseFormReturnType } from "@mantine/form";

interface ISelectCustom<TFormValues> {
  data: IGetCataloguesResponse[] | undefined;
  form?: UseFormReturnType<TFormValues>;
  valueName?: string;
  label?: string;
  placeholder: string;
  nothingFound: string;
}

export function SelectCustom<TFormValues>({
  data,
  form,
  valueName,
  label,
  placeholder,
  nothingFound,
}: ISelectCustom<TFormValues>) {
  return (
    <Select
      data-elem="industry-select"
      {...form?.getInputProps(valueName || "")}
      label={label || null}
      placeholder={placeholder || ""}
      rightSection={
        <Image
          width={24}
          height={24}
          src={"/icons/arrow_down.svg"}
          alt="открыть список"
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
      nothingFound={nothingFound || ""}
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
