import styles from "./NumberInputCustom.module.scss";

import { useRef } from "react";

import {
  NumberInput,
  Group,
  ActionIcon,
  NumberInputHandlers,
} from "@mantine/core";
import Image from "next/image";
import { UseFormReturnType } from "@mantine/form";

interface INumberInputCustom<TFormValues> {
  placeholder: string;
  label?: string;
  form?: UseFormReturnType<TFormValues>;
  valueName?: string;
}

export function NumberInputCustom<TFormValues>({
  placeholder,
  label,
  form,
  valueName,
}: INumberInputCustom<TFormValues>) {
  const handlers = useRef<NumberInputHandlers>();

  return (
    <Group>
      <div className={styles.wrapper}>
        <NumberInput
          {...form?.getInputProps(valueName || "")}
          hideControls
          handlersRef={handlers}
          placeholder={placeholder}
          label={label || null}
          min={0}
          step={1000}
          styles={{
            input: {
              fontSize: "1.4rem",
              height: "4.2rem",
              borderRadius: "8px",
              padding: "0 1.2rem",
            },
            label: {
              fontSize: "1.6rem",
              fontWeight: 700,
              marginBottom: "0.8rem",
            },
          }}
        />
        <div className={styles.controlsWrapper}>
          <ActionIcon
            size={"1.3rem"}
            variant="transparent"
            onClick={() => handlers.current?.increment()}
          >
            <Image
              width={12}
              height={12}
              src={"/icons/control_up.svg"}
              alt="увеличить сумму"
            />
          </ActionIcon>
          <ActionIcon
            size={"1.3rem"}
            variant="transparent"
            onClick={() => handlers.current?.decrement()}
          >
            <Image
              width={12}
              height={12}
              src={"/icons/control_down.svg"}
              alt="уменьшить сумму"
            />
          </ActionIcon>
        </div>
      </div>
    </Group>
  );
}
