import styles from "./NumberInputCustom.module.scss";

import { useState, useRef } from "react";

import {
  NumberInput,
  Group,
  ActionIcon,
  NumberInputHandlers,
} from "@mantine/core";
import Image from "next/image";

interface INumberInputCustom {
  placeholder: string;
  label?: string;
}

export function NumberInputCustom({ placeholder, label }: INumberInputCustom) {
  const [value, setValue] = useState<number | "">("");
  const handlers = useRef<NumberInputHandlers>();

  return (
    <Group>
      <div className={styles.wrapper}>
        <NumberInput
          hideControls
          value={value}
          onChange={(val) => setValue(val)}
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
