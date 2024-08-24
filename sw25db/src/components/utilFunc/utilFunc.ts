import { SetStateAction } from "react";

export const handleChange =
  <
    T extends HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement,
    U extends string | number | SetStateAction<string>
  >(
    setter: (i: U) => void,
    transform: (value: string) => U
  ) =>
  (event: React.ChangeEvent<T>) => {
    setter(transform(event.target.value));
  };
